const { GoogleGenAI } = require("@google/genai")
const { z } = require("zod")
const { zodToJsonSchema } = require("zod-to-json-schema")
const puppeteer = require("puppeteer")

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
})

/**
 * Retries a Gemini API call with exponential backoff when the failure is
 * transient (503 = model overloaded / high demand, 429 = rate limited).
 * Any other error (bad request, auth failure, etc.) is thrown immediately
 * since retrying it would never succeed.
 */
async function withRetry(fn, { retries = 3, baseDelayMs = 1000 } = {}) {
    let attempt = 0;
    while (true) {
        try {
            return await fn();
        } catch (err) {
            const isRetryable = err.status === 503 || err.status === 429;
            attempt++;
            if (!isRetryable || attempt > retries) {
                throw err;
            }
            const delay = baseDelayMs * Math.pow(2, attempt - 1) + Math.floor(Math.random() * 250);
            console.warn(`Gemini request failed with status ${err.status}. Retrying in ${delay}ms (attempt ${attempt}/${retries})...`);
            await new Promise((resolve) => setTimeout(resolve, delay));
        }
    }
}


const interviewReportSchema = z.object({
    matchScore: z.number().describe("A score between 0 and 100 indicating how well the candidate's profile matches the job describe"),
    technicalQuestions: z.array(z.object({
        question: z.string().describe("The technical question can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).describe("Technical questions that can be asked in the interview along with their intention and how to answer them"),
    behavioralQuestions: z.array(z.object({
        question: z.string().describe("The technical question can be asked in the interview"),
        intention: z.string().describe("The intention of interviewer behind asking this question"),
        answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
    })).describe("Behavioral questions that can be asked in the interview along with their intention and how to answer them"),
    skillGaps: z.array(z.object({
        skill: z.string().describe("The skill which the candidate is lacking"),
        severity: z.enum([ "low", "medium", "high" ]).describe("The severity of this skill gap, i.e. how important is this skill for the job and how much it can impact the candidate's chances")
    })).describe("List of skill gaps in the candidate's profile along with their severity"),
    preparationPlan: z.array(z.object({
        day: z.number().describe("The day number in the preparation plan, starting from 1"),
        focus: z.string().describe("The main focus of this day in the preparation plan, e.g. data structures, system design, mock interviews etc."),
        tasks: z.array(z.string()).describe("List of tasks to be done on this day to follow the preparation plan, e.g. read a specific book or article, solve a set of problems, watch a video etc.")
    })).describe("A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively"),
    title: z.string().describe("The title of the job for which the interview report is generated"),
})

async function generateInterviewReport({ resume, selfDescription, jobDescription }) {

    const prompt = `
You are an experienced Senior Technical Recruiter at Google.

Analyze the candidate's resume carefully.

Resume:
${resume}

Self Description:
${selfDescription}

Job Description:
${jobDescription}

IMPORTANT INSTRUCTIONS:

Return ONLY valid JSON.

Generate ALL of the following.

1. title

2. matchScore (0-100)

3. technicalQuestions

Generate EXACTLY 10 technical interview questions.

Each question MUST contain

{
question,
intention,
answer
}

The answer should be detailed (minimum 120 words).

---------------------------------------------------

4. behavioralQuestions

Generate EXACTLY 8 behavioral interview questions.

Each question MUST contain

{
question,
intention,
answer
}

---------------------------------------------------

5. skillGaps

Generate EXACTLY 5 skill gaps.

Each should contain

{
skill,
severity
}

severity must be

low
medium
high

---------------------------------------------------

6. preparationPlan

Generate EXACTLY 14 days.

Each day contains

{
day,
focus,
tasks
}

tasks must contain at least 3 items.

---------------------------------------------------

Never return

[]

Never return null.

Never skip any field.

Even if the resume is weak, create interview questions.

Return ONLY JSON.
`;

    const response = await withRetry(() => ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json"
        }
    }));

    let text = response.text;

    if (typeof text === "function") {
        text = text();
    }

    text = text
        .replace(/```json/gi, "")
        .replace(/```/g, "")
        .trim();

    let result = JSON.parse(text);

    // -------------------------
    // Fill missing fields safely
    // -------------------------

    result.title = result.title || "Interview Report";
    result.matchScore = Number(result.matchScore || 0);

    result.technicalQuestions = Array.isArray(result.technicalQuestions)
        ? result.technicalQuestions
        : [];

    result.behavioralQuestions = Array.isArray(result.behavioralQuestions)
        ? result.behavioralQuestions
        : [];

    result.skillGaps = Array.isArray(result.skillGaps)
        ? result.skillGaps
        : [];

    result.preparationPlan = Array.isArray(result.preparationPlan)
        ? result.preparationPlan
        : [];

    console.log("========== AI RESULT ==========");
    console.dir(result, { depth: null });
    console.log("===============================");

    return result;
}



async function generatePdfFromHtml(htmlContent) {
    const browser = await puppeteer.launch()
    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: "networkidle0" })

    const pdfBuffer = await page.pdf({
        format: "A4", margin: {
            top: "20mm",
            bottom: "20mm",
            left: "15mm",
            right: "15mm"
        }
    })

    await browser.close()

    return pdfBuffer
}

async function generateResumePdf({ resume, selfDescription, jobDescription }) {

    const resumePdfSchema = z.object({
        html: z.string().describe("The HTML content of the resume which can be converted to PDF using any library like puppeteer")
    })

    const prompt = `Generate resume for a candidate with the following details:
                        Resume: ${resume}
                        Self Description: ${selfDescription}
                        Job Description: ${jobDescription}

                        the response should be a JSON object with a single field "html" which contains the HTML content of the resume which can be converted to PDF using any library like puppeteer.
                        The resume should be tailored for the given job description and should highlight the candidate's strengths and relevant experience. The HTML content should be well-formatted and structured, making it easy to read and visually appealing.
                        The content of resume should be not sound like it's generated by AI and should be as close as possible to a real human-written resume.
                        you can highlight the content using some colors or different font styles but the overall design should be simple and professional.
                        The content should be ATS friendly, i.e. it should be easily parsable by ATS systems without losing important information.
                        The resume should not be so lengthy, it should ideally be 1-2 pages long when converted to PDF. Focus on quality rather than quantity and make sure to include all the relevant information that can increase the candidate's chances of getting an interview call for the given job description.
                    `

    const response = await withRetry(() => ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: zodToJsonSchema(resumePdfSchema),
        }
    }))


   let text = response.text;

if (typeof text === "function") {
    text = text();
}

text = text
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();

const jsonContent = JSON.parse(text);

    const pdfBuffer = await generatePdfFromHtml(jsonContent.html)

    return pdfBuffer

}

module.exports = { generateInterviewReport, generateResumePdf }