import React from 'react'
import '../style/landing.scss'
import { Link } from 'react-router'
import { useAuth } from '../../auth/hooks/useAuth.js'

const HOW_IT_WORKS = [
    {
        step: '01',
        title: 'Add your background',
        desc: 'Upload your resume, or skip straight to a quick self-description if you don’t have one handy.'
    },
    {
        step: '02',
        title: 'Paste the job description',
        desc: 'Drop in the role you’re targeting. Vantage reads it the way a recruiter would.'
    },
    {
        step: '03',
        title: 'Get your prep kit',
        desc: 'A match score, tailored interview questions, skill gaps, and a day-by-day roadmap — in under a minute.'
    }
]

const FEATURES = [
    {
        icon: (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></svg>),
        title: 'Match score analysis',
        desc: 'See exactly how your profile lines up against the job description, scored out of 100.'
    },
    {
        icon: (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>),
        title: 'Full interview question bank',
        desc: '10 technical and 8 behavioral questions built for the role, each with the interviewer’s real intention and a model answer.'
    },
    {
        icon: (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 9v4" /><path d="M12 17h.01" /><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" /></svg>),
        title: 'Skill gap radar',
        desc: 'Know precisely which skills to shore up before interview day, ranked by how much they’ll matter.'
    },
    {
        icon: (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11" /></svg>),
        title: '14-day prep roadmap',
        desc: 'A day-by-day plan with concrete tasks, so you walk in prepared instead of overwhelmed.'
    },
    {
        icon: (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>),
        title: 'AI-tailored resume',
        desc: 'Download a version of your resume rewritten to speak directly to the job you’re applying for.'
    }
]

const TESTIMONIALS = [
    {
        quote: 'I walked in already knowing which two skills they’d probe on. Nailed the technical round.',
        name: 'Early user',
        role: 'Frontend Engineer'
    },
    {
        quote: 'The 14-day roadmap turned two weeks of panic into an actual plan I could follow.',
        name: 'Beta tester',
        role: 'Backend Developer'
    },
    {
        quote: 'Seeing my match score before the interview completely changed how I prepared.',
        name: 'Beta tester',
        role: 'Data Analyst'
    }
]

const Landing = () => {
    const { user } = useAuth()

    return (
        <div className="landing-page">

            {/* Nav */}
            <header className="landing-nav">
                <div className="landing-nav__inner">
                    <Link to="/" className="landing-nav__brand">
                        <span className="landing-nav__mark">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></svg>
                        </span>
                        Vantage
                    </Link>

                    <nav className="landing-nav__links">
                        <a href="#how-it-works">How it works</a>
                        <a href="#features">Features</a>
                    </nav>

                    <div className="landing-nav__actions">
                        {user ? (
                            <Link to="/dashboard" className="button primary-button">Go to Dashboard</Link>
                        ) : (
                            <>
                                <Link to="/login" className="landing-nav__login">Log In</Link>
                                <Link to="/register" className="button primary-button">Get Started Free</Link>
                            </>
                        )}
                    </div>
                </div>
            </header>

            {/* Hero */}
            <section className="landing-hero">
                <div className="landing-hero__content">
                    <span className="landing-hero__eyebrow">AI-powered interview prep</span>
                    <h1>
                        Walk into every interview with the <span className="landing-hero__highlight">answers already loaded</span>.
                    </h1>
                    <p>
                        Vantage reads your resume and the job description, then builds your match score,
                        tailored interview questions, and a day-by-day prep plan — so you stop guessing
                        what they’ll ask.
                    </p>
                    <div className="landing-hero__actions">
                        <Link to={user ? '/dashboard' : '/register'} className="button primary-button landing-hero__cta">
                            {user ? 'Go to Dashboard' : 'Get Started Free'}
                        </Link>
                        {!user && <Link to="/login" className="landing-hero__secondary">Already have an account? Log in</Link>}
                    </div>
                </div>

                {/* Signature element: live report preview, mirroring the real report UI */}
                <div className="landing-preview" aria-hidden="true">
                    <div className="landing-preview__header">
                        <span className="landing-preview__dot" />
                        <span>Live report preview</span>
                    </div>

                    <div className="landing-preview__score">
                        <div className="landing-preview__ring">
                            <span className="landing-preview__ring-value">87</span>
                            <span className="landing-preview__ring-pct">%</span>
                        </div>
                        <div>
                            <p className="landing-preview__score-label">Match Score</p>
                            <p className="landing-preview__score-sub">Senior Frontend Engineer</p>
                        </div>
                    </div>

                    <div className="landing-preview__tags">
                        <span className="landing-preview__tag landing-preview__tag--medium">System Design</span>
                        <span className="landing-preview__tag landing-preview__tag--low">TypeScript</span>
                    </div>

                    <div className="landing-preview__question">
                        <span className="landing-preview__question-tag">AI-generated</span>
                        <p>“Walk me through a time you optimized a slow API.”</p>
                    </div>
                </div>
            </section>

            {/* How it works */}
            <section id="how-it-works" className="landing-how">
                <h2>Three steps to your prep kit</h2>
                <div className="landing-how__grid">
                    {HOW_IT_WORKS.map((item) => (
                        <div key={item.step} className="landing-how__card">
                            <span className="landing-how__step">{item.step}</span>
                            <h3>{item.title}</h3>
                            <p>{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Features */}
            <section id="features" className="landing-features">
                <h2>Everything you need before you walk in</h2>
                <div className="landing-features__grid">
                    {FEATURES.map((feature) => (
                        <div key={feature.title} className="landing-features__card">
                            <span className="landing-features__icon">{feature.icon}</span>
                            <h3>{feature.title}</h3>
                            <p>{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Testimonials */}
            <section className="landing-testimonials">
                <h2>What early users are saying</h2>
                <div className="landing-testimonials__grid">
                    {TESTIMONIALS.map((t) => (
                        <figure key={t.name + t.role} className="landing-testimonials__card">
                            <blockquote>“{t.quote}”</blockquote>
                            <figcaption>
                                <span className="landing-testimonials__name">{t.name}</span>
                                <span className="landing-testimonials__role">{t.role}</span>
                            </figcaption>
                        </figure>
                    ))}
                </div>
            </section>

            {/* Final CTA */}
            <section className="landing-cta">
                <h2>Your next interview is already on the calendar.</h2>
                <p>Let’s make sure you’re ready for it.</p>
                <Link to={user ? '/dashboard' : '/register'} className="button primary-button landing-cta__button">
                    {user ? 'Go to Dashboard' : 'Get Started Free'}
                </Link>
            </section>

            {/* Footer */}
            <footer className="landing-footer">
                <span className="landing-footer__brand">Vantage</span>
                <div className="landing-footer__links">
                    <a href="#">Privacy Policy</a>
                    <a href="#">Terms of Service</a>
                    <a href="#">Help Center</a>
                </div>
            </footer>
        </div>
    )
}

export default Landing
