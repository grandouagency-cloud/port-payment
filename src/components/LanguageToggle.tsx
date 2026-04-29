import React from 'react'
import { motion } from 'framer-motion'
import { type Language } from '../i18n/translations'

interface LanguageToggleProps {
  language: Language
  onToggle: () => void
}

export default function LanguageToggle({ language, onToggle }: LanguageToggleProps) {
  return (
    <motion.button
      className="language-toggle"
      onClick={onToggle}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <span className={language === 'en' ? 'active' : ''}>EN</span>
      <span className="separator">/</span>
      <span className={language === 'fr' ? 'active' : ''}>FR</span>
    </motion.button>
  )
}
