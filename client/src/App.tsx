import { useState } from 'react'
import PaymentPortal from './components/PaymentPortal'
import ContactForm from './components/ContactForm'
import FloatingButton from './components/FloatingButton'
import LanguageToggle from './components/LanguageToggle'
import { type Language } from './i18n/translations'
import './styles/main.css'

export default function App() {
  const [language, setLanguage] = useState<Language>('fr')
  const [showContact, setShowContact] = useState(false)

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'fr' : 'en'))
  }

  return (
    <div className="app-container">
      {/* Language Toggle */}
      <LanguageToggle language={language} onToggle={toggleLanguage} />

      {/* Main Payment Portal */}
      <PaymentPortal language={language} />

      {/* Floating Help Button */}
      <FloatingButton onClick={() => setShowContact(true)} />

      {/* Contact Form Overlay */}
      <ContactForm
        isOpen={showContact}
        onClose={() => setShowContact(false)}
        language={language}
      />
    </div>
  )
}
