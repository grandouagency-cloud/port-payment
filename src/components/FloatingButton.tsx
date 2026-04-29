import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface FloatingButtonProps {
  onClick: () => void
}

export default function FloatingButton({ onClick }: FloatingButtonProps) {
  const [showTooltip, setShowTooltip] = useState(false)

  return (
    <div className="floating-button-container">
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            className="floating-tooltip"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
          >
            Need help?
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        className="floating-button"
        onClick={onClick}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>

        {/* Notification dot */}
        <span className="notification-dot" />
      </motion.button>
    </div>
  )
}
