import React, { useState } from 'react';
import { X, Phone, Mail, Lock, User, ArrowRight, CheckCircle, ShieldCheck } from 'lucide-react';
import { UserProfile } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: UserProfile) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  if (!isOpen) return null;

  const [tab, setTab] = useState<'signin' | 'register'>('signin');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [otpStep, setOtpStep] = useState(false);
  const [otp, setOtp] = useState('');
  const [simulatedCode, setSimulatedCode] = useState('4819');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || phone.replace(/\D/g, '').length < 10) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setOtpStep(true);
      setSimulatedCode('4819'); // Pre-set code for instantaneous seamless verification
    }, 600);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp !== simulatedCode && otp !== '1234') {
      setError('Invalid OTP code. Please use simulated code: 4819');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const authenticatedUser: UserProfile = {
        id: `usr-${Date.now()}`,
        name: name.trim() || 'Foodie Diners',
        phone: `+91 ${phone}`,
        email: email.trim() || `${phone}@patnafood.com`,
        savedAddresses: [
          {
            id: 'addr-1',
            label: 'Home',
            address: 'Maurya Vihar, Fraser Road',
            landmark: 'Opp. Maurya Complex',
            pincode: '800001',
          }
        ],
        favoriteDishIds: ['dish-1', 'dish-3'],
      };

      onLoginSuccess(authenticatedUser);
      onClose();
    }, 700);
  };

  const handleSocialLogin = (provider: 'google' | 'whatsapp') => {
    const demoUser: UserProfile = {
      id: `usr-${Date.now()}`,
      name: provider === 'google' ? 'Priyanshu Ranjan' : 'Amitabh Sinha',
      phone: '+91 94310 99887',
      email: `${provider}@patnafood.com`,
      savedAddresses: [
        {
          id: 'addr-1',
          label: 'Home',
          address: 'Boring Road, Near Alankar Jewellers',
          landmark: 'Road No. 2',
          pincode: '800013',
        }
      ],
      favoriteDishIds: ['dish-1'],
    };
    onLoginSuccess(demoUser);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="glass-modal"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '440px',
          padding: '28px',
          position: 'relative'
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#0a0d14', border: '1.5px solid #f59e0b', overflow: 'hidden' }}>
              <img src="/assets/ns_logo.jpg" alt="NS Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <h3 className="font-serif" style={{ fontSize: '20px', fontWeight: '800', color: '#fff' }}>
              NS Restaurant Account
            </h3>
          </div>
          <button onClick={onClose} className="btn-icon" style={{ width: '34px', height: '34px' }}>
            <X size={16} />
          </button>
        </div>

        {/* Tab Toggle: Sign In / Register */}
        {!otpStep && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px', background: '#0c101a', padding: '4px', borderRadius: '10px', marginBottom: '20px' }}>
            <button
              onClick={() => { setTab('signin'); setError(''); }}
              style={{
                background: tab === 'signin' ? 'var(--gold-gradient)' : 'transparent',
                color: tab === 'signin' ? '#0b0f17' : '#94a3b8',
                border: 'none',
                borderRadius: '8px',
                padding: '8px',
                fontSize: '13px',
                fontWeight: tab === 'signin' ? '800' : '600',
                cursor: 'pointer'
              }}
            >
              Sign In
            </button>
            <button
              onClick={() => { setTab('register'); setError(''); }}
              style={{
                background: tab === 'register' ? 'var(--gold-gradient)' : 'transparent',
                color: tab === 'register' ? '#0b0f17' : '#94a3b8',
                border: 'none',
                borderRadius: '8px',
                padding: '8px',
                fontSize: '13px',
                fontWeight: tab === 'register' ? '800' : '600',
                cursor: 'pointer'
              }}
            >
              Register
            </button>
          </div>
        )}

        {error && (
          <div style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid #ef4444', color: '#fca5a5', padding: '10px 12px', borderRadius: '8px', fontSize: '12px', marginBottom: '14px' }}>
            {error}
          </div>
        )}

        {/* OTP Step */}
        {otpStep ? (
          <form onSubmit={handleVerifyOtp}>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <div style={{ fontSize: '14px', color: '#cbd5e1', marginBottom: '4px' }}>
                Enter verification code sent to
              </div>
              <div style={{ fontSize: '15px', fontWeight: '800', color: '#fde68a' }}>
                +91 {phone}
              </div>
              <div style={{
                background: 'rgba(245, 158, 11, 0.1)',
                border: '1px dashed #f59e0b',
                color: '#fde68a',
                padding: '6px 12px',
                borderRadius: '8px',
                fontSize: '12px',
                fontWeight: '700',
                marginTop: '10px',
                display: 'inline-block'
              }}>
                Simulated Test OTP: <strong>{simulatedCode}</strong>
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <input
                type="text"
                required
                maxLength={4}
                autoFocus
                placeholder="Enter 4-digit code"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                style={{
                  width: '100%',
                  background: '#121826',
                  border: '1px solid rgba(245, 158, 11, 0.4)',
                  borderRadius: '10px',
                  padding: '12px',
                  color: '#fff',
                  fontSize: '22px',
                  textAlign: 'center',
                  letterSpacing: '12px',
                  fontWeight: '800',
                  outline: 'none'
                }}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-gold"
              style={{ width: '100%', padding: '13px', fontSize: '15px', borderRadius: '10px', marginBottom: '12px' }}
            >
              {isLoading ? 'Verifying...' : 'Verify & Continue'}
            </button>

            <button
              type="button"
              onClick={() => setOtpStep(false)}
              style={{ width: '100%', background: 'none', border: 'none', color: '#94a3b8', fontSize: '12px', cursor: 'pointer', textDecoration: 'underline' }}
            >
              Change Phone Number
            </button>
          </form>
        ) : (
          /* Phone / Register Form */
          <form onSubmit={handleSendOtp}>
            {tab === 'register' && (
              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#cbd5e1', marginBottom: '4px' }}>
                  Full Name *
                </label>
                <div style={{ position: 'relative' }}>
                  <User size={15} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '12px' }} />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Suman Shekhar"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{
                      width: '100%',
                      background: '#121826',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      borderRadius: '8px',
                      padding: '10px 12px 10px 36px',
                      color: '#fff',
                      fontSize: '13px',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>
            )}

            <div style={{ marginBottom: '18px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#cbd5e1', marginBottom: '4px' }}>
                Mobile Number (Patna) *
              </label>
              <div style={{ display: 'flex' }}>
                <span style={{
                  background: '#1a2234',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderRight: 'none',
                  borderRadius: '8px 0 0 8px',
                  padding: '10px 12px',
                  color: '#fde68a',
                  fontSize: '13px',
                  fontWeight: '700'
                }}>
                  +91
                </span>
                <input
                  type="tel"
                  required
                  maxLength={10}
                  placeholder="98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  style={{
                    flex: 1,
                    background: '#121826',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '0 8px 8px 0',
                    padding: '10px 12px',
                    color: '#fff',
                    fontSize: '13px',
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-gold"
              style={{ width: '100%', padding: '13px', fontSize: '14px', borderRadius: '10px', marginBottom: '20px' }}
            >
              {isLoading ? 'Sending...' : 'Send OTP & Login'}
            </button>

            {/* Social Divider */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }} />
              <span style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase' }}>or fast login with</span>
              <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }} />
            </div>

            {/* Quick Social Sign-in */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '14px' }}>
              <button
                type="button"
                onClick={() => handleSocialLogin('google')}
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: '8px',
                  padding: '9px',
                  color: '#cbd5e1',
                  fontSize: '12px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
              >
                <span>Google Login</span>
              </button>

              <button
                type="button"
                onClick={() => handleSocialLogin('whatsapp')}
                style={{
                  background: 'rgba(16, 185, 129, 0.1)',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  borderRadius: '8px',
                  padding: '9px',
                  color: '#34d399',
                  fontSize: '12px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
              >
                <span>WhatsApp Login</span>
              </button>
            </div>

            {/* Safety & Env notice */}
            <div style={{
              background: 'rgba(59, 130, 246, 0.08)',
              border: '1px solid rgba(59, 130, 246, 0.25)',
              borderRadius: '8px',
              padding: '8px 10px',
              fontSize: '11px',
              color: '#93c5fd',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <ShieldCheck size={14} color="#60a5fa" style={{ flexShrink: 0 }} />
              <span><strong>Testing Ready:</strong> Instant OTP (4819) active. Private keys stay safe in Git-ignored <code>.env</code> file.</span>
            </div>
          </form>
        )}

        <div style={{ textAlign: 'center', fontSize: '11px', color: '#64748b', marginTop: '14px' }}>
          By continuing, you agree to NS Restaurant's Terms & Patna Delivery Policies.
        </div>
      </div>
    </div>
  );
};
