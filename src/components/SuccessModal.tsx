import React from 'react'
import { motion } from 'framer-motion'
import { getTranslation, type Language } from '../i18n/translations'

interface SuccessModalProps {
  reference: string
  language: Language
  onClose: () => void
}

export default function SuccessModal({ reference, language, onClose }: SuccessModalProps) {
  const t = (key: string) => getTranslation(language, key)

  return (
    <motion.div
      className="success-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="success-modal"
        initial={{ scale: 0.8, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 24 }}
        onClick={(e) => e.stopPropagation()}
      >
        <motion.div
          className="success-icon-wrapper"
          initial={{ scale: 0, rotate: -90 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.15, type: 'spring', stiffness: 260, damping: 18 }}
        >
          <svg width="60" height="60" viewBox="0 0 48 48" fill="none">
            <motion.path
              d="M10 26L20 36L38 14"
              stroke="var(--primary)"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.3, duration: 0.5, ease: 'easeOut' }}
            />
            <motion.circle
              cx="10"
              cy="26"
              r="2"
              fill="var(--primary)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            />
            <motion.circle
              cx="20"
              cy="36"
              r="2"
              fill="var(--primary)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            />
            <motion.circle
              cx="38"
              cy="14"
              r="2"
              fill="var(--primary)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            />
          </svg>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          {t('payment.successTitle')}
        </motion.h2>

        <motion.p
          className="success-message"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          {t('payment.successMessage')}
        </motion.p>

        <motion.div
          className="reference-badge"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="pulse-dot" />
          <span className="ref-label">{t('payment.successReference')}:</span>
          <span className="ref-value">{reference}</span>
        </motion.div>

        <motion.button
          className="close-success-button"
          onClick={onClose}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          {t('payment.successClose')}
        </motion.button>
      </motion.div>
    </motion.div>
  )
}
