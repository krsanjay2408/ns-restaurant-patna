import React from 'react';
import { Home, Utensils, Calendar, ShoppingBag, User, ArrowRight } from 'lucide-react';
import { UserProfile } from '../types';

interface MobileBottomBarProps {
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
  onOpenReservation: () => void;
  onOpenAuthOrProfile: () => void;
  user: UserProfile | null;
}

export const MobileBottomBar: React.FC<MobileBottomBarProps> = ({
  cartCount,
  cartTotal,
  onOpenCart,
  onOpenReservation,
  onOpenAuthOrProfile,
  user,
}) => {
  return (
    <>
      {/* Floating Cart Pill when items are present */}
      {cartCount > 0 && (
        <div 
          onClick={onOpenCart}
          className="floating-cart-pill"
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              background: '#0b0f17',
              color: '#f59e0b',
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
              fontWeight: '800'
            }}>
              {cartCount}
            </div>
            <span>{cartCount} {cartCount === 1 ? 'Dish' : 'Dishes'} • ₹{cartTotal}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px' }}>
            <span>View Feast</span>
            <ArrowRight size={16} />
          </div>
        </div>
      )}

      {/* Fixed Bottom Navigation Bar on Mobile */}
      <nav className="mobile-bottom-bar">
        <a href="#" className="mobile-nav-item active">
          <Home size={20} />
          <span>Home</span>
        </a>

        <a href="#menu" className="mobile-nav-item">
          <Utensils size={20} />
          <span>Menu</span>
        </a>

        <button onClick={onOpenReservation} className="mobile-nav-item">
          <Calendar size={20} />
          <span>Reserve</span>
        </button>

        <button onClick={onOpenCart} className="mobile-nav-item" style={{ position: 'relative' }}>
          <ShoppingBag size={20} />
          <span>Cart</span>
          {cartCount > 0 && (
            <span style={{
              position: 'absolute',
              top: '-3px',
              right: '8px',
              background: '#ef4444',
              color: '#fff',
              fontSize: '10px',
              fontWeight: '800',
              borderRadius: '50%',
              width: '16px',
              height: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {cartCount}
            </span>
          )}
        </button>

        <button onClick={onOpenAuthOrProfile} className="mobile-nav-item">
          <User size={20} />
          <span>{user ? user.name.split(' ')[0] : 'Profile'}</span>
        </button>
      </nav>
    </>
  );
};
