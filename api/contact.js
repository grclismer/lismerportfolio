import nodemailer from 'nodemailer'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MAX_NAME_LENGTH = 120
const MAX_EMAIL_LENGTH = 254
const MAX_SUBJECT_LENGTH = 150
const MAX_MESSAGE_LENGTH = 5000

const getText = (value) => (typeof value === 'string' ? value.trim() : '')

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ message: 'Method not allowed.' })
  }

  const name = getText(req.body?.name)
  const email = getText(req.body?.email)
  const subject = getText(req.body?.subject)
  const message = getText(req.body?.message)

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ message: 'Please complete every field.' })
  }

  if (
    name.length > MAX_NAME_LENGTH
    || email.length > MAX_EMAIL_LENGTH
    || subject.length > MAX_SUBJECT_LENGTH
    || message.length > MAX_MESSAGE_LENGTH
  ) {
    return res.status(400).json({ message: 'One or more fields exceed the allowed length.' })
  }

  if (!EMAIL_PATTERN.test(email)) {
    return res.status(400).json({ message: 'Please enter a valid email address.' })
  }

  if (/[\r\n]/.test(name) || /[\r\n]/.test(subject)) {
    return res.status(400).json({ message: 'Name and subject cannot contain line breaks.' })
  }

  const { GMAIL_USER, GMAIL_APP_PASSWORD, CONTACT_TO_EMAIL } = process.env
  if (!GMAIL_USER || !GMAIL_APP_PASSWORD || !CONTACT_TO_EMAIL) {
    console.error('Contact mail configuration is incomplete.')
    return res.status(503).json({
      message: 'The contact form is not configured yet. Please email lismerjohnnadonza@gmail.com directly.',
    })
  }

  if (!EMAIL_PATTERN.test(GMAIL_USER) || !EMAIL_PATTERN.test(CONTACT_TO_EMAIL)) {
    console.error('GMAIL_USER or CONTACT_TO_EMAIL is not a valid email address.')
    return res.status(503).json({
      message: 'The contact form is not configured correctly. Please email lismerjohnnadonza@gmail.com directly.',
    })
  }

  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: GMAIL_USER,
        pass: GMAIL_APP_PASSWORD.replace(/\s+/g, ''),
      },
    })

    await transporter.sendMail({
      from: {
        name: 'Portfolio contact form',
        address: GMAIL_USER,
      },
      to: CONTACT_TO_EMAIL,
      replyTo: {
        name,
        address: email,
      },
      subject: `Portfolio inquiry: ${subject}`,
      text: [
        'New message from your portfolio contact form',
        '',
        `Name: ${name}`,
        `Email: ${email}`,
        `Subject: ${subject}`,
        '',
        'Message:',
        message,
      ].join('\n'),
    })
  } catch (error) {
    console.error('Failed to send portfolio contact email:', error)
    return res.status(502).json({
      message: 'We could not send your message right now. Please try again or email lismerjohnnadonza@gmail.com directly.',
    })
  }

  return res.status(200).json({ message: 'Thanks! Your message has been sent.' })
}
