import React from 'react';
import { Star, Flame, Plus, Minus, Clock, ShieldAlert } from 'lucide-react';
import { Dish } from '../types';

interface DishCardProps {
  dish: Dish;
  cartQuantity: number;
  onAddToCart: () => void;
  onUpdateQuantity: (delta: number) => void;
}

export const DishCard: React.FC<DishCardProps> = ({
  dish,
  cartQuantity,
  onAddToCart,
  onUpdateQuantity,
}) => {
  return (
    <div className="glass-card" style={{
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      position: 'relative',
      height: '100%',
      opacity: dish.isAvailable ? 1 : 0.65
    }}>
      {/* Dish Image Container */}
      <div style={{ position: 'relative', height: '210px', width: '100%', overflow: 'hidden', background: '#0f1523' }}>
        <img 
          src={dish.imageUrl} 
          alt={dish.name}
          loading="lazy"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
            filter: dish.isAvailable ? 'none' : 'grayscale(80%)'
          }}
          onMouseOver={(e) => {
            if (dish.isAvailable) (e.target as HTMLElement).style.transform = 'scale(1.08)';
          }}
          onMouseOut={(e) => {
            (e.target as HTMLElement).style.transform = 'scale(1)';
          }}
        />

        {/* Top Floating Badges */}
        <div style={{
          position: 'absolute',
          top: '12px',
          left: '12px',
          right: '12px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          pointerEvents: 'none'
        }}>
          {/* Dietary Badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span 
              className={dish.dietary === 'veg' ? 'badge-veg' : 'badge-nonveg'} 
              title={dish.dietary === 'veg' ? 'Vegetarian' : 'Non-Vegetarian'}
            />
            {dish.isJainFriendly && (
              <span className="badge-jain">Jain Safe</span>
            )}
          </div>

          {/* Chef Special Badge */}
          {dish.isChefSpecial && (
            <span style={{
              background: 'linear-gradient(135deg, #d97706, #f59e0b)',
              color: '#0b0f17',
              fontSize: '11px',
              fontWeight: '800',
              padding: '3px 10px',
              borderRadius: '9999px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              boxShadow: '0 2px 10px rgba(245, 158, 11, 0.5)'
            }}>
              Chef's Special
            </span>
          )}
        </div>

        {/* Bottom Image Gradient Overlay for Details */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          background: 'linear-gradient(to top, rgba(8, 11, 17, 0.95) 0%, transparent 100%)',
          padding: '12px 14px 6px 14px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end'
        }}>
          {/* Prep Time */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#cbd5e1' }}>
            <Clock size={12} color="#f59e0b" />
            <span>{dish.prepTimeMinutes} mins</span>
          </div>

          {/* Rating */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '3px', background: 'rgba(0,0,0,0.6)', padding: '2px 8px', borderRadius: '12px', fontSize: '12px', fontWeight: '700', color: '#fbbf24' }}>
            <Star size={13} fill="#fbbf24" />
            <span>{dish.rating}</span>
            <span style={{ color: '#94a3b8', fontSize: '11px' }}>({dish.reviewsCount})</span>
          </div>
        </div>

        {/* Sold Out Overlay */}
        {!dish.isAvailable && (
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.65)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ef4444',
            fontWeight: '800',
            fontSize: '18px',
            letterSpacing: '1px',
            textTransform: 'uppercase'
          }}>
            Sold Out
          </div>
        )}
      </div>

      {/* Dish Information Content */}
      <div style={{ padding: '18px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px', marginBottom: '6px' }}>
          <h3 className="font-serif" style={{ fontSize: '18px', fontWeight: '700', color: '#ffffff', lineHeight: 1.3 }}>
            {dish.name}
          </h3>
        </div>

        {dish.hindiName && (
          <div style={{ fontSize: '13px', color: '#f59e0b', marginBottom: '8px', fontWeight: '500' }}>
            {dish.hindiName}
          </div>
        )}

        <p style={{
          fontSize: '13px',
          lineHeight: '1.5',
          color: '#94a3b8',
          marginBottom: '14px',
          flex: 1,
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}>
          {dish.description}
        </p>

        {/* Spice Level & Allergen Tags */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px', flexWrap: 'wrap' }}>
          {/* Spice Indicator */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '2px', background: 'rgba(249, 115, 22, 0.1)', padding: '2px 8px', borderRadius: '6px', fontSize: '11px', color: '#fb923c' }}>
            <Flame size={12} />
            <span>
              {dish.spiceLevel === 1 ? 'Mild' : dish.spiceLevel === 2 ? 'Medium' : 'Tikha 🌶️'}
            </span>
          </div>

          {/* Allergens */}
          {dish.allergens.length > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#64748b' }}>
              <ShieldAlert size={11} />
              <span>{dish.allergens.join(', ')}</span>
            </div>
          )}
        </div>

        {/* Price & Action Row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', paddingTop: '10px', borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
          <div>
            <span style={{ fontSize: '12px', color: '#94a3b8' }}>Price</span>
            <div style={{ fontSize: '20px', fontWeight: '800', color: '#fde68a' }}>
              ₹{dish.price}
            </div>
          </div>

          {/* Dynamic Add / Stepper Button */}
          {dish.isAvailable ? (
            cartQuantity === 0 ? (
              <button 
                onClick={onAddToCart}
                className="btn-gold"
                style={{ padding: '8px 18px', fontSize: '13px' }}
              >
                <Plus size={15} />
                <span>Add</span>
              </button>
            ) : (
              <div className="quantity-stepper">
                <button 
                  onClick={() => onUpdateQuantity(-1)}
                  className="stepper-btn"
                  title="Decrease"
                >
                  <Minus size={13} />
                </button>
                <span className="stepper-count">{cartQuantity}</span>
                <button 
                  onClick={() => onUpdateQuantity(1)}
                  className="stepper-btn"
                  title="Increase"
                >
                  <Plus size={13} />
                </button>
              </div>
            )
          ) : (
            <span style={{ fontSize: '12px', color: '#64748b', fontStyle: 'italic' }}>
              Currently Unavailable
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
