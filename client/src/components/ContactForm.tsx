import { useState, FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getTranslation, type Language } from '../i18n/translations'

interface ContactFormProps {
  isOpen: boolean
  onClose: () => void
  language: Language
}

export default function ContactForm({ isOpen, onClose, language }: ContactFormProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [sending, setSending] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const t = (key: string) => getTranslation(language, key)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!name || !email || !message) {
      alert(t('common.required'))
      return
    }

    setSending(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      })

      if (response.ok) {
        setShowSuccess(true)
        setTimeout(() => {
          setShowSuccess(false)
          setName('')
          setEmail('')
          setMessage('')
          onClose()
        }, 3000)
      } else {
        alert(t('common.error'))
      }
    } catch (error) {
      alert(t('common.error'))
    } finally {
      setSending(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="contact-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="contact-modal"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            {!showSuccess ? (
              <>
                <button className="close-button" onClick={onClose}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>

                <h2>{t('contact.title')}</h2>
                <p className="subtitle">{t('contact.subtitle')}</p>

                <form onSubmit={handleSubmit}>
                  <div className="form-field">
                    <label>{t('contact.nameLabel')}</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={t('contact.namePlaceholder')}
                      required
                    />
                  </div>

                  <div className="form-field">
                    <label>{t('contact.emailLabel')}</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t('contact.emailPlaceholder')}
                      required
                    />
                  </div>

                  <div className="form-field">
                    <label>{t('contact.messageLabel')}</label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={t('contact.messagePlaceholder')}
                      rows={4}
                      required
                    />
                  </div>

                  <motion.button
                    type="submit"
                    className="submit-button"
                    disabled={sending}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {sending ? (
                      <>
                        <div className="spinner" />
                        {t('contact.sending')}
                      </>
                    ) : (
                      t('contact.send')
                    )}
                  </motion.button>
                </form>
              </>
            ) : (
              <motion.div
                className="success-content"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="success-icon">
                  <motion.svg
                    width="60"
                    height="60"
                    viewBox="0 0 48 48"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.path
                      d="M10 26L20 36L38 14"
                      stroke="var(--primary)"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      fill="none"
                    />
                  </motion.svg>
                </div>
                <h2>{t('contact.successTitle')}</h2>
                <p>{t('contact.successMessage')}</p>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
