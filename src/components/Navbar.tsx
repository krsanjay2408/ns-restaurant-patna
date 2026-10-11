import React, { useState } from 'react';
import { ShoppingBag, User, Calendar, MapPin, Search, ShieldCheck, Clock, Sparkles } from 'lucide-react';
import { UserProfile } from '../types';

interface NavbarProps {
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
  onOpenReservation: () => void;
  onOpenAuth: () => void;
  onOpenProfile: () => void;
  onOpenAdmin: () => void;
  user: UserProfile | null;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  cartTotal,
  onOpenCart,
  onOpenReservation,
  onOpenAuth,
  onOpenProfile,
  onOpenAdmin,
  user,
  searchQuery,
  onSearchChange,
}) => {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <header className="glass-nav">
      {/* Top Notification Bar */}
      <div style={{ background: 'rgba(217, 119, 6, 0.15)', borderBottom: '1px solid rgba(245, 158, 11, 0.2)', padding: '6px 16px', fontSize: '12px' }}>
        <div className="container-custom" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#fde68a', fontWeight: '600' }}>
              <MapPin size={13} color="#f59e0b" /> Fraser Road, Patna (Opp. Maurya Complex)
            </span>
            <span style={{ color: 'rgba(255,255,255,0.3)' }}>|</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#10b981', fontWeight: '600' }}>
              <Clock size={13} /> Open Now (11:30 AM – 11:00 PM)
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ color: '#fde68a', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Sparkles size={12} /> Use Code <strong>PATNA100</strong> for ₹100 OFF
            </span>
            <button 
              onClick={onOpenAdmin}
              style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '11px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
              title="Restaurant Staff Portal"
            >
              <ShieldCheck size={12} /> Staff Portal
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="container-custom" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '76px', gap: '16px' }}>
        {/* Brand Logo & Title */}
        <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '14px', textDecoration: 'none' }}>
          <div style={{ 
            width: '48px', 
            height: '48px', 
            borderRadius: '50%', 
            overflow: 'hidden', 
            border: '2px solid #f59e0b',
            boxShadow: '0 0 15px rgba(245, 158, 11, 0.4)',
            flexShrink: 0,
            background: '#080b11'
          }}>
            <img 
              src="/assets/ns_logo.jpg" 
              alt="NS Restaurant Patna Logo" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onError={(e) => {
                // Fallback text avatar if image loading fails
                (e.target as HTMLElement).style.display = 'none';
              }} 
            />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span className="font-serif" style={{ fontSize: '22px', fontWeight: '800', letterSpacing: '1px', color: '#ffffff' }}>
                NS <span className="text-gold">RESTAURANT</span>
              </span>
            </div>
            <div style={{ fontSize: '11px', letterSpacing: '2px', color: '#f59e0b', fontWeight: '700', textTransform: 'uppercase' }}>
              Patna • Royal Dining
            </div>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '28px' }} className="hidden-mobile">
          <a href="#menu" style={{ color: '#e2e8f0', textDecoration: 'none', fontWeight: '600', fontSize: '15px', transition: 'color 0.2s' }}>
            Menu
          </a>
          <a href="#patna-specials" style={{ color: '#fde68a', textDecoration: 'none', fontWeight: '700', fontSize: '15px' }}>
            Patna Specials
          </a>
          <a href="#reviews" style={{ color: '#94a3b8', textDecoration: 'none', fontWeight: '500', fontSize: '15px' }}>
            Reviews
          </a>
          <a href="#contact" style={{ color: '#94a3b8', textDecoration: 'none', fontWeight: '500', fontSize: '15px' }}>
            Contact & Timings
          </a>
        </nav>

        {/* Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Search Trigger */}
          <div style={{ position: 'relative' }}>
            {showSearch ? (
              <div style={{ display: 'flex', alignItems: 'center', background: '#121826', border: '1px solid #f59e0b', borderRadius: '30px', padding: '4px 12px' }}>
                <Search size={15} color="#94a3b8" />
                <input 
                  type="text"
                  placeholder="Search biryani, handi..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  autoFocus
                  style={{ background: 'transparent', border: 'none', color: '#fff', padding: '6px 8px', outline: 'none', fontSize: '13px', width: '160px' }}
                />
                <button 
                  onClick={() => setShowSearch(false)}
                  style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', fontSize: '14px', padding: '0 4px' }}
                >
                  ✕
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setShowSearch(true)} 
                className="btn-icon" 
                title="Search Dishes"
              >
                <Search size={18} />
              </button>
            )}
          </div>

          {/* Table Reservation Button */}
          <button 
            onClick={onOpenReservation}
            className="btn-outline-gold hidden-mobile"
            style={{ padding: '9px 18px', fontSize: '14px' }}
          >
            <Calendar size={16} />
            <span>Book Table</span>
          </button>

          {/* User Account / Profile Button */}
          {user ? (
            <button 
              onClick={onOpenProfile}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(245, 158, 11, 0.15)',
                border: '1px solid #f59e0b',
                color: '#fde68a',
                padding: '7px 14px',
                borderRadius: '9999px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '13px'
              }}
            >
              <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#f59e0b', color: '#0b0f17', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '11px' }}>
                {user.name.charAt(0)}
              </div>
              <span style={{ maxWidth: '80px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {user.name.split(' ')[0]}
              </span>
            </button>
          ) : (
            <button 
              onClick={onOpenAuth}
              className="btn-icon"
              title="Sign In / Register"
            >
              <User size={18} />
            </button>
          )}

          {/* Cart Trigger Button */}
          <button 
            onClick={onOpenCart}
            className="btn-gold"
            style={{ padding: '9px 18px', fontSize: '14px', position: 'relative' }}
          >
            <ShoppingBag size={18} />
            <span className="hidden-mobile">Cart</span>
            {cartCount > 0 && (
              <span style={{
                background: '#dc2626',
                color: '#ffffff',
                fontSize: '11px',
                fontWeight: '800',
                borderRadius: '50%',
                width: '20px',
                height: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 10px rgba(220, 38, 38, 0.8)'
              }}>
                {cartCount}
              </span>
            )}
            {cartTotal > 0 && (
              <span className="hidden-mobile" style={{ fontSize: '13px', borderLeft: '1px solid rgba(0,0,0,0.2)', paddingLeft: '8px' }}>
                ₹{cartTotal}
              </span>
            )}
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 840px) {
          .hidden-mobile {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
};
