import React, { useState, useRef, FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getAllMethods, type PaymentMethod } from '../config/paymentMethods'
import { getTranslation, type Language } from '../i18n/translations'
import SuccessModal from './SuccessModal'

interface PaymentPortalProps { language: Language }

export default function PaymentPortal({ language }: PaymentPortalProps) {
  const [name, setName]                     = useState('')
  const [email, setEmail]                   = useState('')
  const [amount, setAmount]                 = useState('')
  const [currency, setCurrency]             = useState('USD')
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null)
  const [proof, setProof]                   = useState<File | null>(null)
  const [proofPreview, setProofPreview]     = useState<string | null>(null)
  const [note, setNote]                     = useState('')
  const [sending, setSending]               = useState(false)
  const [showSuccess, setShowSuccess]       = useState(false)
  const [submittedRef, setSubmittedRef]     = useState('')

  const fileRef     = useRef<HTMLInputElement>(null)
  const allMethods  = getAllMethods()
  const enabledMethods  = allMethods.filter(m => m.enabled)
  const disabledMethods = allMethods.filter(m => !m.enabled)

  const t = (key: string) => getTranslation(language, key)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setProof(file)
    if (file.type === 'application/pdf') {
      setProofPreview('__pdf__')
    } else {
      const reader = new FileReader()
      reader.onload = () => setProofPreview(reader.result as string)
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!name || !email || !amount || !selectedMethod || !proof) {
      alert(t('common.required'))
      return
    }
    setSending(true)
    const ref = `${selectedMethod.id.toUpperCase()}-${Date.now()}`
    const formData = new FormData()
    formData.append('name', name)
    formData.append('email', email)
    formData.append('reference', ref)
    formData.append('amount', amount)
    formData.append('currency', currency)
    formData.append('method', selectedMethod.name)
    formData.append('note', note)
    formData.append('file', proof)
    try {
      const res = await fetch('/api/submit-proof', { method: 'POST', body: formData })
      if (res.ok) {
        setSubmittedRef(ref)
        setShowSuccess(true)
        setName(''); setEmail(''); setAmount(''); setNote('')
        setSelectedMethod(null); setProof(null); setProofPreview(null)
      } else {
        alert(t('common.error'))
      }
    } catch { alert(t('common.error')) }
    finally { setSending(false) }
  }

  return (
    <div className="portal-container">

      {/* ── Header ─────────────────────────────────────────── */}
      <motion.div
        className="portal-header"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: .5, ease: [.22, 1, .36, 1] }}
      >
        <div className="secure-badge">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          Payment portal
        </div>
        <h1>
          {t('payment.title')} <span className="accent">{t('payment.titleAccent')}</span>
        </h1>
        <p>{t('payment.subtitle')}</p>
      </motion.div>

      {/* ── Form Card ──────────────────────────────────────── */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: .5, delay: .1, ease: [.22, 1, .36, 1] }}
        className="portal-form"
      >

        {/* ─ 01 — Informations ────────────────────────────── */}
        <div className="form-section">
          <p className="section-title">
            <span className="num">01</span> — {t('payment.step1')}
          </p>
          <div className="form-grid">
            <div className="form-field">
              <label>{t('payment.nameLabel')} <span className="req">*</span></label>
              <input type="text" value={name} onChange={e => setName(e.target.value)}
                placeholder={t('payment.namePlaceholder')} required />
            </div>
            <div className="form-field">
              <label>{t('payment.emailLabel')} <span className="req">*</span></label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder={t('payment.emailPlaceholder')} required />
            </div>
            <div className="form-field full">
              <label>{t('payment.amountLabel')} <span className="req">*</span></label>
              <div className="amount-row">
                <input type="number" step="0.01" min="0" value={amount}
                  onChange={e => setAmount(e.target.value)}
                  placeholder="ex. 250 $ USD ou 32 000 HTG" required />
                <select value={currency} onChange={e => setCurrency(e.target.value)}>
                  <option value="USD">USD</option>
                  <option value="HTG">HTG</option>
                  <option value="EUR">EUR</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="section-divider" />

        {/* ─ 02 — Méthode de paiement ─────────────────────── */}
        <div className="form-section">
          <p className="section-title">
            <span className="num">02</span> — {t('payment.step2')}
          </p>

          {/* Row 1 — actives */}
          <div className="methods-row">
            {enabledMethods.map(m => (
              <MethodCard key={m.id} method={m}
                selected={selectedMethod?.id === m.id}
                onSelect={() => {
                  if (m.type === 'redirect' && m.url) { window.open(m.url, '_blank') }
                  else { setSelectedMethod(prev => prev?.id === m.id ? null : m) }
                }}
              />
            ))}
          </div>

          {/* Row 2 — bientôt */}
          {disabledMethods.length > 0 && (
            <div className="methods-row">
              {disabledMethods.map(m => (
                <MethodCard key={m.id} method={m} selected={false} onSelect={() => {}} />
              ))}
            </div>
          )}

          {/* Instructions */}
          <AnimatePresence>
            {selectedMethod && selectedMethod.type !== 'redirect' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="method-instructions"
              >
                <p className="instruction">{selectedMethod.instructions[language]}</p>
                {selectedMethod.account && <p className="account">{selectedMethod.account}</p>}
                {selectedMethod.note    && <p className="note">{selectedMethod.note}</p>}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ─ 03 & 04 — visible après sélection ───────────── */}
        <AnimatePresence>
          {selectedMethod && selectedMethod.type !== 'redirect' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="section-divider" />

              {/* Upload */}
              <div className="form-section">
                <p className="section-title">
                  <span className="num">03</span> — {t('payment.step3')}
                </p>
                <p className="step-subtitle">{t('payment.step3sub')}</p>
                <div
                  className={`upload-zone${proofPreview ? ' has-file' : ''}`}
                  onClick={() => fileRef.current?.click()}
                  role="button" tabIndex={0}
                  onKeyDown={e => e.key === 'Enter' && fileRef.current?.click()}
                >
                  <input ref={fileRef} type="file" accept="image/*,.pdf"
                    onChange={handleFileChange} hidden />
                  {proofPreview ? (
                    <div className="file-preview">
                      {proofPreview === '__pdf__'
                        ? <div className="pdf-icon">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                              <polyline points="14 2 14 8 20 8"/>
                            </svg>
                          </div>
                        : <img src={proofPreview} alt="Aperçu" />
                      }
                      <p className="file-name">{proof?.name}</p>
                      <p className="change-text">{t('payment.changeFile')}</p>
                    </div>
                  ) : (
                    <div className="upload-prompt">
                      <div className="upload-icon">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"/>
                        </svg>
                      </div>
                      <p className="upload-label">{t('payment.dropLabel')}</p>
                      <p className="upload-sub">{t('payment.dropSub')}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="section-divider" />

              {/* Note */}
              <div className="form-section">
                <p className="section-title">
                  <span className="num">04</span> — {t('payment.step4')}{' '}
                  <span style={{ color:'var(--text-faint)', fontWeight:400, textTransform:'none', letterSpacing:0, fontSize:'.72rem' }}>
                    {t('payment.step4opt')}
                  </span>
                </p>
                <div className="form-field">
                  <textarea value={note} onChange={e => setNote(e.target.value)}
                    placeholder={t('payment.notePlaceholder')} rows={3} />
                </div>
              </div>

              {/* Submit */}
              <motion.button
                type="submit" className="submit-button" disabled={sending}
                whileHover={{ scale: 1.01 }} whileTap={{ scale: .99 }}
              >
                {sending
                  ? <><div className="spinner" />{t('payment.submitting')}</>
                  : <>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                        <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
                      </svg>
                      {t('payment.submit')}
                    </>
                }
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

      </motion.form>

      {/* ── Footer & Watermark ──────────────────────────────── */}
      <motion.div
        className="portal-footer"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .65 }}
      >
        <div className="footer-status">
          <div className="footer-badge">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
            {t('payment.secureFooter')}
          </div>
          <span className="footer-sep">|</span>
          <span className="footer-beta">{t('payment.betaFooter')}</span>
          <span className="footer-sep">|</span>
          <span className="footer-misc">{t('payment.updatingFooter')}</span>
        </div>
        <p className="footer-misc">{t('payment.encryptedFooter')}</p>

        {/* Watermark Grandou Agency */}
        <div className="watermark">
          <p className="watermark-line">
            Powered by{' '}
            <a href="https://grandouagency.com" target="_blank" rel="noopener noreferrer">
              Grandou Agency
            </a>
          </p>
          <div className="watermark-socials">
            <a href="https://github.com/grandouagency-cloud" target="_blank" rel="noopener noreferrer"
              className="watermark-link" title="GitHub">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/>
              </svg>
              grandouagency-cloud
            </a>
            <span className="watermark-dot">·</span>
            <a href="https://linkedin.com/company/grandouagency" target="_blank" rel="noopener noreferrer"
              className="watermark-link" title="LinkedIn">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"/>
                <rect x="2" y="9" width="4" height="12"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
              grandouagency
            </a>
            <span className="watermark-dot">·</span>
            <a href="https://instagram.com/grandouagency" target="_blank" rel="noopener noreferrer"
              className="watermark-link" title="Instagram">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <circle cx="12" cy="12" r="4.5"/>
                <circle cx="17.5" cy="6.5" r=".5" fill="currentColor"/>
              </svg>
              @grandouagency
            </a>
          </div>
        </div>
      </motion.div>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccess && (
          <SuccessModal reference={submittedRef} language={language}
            onClose={() => setShowSuccess(false)} />
        )}
      </AnimatePresence>
    </div>
  )
}

/* ── Method Card ──────────────────────────────────────────────── */
function MethodCard({
  method, selected, onSelect,
}: { method: PaymentMethod; selected: boolean; onSelect: () => void }) {
  const [imgError, setImgError] = useState(false)
  return (
    <motion.button
      type="button" onClick={onSelect}
      className={`method-card${selected ? ' selected' : ''}${!method.enabled ? ' disabled' : ''}`}
      whileHover={method.enabled ? { scale: 1.04, y: -2 } : {}}
      whileTap={method.enabled ? { scale: .97 } : {}}
      disabled={!method.enabled}
    >
      {!method.enabled && <span className="soon-label">METHOD OFF</span>}
      <div className="method-logo">
        {!imgError
          ? <img src={method.logo} alt={method.name} onError={() => setImgError(true)} />
          : <span className="logo-fallback">{method.logoFallback}</span>
        }
      </div>
      <span className="method-name">{method.name}</span>
    </motion.button>
  )
}
