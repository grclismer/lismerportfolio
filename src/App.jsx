import { useEffect, useState } from 'react'
import {
  ArrowRight,
  Mail,
  MoveUpRight,
  Send,
} from 'lucide-react'
import profilePhoto from './assets/myprofile_transparent.png'
import './App.css'
import Aurora from './components/Aurora.jsx'
import FadeContent from './components/FadeContent.jsx'
import GooeyNav from './components/GooeyNav.jsx'
import HoloCard from './components/HoloCard.jsx'
import LogoLoop from './components/LogoLoop.jsx'
import MagicBento from './components/MagicBento.jsx'
import ProfileCard from './components/ProfileCard.jsx'
import RotatingText from './components/RotatingText.jsx'
import ShinyText from './components/ShinyText.jsx'
import TechText from './components/TechText.jsx'
import { InnerMoon } from './components/ui/inner-moon.jsx'

const navigation = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
]

const skills = [
  'React',
  'JavaScript',
  'Tailwind CSS',
  'Vite',
  'Motion',
  'GSAP',
  'WebGL',
]

const skillLogos = skills.map((skill) => ({
  node: <span className="skill-word">{skill}</span>,
  title: skill,
}))

const makeArtwork = (label, accent, secondary) => {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="840" viewBox="0 0 1200 840">
      <defs>
        <linearGradient id="wash" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#18171f"/>
          <stop offset="1" stop-color="#08090d"/>
        </linearGradient>
        <radialGradient id="light" cx="70%" cy="20%" r="80%">
          <stop offset="0" stop-color="${accent}" stop-opacity=".72"/>
          <stop offset="1" stop-color="${accent}" stop-opacity="0"/>
        </radialGradient>
        <linearGradient id="glass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#ffffff" stop-opacity=".22"/>
          <stop offset="1" stop-color="#ffffff" stop-opacity=".02"/>
        </linearGradient>
      </defs>
      <rect width="1200" height="840" fill="url(#wash)"/>
      <rect width="1200" height="840" fill="url(#light)"/>
      <circle cx="850" cy="370" r="220" fill="${secondary}" fill-opacity=".12"/>
      <path d="M-40 660C180 510 310 710 515 510s315-130 475-260 250-72 320-12" fill="none" stroke="${accent}" stroke-opacity=".46" stroke-width="2"/>
      <path d="M-30 730C170 580 330 780 540 580s315-110 470-240 250-55 330-5" fill="none" stroke="${secondary}" stroke-opacity=".4" stroke-width="1.5"/>
      <rect x="100" y="100" width="1000" height="640" rx="34" fill="url(#glass)" stroke="#ffffff" stroke-opacity=".18"/>
      <path d="M100 180h1000" stroke="#ffffff" stroke-opacity=".14"/>
      <circle cx="146" cy="140" r="7" fill="${accent}"/>
      <circle cx="170" cy="140" r="7" fill="#ffffff" fill-opacity=".35"/>
      <circle cx="194" cy="140" r="7" fill="#ffffff" fill-opacity=".18"/>
      <text x="600" y="475" fill="#ffffff" fill-opacity=".88" font-family="Arial, sans-serif" font-size="54" letter-spacing="12" text-anchor="middle">${label}</text>
      <text x="600" y="530" fill="#ffffff" fill-opacity=".48" font-family="Arial, sans-serif" font-size="18" letter-spacing="5" text-anchor="middle">A DIGITAL CONCEPT</text>
    </svg>
  `

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
}

const projects = [
  {
    number: '01',
    category: 'WEB EXPERIENCE',
    title: 'Stillroom',
    description: 'A quiet, tactile home for independent creative work.',
    artwork: makeArtwork('STILLROOM', '#b6a4ff', '#7cebd1'),
    preset: 'cosmos',
    tags: ['Creative direction', 'React'],
  },
  {
    number: '02',
    category: 'PRODUCT DESIGN',
    title: 'Orbit',
    description: 'A more human way to make sense of everyday finances.',
    artwork: makeArtwork('ORBIT', '#81d9ff', '#b7a4ff'),
    preset: 'stars',
    tags: ['Product design', 'Interaction'],
  },
  {
    number: '03',
    category: 'INTERACTIVE STORY',
    title: 'Fieldnotes',
    description: 'A small digital field guide for curious minds.',
    artwork: makeArtwork('FIELDNOTES', '#f1bf8a', '#8dd8cb'),
    preset: 'glitter',
    tags: ['Art direction', 'Motion'],
  },
]

const highlights = [
  {
    colSpan: 2,
    content: (
      <div className="bento-copy bento-profile">
        <span className="bento-kicker">A LITTLE ABOUT ME</span>
        <h3>Good work feels clear, useful, and a little unexpected.</h3>
        <p>
          I enjoy turning early ideas into thoughtful digital experiences,
          bringing design and frontend craft together from the first sketch to
          the final detail.
        </p>
        <span className="bento-index">BASED ONLINE · OPEN TO GOOD IDEAS</span>
      </div>
    ),
  },
  {
    content: (
      <div className="bento-copy">
        <span className="bento-kicker">WHAT I FOCUS ON</span>
        <ul className="focus-list">
          <li><span>01</span> Interface design</li>
          <li><span>02</span> Frontend craft</li>
          <li><span>03</span> Motion & detail</li>
        </ul>
      </div>
    ),
  },
  {
    content: (
      <div className="bento-copy bento-stat">
        <span className="bento-kicker">A FEW QUICK NOTES</span>
        <div className="stat-row">
          <strong>03</strong>
          <span>areas I love exploring</span>
        </div>
        <div className="stat-row">
          <strong>∞</strong>
          <span>ways to make it better</span>
        </div>
        <p className="bento-footnote">Currently building this portfolio.</p>
      </div>
    ),
    colSpan: 2,
  },
]

function App() {
  const [isDark, setIsDark] = useState(
    () => window.localStorage.getItem('portfolio-theme') !== 'light',
  )
  const [contactStatus, setContactStatus] = useState({
    type: 'idle',
    message: '',
  })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
    window.localStorage.setItem('portfolio-theme', isDark ? 'dark' : 'light')
  }, [isDark])

  const toggleTheme = () => setIsDark((current) => !current)

  const scrollToSection = (section) => {
    const headerHeight = document.querySelector('.site-header')?.offsetHeight ?? 0
    const top = Math.max(
      0,
      window.scrollY + section.getBoundingClientRect().top - headerHeight - 12,
    )
    window.scrollTo({ top, behavior: 'smooth' })
  }

  const handleAnchorNavigation = (event) => {
    const clickedElement = event.target instanceof Element ? event.target : null
    const anchor = clickedElement?.closest('a[href^="#"]')
    if (!anchor || !event.currentTarget.contains(anchor)) return

    const href = anchor.getAttribute('href')
    const section = href ? document.getElementById(href.slice(1)) : null
    if (!href || !section) return

    event.preventDefault()
    if (window.location.hash !== href) window.history.pushState(null, '', href)
    scrollToSection(section)
  }

  const handleContactSubmit = async (event) => {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)
    const values = Object.fromEntries(formData.entries())

    setContactStatus({ type: 'sending', message: 'Sending your message…' })

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
      if (!response.headers.get('content-type')?.includes('application/json')) {
        throw new Error(
          'The contact service is unavailable. Use the deployed site or run `npx vercel dev` locally.',
        )
      }
      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || 'Your message could not be sent.')
      }

      form.reset()
      setContactStatus({
        type: 'success',
        message: result.message,
      })
    } catch (error) {
      console.error('Contact form submission failed:', error)
      setContactStatus({
        type: 'error',
        message: error instanceof Error
          ? error.message
          : 'Unable to send your message. Please try again later.',
      })
    }
  }

  return (
    <div className="portfolio-page" onClick={handleAnchorNavigation}>
      <header className="site-header page-width">
        <a className="wordmark" href="#home" aria-label="Lismer John Nadonza — Home">
          <span>Lismer John Nadonza</span>
        </a>
        <nav className="nav-wrap" aria-label="Main navigation">
          <GooeyNav
            items={navigation}
            theme={isDark ? 'dark' : 'light'}
            size="md"
            animationTime={650}
            gooeyness={0.55}
          />
        </nav>
        <div className="header-actions">
          <InnerMoon
            toggled={isDark}
            onClick={toggleTheme}
            duration={500}
            className="theme-toggle"
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          />
        </div>
      </header>

      <main>
        <section className="hero page-width" id="home" aria-labelledby="hero-title">
          <div className="hero-glow" aria-hidden="true">
            <Aurora
              className="hero-aurora"
              colorStops={['#9b8cff', '#6ee7d2', '#8bb8ff']}
              speed={0.24}
              amplitude={0.7}
              blend={0.55}
              height={0.6}
              glow={0.55}
              layers={1}
              opacity={0.24}
              mouseInteraction={false}
              lightMode={!isDark}
            />
          </div>
          <div className="hero-layout">
            <div className="hero-content">
              <h1 id="hero-title" className="hero-heading">
                <span className="hero-greeting">Hi, I’m</span>
                <TechText
                  text="Lismer John Nadonza"
                  fontFamily="Inter, ui-sans-serif, system-ui, sans-serif"
                  fontWeight={650}
                  fontSize={96}
                  letterSpacing={-0.045}
                  color={isDark ? '#f5f3f9' : '#211d29'}
                  accentColor={isDark ? '#b9a8ff' : '#7355ae'}
                  align="left"
                  reach={160}
                  softness={0.78}
                  labels={false}
                  selection={false}
                  draggable={false}
                  speed={0.85}
                  className="hero-tech-name"
                />
              </h1>
              <div className="hero-school" aria-label="Student from Global Reciprocal Colleges">
                <span className="hero-school-label">Student from</span>
                <RotatingText
                  texts={['Global', 'Reciprocal', 'Colleges']}
                  effect="flip"
                  direction="up"
                  rotationInterval={1800}
                  splitBy="words"
                  highlight
                  highlightColor={isDark ? '#7656c8' : '#6951a5'}
                  mainClassName="hero-school-rotating"
                />
              </div>
              <p className="hero-description">
                <ShinyText
                  text="I’m learning web development and building projects with AI assistance, one step at a time."
                  color={isDark ? '#aaa6b1' : '#696473'}
                  shineColor={isDark ? '#e4dcff' : '#7355ae'}
                  speed={2.4}
                  shineWidth={42}
                  className="hero-shiny-note"
                />
              </p>
            </div>
            <div className="hero-profile" role="img" aria-label="Portrait of Lismer John Nadonza">
              <ProfileCard
                avatarUrl={profilePhoto}
                name=""
                title=""
                handle=""
                status=""
                contactText=""
                showUserInfo={false}
                theme={isDark ? 'dark' : 'light'}
                radius={170}
                holo={0.48}
                glare={0.34}
                enableTilt
                tiltStrength={9}
                parallax={4}
                enableMobileTilt
                mobileTiltSensitivity={2.2}
                className="hero-profile-card"
              />
            </div>
          </div>
        </section>

        <section className="about-section page-width content-section" id="about">
          <div className="section-heading">
            <p className="eyebrow"><span>02 — THE PERSON BEHIND THE PIXELS</span></p>
            <h2>Passionate Developer Creating Digital Experiences</h2>
            <p className="section-intro">
              A few things that shape how I think, what I make, and where I put
              my attention.
            </p>
          </div>
          <MagicBento
            items={highlights}
            columns={3}
            rowHeight={220}
            gap={14}
            radius={22}
            theme={isDark ? 'dark' : 'light'}
            glowColor="#a99aff"
            textAutoHide={false}
            enableBorderGlow
            enableSpotlight
            spotlightRadius={260}
            enableStars={false}
            enableTilt={false}
            enableMagnetism={false}
            intro
            className="about-bento"
          />
        </section>

        <section className="work-section page-width content-section" id="projects">
          <div className="work-heading">
            <div className="section-heading">
              <p className="eyebrow"><span>03 — SELECTED CONCEPTS</span></p>
              <h2>Made to be explored.</h2>
            </div>
            <p className="work-note">
              A few placeholders for the work, experiments, and ideas to come.
            </p>
          </div>
          <div className="project-grid">
            {projects.map((project) => (
              <FadeContent
                key={project.number}
                className="project-reveal"
                effect="fade"
                duration={0.85}
                ease="power2.out"
                threshold={0.12}
                trigger="scroll"
                once
              >
                <article className="project-card">
                  <div className="project-art">
                    <HoloCard
                      image={project.artwork}
                      alt={`${project.title} project concept artwork`}
                      preset={project.preset}
                      intensity={0.62}
                      edgeSparkle={0.55}
                      glare={0.3}
                      width={360}
                      radius={20}
                      tiltMax={8}
                      hoverScale={1.025}
                      idle
                      className="project-holo"
                      style={{ width: '100%', aspectRatio: '10 / 7' }}
                    />
                    <span className="project-number">{project.number}</span>
                  </div>
                  <div className="project-meta">
                    <div className="project-title-row">
                      <div>
                        <p className="project-category">{project.category} · CONCEPT</p>
                        <h3>{project.title}</h3>
                      </div>
                      <span className="project-arrow" aria-hidden="true">
                        <MoveUpRight size={17} />
                      </span>
                    </div>
                    <p className="project-description">{project.description}</p>
                    <div className="project-tags">
                      {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
                    </div>
                  </div>
                </article>
              </FadeContent>
            ))}
          </div>
          <a className="all-work-link" href="#contact">
            MORE GOOD THINGS ARE IN PROGRESS <ArrowRight size={15} aria-hidden="true" />
          </a>
        </section>

        <section className="stack-section page-width" id="skills" aria-label="Tools and skills">
          <div className="section-rule">
            <span>TOOLS & CRAFT</span>
            <span>THE THINGS I LIKE TO BUILD WITH</span>
          </div>
          <LogoLoop
            logos={skillLogos}
            speed={34}
            direction="left"
            logoHeight={24}
            gap={44}
            labels="none"
            fadeOut
            pauseOnHover
            ariaLabel="Tools and skills"
            className="skills-loop"
          />
        </section>

        <section className="contact-section page-width content-section" id="contact">
          <h2 className="contact-title">Get In Touch</h2>
          <div className="contact-layout">
            <div className="contact-intro">
              <h3>Let’s Connect</h3>
              <p>
                I’m open to discussing new opportunities, creative projects, or
                just having a friendly chat about tech.
              </p>
              <a className="contact-email" href="mailto:lismerjohnnadonza@gmail.com">
                <Mail size={21} aria-hidden="true" />
                <span>
                  <strong>Email</strong>
                  <span>lismerjohnnadonza@gmail.com</span>
                </span>
              </a>
            </div>
            <form className="contact-form" onSubmit={handleContactSubmit}>
              <div className="contact-form-row">
                <label className="contact-field">
                  <span>Full Name</span>
                  <input
                    autoComplete="name"
                    maxLength={120}
                    name="name"
                    placeholder="Your full name"
                    required
                  />
                </label>
                <label className="contact-field">
                  <span>Email Address</span>
                  <input
                    autoComplete="email"
                    maxLength={254}
                    name="email"
                    placeholder="you@example.com"
                    required
                    type="email"
                  />
                </label>
              </div>
              <label className="contact-field">
                <span>Subject</span>
                <input
                  maxLength={150}
                  name="subject"
                  placeholder="What would you like to discuss?"
                  required
                />
              </label>
              <label className="contact-field">
                <span>Message</span>
                <textarea
                  maxLength={5000}
                  name="message"
                  placeholder="Write your message..."
                  required
                  rows={6}
                />
              </label>
              <button
                className="contact-submit"
                disabled={contactStatus.type === 'sending'}
                type="submit"
              >
                <Send size={18} aria-hidden="true" />
                {contactStatus.type === 'sending' ? 'Sending…' : 'Send Message'}
              </button>
              <p
                className={`contact-status contact-status--${contactStatus.type}`}
                aria-live="polite"
                role={contactStatus.type === 'error' ? 'alert' : 'status'}
              >
                {contactStatus.message}
              </p>
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer page-width">
        <span>© 2026 LISMER · MADE WITH CURIOSITY</span>
        <a href="#home">BACK TO TOP ↑</a>
      </footer>
    </div>
  )
}

export default App
