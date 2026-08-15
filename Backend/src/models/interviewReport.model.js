const mongoose = require('mongoose');
/**
 * job description schema: String
 * resume text: String
 * self description: String
 * 
 * --match score: Number
 * 
 * -Technical Questions:[{
 *  
 *         question: " ",
 *          intention: " ",
 *          answer: " ",
 *          score: " " 
 *           }]
 * Behavioral Questions:[
 * {
 *  
 *         question: " ",
 *          intention: " ",
 *          answer: " ",
 *           }]
 * skill gaps:[
 *          skill: " ",
 *          severity: " ",
 *          enum: [ "low", "medium", "high" ]         
 * ]
 * prepration plans:[{
 *          day: " ",
 *         plan: " ",
 *          tasks:[{}]
 * 
 *         }]
 */

const technicalQuestionSchema = new mongoose.Schema({   
    question:{
        type: String,
        required: [true, "Question is required"]        
    },
    intention:{
        type: String,
        required: [true, "Intention is required"]   
    },
    answer:{
        type: String, 
        required: [true, "Answer is required"]  
    },
},{_id: false});

const behavioralQuestionSchema = new mongoose.Schema({
     question:{
        type: String,
        required: [true, "Question is required"]        
    },
    intention:{
        type: String,
        required: [true, "Intention is required"]   
    },
    answer:{
        type: String, 
        required: [true, "Answer is required"]  
    },
},{_id: false});

const skillGapSchema = new mongoose.Schema({
    skill: {
        type: String,
        required: [true, "Skill is required"]   
    },
    severity: {
        type: String,   
        required: [true, "Severity is required"],
        enum: ["low", "medium", "high"]
    }
},{_id: false});

const preparationPlanSchema = new mongoose.Schema({
    day: {
        type: String,
        required: [true, "Day is required"]
    },
    focus: {
        type: String,
        required: [true, "Focus is required"]
    },
    tasks: [{
        type: String
    }]
},{_id: false});

const interviewReportSchema = new mongoose.Schema({ 
        jobDescription: { 
            type: String, 
            required: [true, "Job description is required"]
        },
        resume: {
            type: String,
        },
        selfDescription: {
            type: String,
        },
        matchScore: {
            type: Number,
            default: 0,
            min: 0,
            max: 100
        },
        technicalQuestions: [technicalQuestionSchema],
        behavioralQuestions :[behavioralQuestionSchema],
        skillGaps:[skillGapSchema],
        preparationPlan:[preparationPlanSchema],
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Users"
        },
           title: {
        type: String,
        required: [ true, "Job title is required" ]
        }
    },{
        timestamps:true
    });

    const interviewReportModel= mongoose.model("InterviewReport",interviewReportSchema);
    module.exports = interviewReportModel;
