'use client'

import { useEffect, useRef, useState } from 'react'
import Footer from '@/components/Footer'
import FlipButton from '@/components/FlipButton'

export default function ContactPage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLDivElement>(null)
  const sidebarRef = useRef<HTMLDivElement>(null)
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    inquiry: '',
    message: '',
  })

  useEffect(() => {
    let ctx: { revert: () => void } | null = null

    const initGSAP = async () => {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        // Hero fade in on mount
        gsap.fromTo(
          heroRef.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.1 }
        )

        // Form fade in on scroll
        gsap.fromTo(
          formRef.current,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: formRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        )

        // Sidebar fade in on scroll
        gsap.fromTo(
          sidebarRef.current,
          { opacity: 0, x: 30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sidebarRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        )
      })
    }

    initGSAP()
    return () => {
      ctx?.revert()
    }
  }, [])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="theme-light" style={{ backgroundColor: 'var(--theme-bg)', color: 'var(--theme-text)', minHeight: '100vh' }}>
      <style>{`
        .contact-page {
          padding-top: var(--section-space-page-top);
        }
        .contact-hero {
          padding-inline: var(--site-margin);
          max-width: 100rem;
          margin: 0 auto;
          padding-bottom: var(--section-space-main);
          border-bottom: 1px solid var(--theme-border);
        }
        .contact-hero h1 {
          color: var(--theme-text);
          margin-bottom: 1rem;
        }
        .contact-subtitle {
          font-size: var(--font-size-text-large);
          color: var(--theme-text);
          opacity: 0.6;
          max-width: 55ch;
          font-family: 'Aileron', Arial, sans-serif;
        }
        .contact-body {
          display: grid;
          grid-template-columns: 1fr 340px;
          gap: var(--space-4);
          padding-inline: var(--site-margin);
          max-width: 100rem;
          margin: 0 auto;
          padding-top: var(--section-space-main);
          padding-bottom: var(--section-space-large);
          align-items: start;
        }
        @media (max-width: 900px) {
          .contact-body {
            grid-template-columns: 1fr;
          }
        }
        .contact-form {
          display: flex;
          flex-direction: column;
          gap: var(--space-2);
        }
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--space-2);
        }
        @media (max-width: 600px) {
          .form-row {
            grid-template-columns: 1fr;
          }
        }
        .form-field {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .form-label {
          font-family: 'Robotocondensed', Arial, sans-serif;
          font-size: var(--font-size-h6);
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--theme-text);
          opacity: 0.5;
        }
        .form-input,
        .form-select,
        .form-textarea {
          background: transparent;
          border: none;
          border-bottom: 1.5px solid var(--theme-border);
          padding: 0.75rem 0;
          font-family: 'Aileron', Arial, sans-serif;
          font-size: var(--font-size-text-main);
          color: var(--theme-text);
          outline: none;
          transition: border-color 0.25s ease;
          width: 100%;
          appearance: none;
          -webkit-appearance: none;
          border-radius: 0;
        }
        .form-input::placeholder,
        .form-textarea::placeholder {
          color: var(--theme-text);
          opacity: 0.25;
        }
        .form-input:focus,
        .form-select:focus,
        .form-textarea:focus {
          border-bottom-color: var(--theme-text);
        }
        .form-select {
          cursor: url("/images/cursors/cursor-pointer-links.svg") 8 4, pointer;
        }
        .form-textarea {
          resize: vertical;
          min-height: 120px;
          line-height: 1.6;
        }
        .form-submit {
          margin-top: var(--space-1);
          display: flex;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .form-success {
          font-family: 'Facultyglyphic', serif;
          font-size: var(--font-size-h3);
          color: var(--theme-text);
          padding: var(--space-3) 0;
        }
        /* Sidebar */
        .contact-sidebar {
          position: sticky;
          top: 6rem;
        }
        .sidebar-card {
          border: 1.5px solid var(--theme-border);
          padding: var(--space-2);
          border-radius: 4px;
        }
        .sidebar-heading {
          font-family: 'Robotocondensed', Arial, sans-serif;
          font-size: var(--font-size-h6);
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          opacity: 0.45;
          margin-bottom: var(--space-15);
        }
        .sidebar-info-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: var(--space-15);
        }
        .sidebar-info-item {
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
        }
        .sidebar-info-label {
          font-family: 'Robotocondensed', Arial, sans-serif;
          font-size: 0.7rem;
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          opacity: 0.4;
        }
        .sidebar-info-value {
          font-size: var(--font-size-text-main);
          font-weight: 400;
          color: var(--theme-text);
          text-decoration: none;
          transition: opacity 0.2s ease;
        }
        a.sidebar-info-value:hover {
          opacity: 0.65;
        }
        .sidebar-divider {
          width: 100%;
          height: 1px;
          background: var(--theme-border);
          margin: var(--space-1) 0;
        }
        .sidebar-hours-grid {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 0.35rem 1rem;
          font-size: var(--font-size-text-small);
        }
        .sidebar-hours-day {
          opacity: 0.55;
        }
        .sidebar-hours-time {
          font-weight: 600;
          text-align: right;
        }
      `}</style>

      <main className="contact-page">
        {/* Hero */}
        <div className="contact-hero" ref={heroRef} style={{ opacity: 0 }}>
          <h1>Get in Touch</h1>
          <p className="contact-subtitle">
            MoMoney loves great questions, bold ideas, and friendly faces
          </p>
        </div>

        {/* Body: form + sidebar */}
        <div className="contact-body">
          {/* Form */}
          <div ref={formRef} style={{ opacity: 0 }}>
            {submitted ? (
              <div className="form-success">
                Thanks for reaching out — we&apos;ll be in touch soon.
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit} noValidate>
                <div className="form-row">
                  <div className="form-field">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="form-input"
                      autoComplete="name"
                    />
                  </div>
                  <div className="form-field">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="form-input"
                      autoComplete="email"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-field">
                    <label htmlFor="phone" className="form-label">Phone</label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="(000) 000-0000"
                      value={formData.phone}
                      onChange={handleChange}
                      className="form-input"
                      autoComplete="tel"
                    />
                  </div>
                  <div className="form-field">
                    <label htmlFor="subject" className="form-label">Subject</label>
                    <input
                      id="subject"
                      name="subject"
                      type="text"
                      placeholder="What's this about?"
                      value={formData.subject}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-field">
                  <label htmlFor="inquiry" className="form-label">Inquiry Type</label>
                  <select
                    id="inquiry"
                    name="inquiry"
                    value={formData.inquiry}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="" disabled>Select a category</option>
                    <option value="tickets">Tickets</option>
                    <option value="events">Events</option>
                    <option value="marketing">Marketing</option>
                    <option value="press">Press</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="form-field">
                  <label htmlFor="message" className="form-label">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Tell us more..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="form-textarea"
                    rows={5}
                  />
                </div>

                <div className="form-submit">
                  <FlipButton href="#" onClick={() => handleSubmit({ preventDefault: () => {} } as React.FormEvent)}>
                    Send Message
                  </FlipButton>
                </div>
              </form>
            )}
          </div>

          {/* Sidebar */}
          <aside className="contact-sidebar" ref={sidebarRef} style={{ opacity: 0 }}>
            <div className="sidebar-card">
              <p className="sidebar-heading">Direct Contact</p>
              <ul className="sidebar-info-list">
                <li className="sidebar-info-item">
                  <span className="sidebar-info-label">Phone</span>
                  <a href="tel:+12143820232" className="sidebar-info-value">
                    (214) 382-0232
                  </a>
                </li>
                <li className="sidebar-info-item">
                  <span className="sidebar-info-label">Email</span>
                  <a href="mailto:hello@momoney.com" className="sidebar-info-value">
                    hello@momoney.com
                  </a>
                </li>
                <li className="sidebar-info-item">
                  <span className="sidebar-info-label">Address</span>
                  <span className="sidebar-info-value">
                    501 Elm St<br />Dallas, TX 75202
                  </span>
                </li>
              </ul>

              <div className="sidebar-divider" />

              <p className="sidebar-heading">Hours</p>
              <div className="sidebar-hours-grid">
                <span className="sidebar-hours-day">Sun – Thu</span>
                <span className="sidebar-hours-time">10AM – 8PM</span>
                <span className="sidebar-hours-day">Fri – Sat</span>
                <span className="sidebar-hours-time">10AM – 9PM</span>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  )
}
