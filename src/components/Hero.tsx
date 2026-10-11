import React from 'react';
import { Calendar, ShoppingBag, Star, Flame, Clock, ShieldCheck, MapPin } from 'lucide-react';

interface HeroProps {
  onOrderClick: () => void;
  onReserveClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOrderClick, onReserveClick }) => {
  return (
    <section style={{
      position: 'relative',
      minHeight: '620px',
      display: 'flex',
      alignItems: 'center',
      overflow: 'hidden',
      borderBottom: '1px solid rgba(245, 158, 11, 0.2)',
      background: 'linear-gradient(180deg, #090c13 0%, #0d121c 100%)'
    }}>
      {/* Background Graphic & Atmosphere */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'url(/assets/hero_banner.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.32,
        filter: 'brightness(0.7) contrast(1.15)',
        pointerEvents: 'none'
      }} />

      {/* Radial Vignette & Glow */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(circle at 50% 40%, rgba(9, 12, 19, 0.5) 0%, rgba(9, 12, 19, 0.95) 85%)',
        pointerEvents: 'none'
      }} />

      <div className="container-custom" style={{ position: 'relative', zIndex: 10, paddingTop: '40px', paddingBottom: '60px' }}>
        <div style={{ maxWidth: '780px', margin: '0 auto', textAlign: 'center' }}>
          
          {/* Rating & Location Pill */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(245, 158, 11, 0.12)',
            border: '1px solid rgba(245, 158, 11, 0.35)',
            borderRadius: '9999px',
            padding: '6px 16px',
            marginBottom: '24px',
            boxShadow: '0 0 20px rgba(245, 158, 11, 0.2)'
          }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '3px', color: '#fbbf24', fontWeight: '800', fontSize: '13px' }}>
              <Star size={14} fill="#fbbf24" /> 4.9 Rating
            </span>
            <span style={{ color: 'rgba(255,255,255,0.3)' }}>•</span>
            <span style={{ color: '#e2e8f0', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <MapPin size={13} color="#f59e0b" /> Fraser Road, Patna
            </span>
            <span style={{ color: 'rgba(255,255,255,0.3)' }}>•</span>
            <span style={{ color: '#10b981', fontSize: '13px', fontWeight: '700' }}>
              Over 1,200+ Happy Diners
            </span>
          </div>

          {/* Main Royal Headline */}
          <h1 className="font-serif" style={{
            fontSize: 'clamp(34px, 5.5vw, 62px)',
            lineHeight: 1.15,
            fontWeight: 800,
            marginBottom: '20px',
            color: '#ffffff',
            textShadow: '0 4px 20px rgba(0,0,0,0.8)'
          }}>
            FINE DINING & AUTHENTIC FLAVORS IN <span className="text-gold-gradient">PATNA</span>
          </h1>

          {/* Subheading */}
          <p style={{
            fontSize: 'clamp(15px, 1.8vw, 19px)',
            lineHeight: 1.6,
            color: '#cbd5e1',
            marginBottom: '36px',
            maxWidth: '680px',
            margin: '0 auto 36px auto'
          }}>
            Relish authentic slow-cooked <strong>Champaran Ahuna Handi Meat</strong>, royal <strong>Shahi Dum Biryani</strong>, and crisp tandoori kebabs crafted with generational spice secret blends at <strong>NS Restaurant</strong>.
          </p>

          {/* CTA Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', flexWrap: 'wrap', marginBottom: '48px' }}>
            <button 
              onClick={onOrderClick}
              className="btn-gold"
              style={{ padding: '15px 32px', fontSize: '16px', letterSpacing: '0.5px' }}
            >
              <ShoppingBag size={20} />
              <span>Order Online Now</span>
            </button>

            <button 
              onClick={onReserveClick}
              className="btn-outline-gold"
              style={{ padding: '14px 28px', fontSize: '16px' }}
            >
              <Calendar size={19} />
              <span>Book a Royal Table</span>
            </button>
          </div>

          {/* Trust Highlights Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '16px',
            background: 'rgba(15, 21, 35, 0.75)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(12px)',
            borderRadius: '16px',
            padding: '16px 20px',
            textAlign: 'left'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(245, 158, 11, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f59e0b', flexShrink: 0 }}>
                <Flame size={20} />
              </div>
              <div>
                <div style={{ fontWeight: '700', fontSize: '14px', color: '#fff' }}>Ahuna Handi</div>
                <div style={{ fontSize: '12px', color: '#94a3b8' }}>Clay Pot Cooked</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(16, 185, 129, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981', flexShrink: 0 }}>
                <Clock size={20} />
              </div>
              <div>
                <div style={{ fontWeight: '700', fontSize: '14px', color: '#fff' }}>30 Mins Delivery</div>
                <div style={{ fontSize: '12px', color: '#94a3b8' }}>All Across Patna</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(6, 182, 212, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#06b6d4', flexShrink: 0 }}>
                <ShieldCheck size={20} />
              </div>
              <div>
                <div style={{ fontWeight: '700', fontSize: '14px', color: '#fff' }}>Pure & Hygienic</div>
                <div style={{ fontSize: '12px', color: '#94a3b8' }}>FSSAI Certified</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(239, 68, 68, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ef4444', flexShrink: 0 }}>
                <Star size={20} />
              </div>
              <div>
                <div style={{ fontWeight: '700', fontSize: '14px', color: '#fff' }}>Royal Ambience</div>
                <div style={{ fontSize: '12px', color: '#94a3b8' }}>AC & Patio Seating</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
