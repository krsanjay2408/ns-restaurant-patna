import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, Tag, MapPin, CheckCircle, ArrowRight, ShoppingBag } from 'lucide-react';
import { CartItem, OrderType, Coupon } from '../types';
import { PATNA_PINCODES, AVAILABLE_COUPONS } from '../data/mockData';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (dishId: string, delta: number) => void;
  onRemoveItem: (dishId: string) => void;
  onClearCart: () => void;
  orderType: OrderType;
  onSetOrderType: (type: OrderType) => void;
  pincode: string;
  onSetPincode: (pin: string) => void;
  appliedCoupon: Coupon | null;
  onApplyCoupon: (coupon: Coupon | null) => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  orderType,
  onSetOrderType,
  pincode,
  onSetPincode,
  appliedCoupon,
  onApplyCoupon,
  onProceedToCheckout,
}) => {
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  if (!isOpen) return null;

  // Subtotal calculation
  const subtotal = items.reduce((sum, item) => sum + item.dish.price * item.quantity, 0);

  // Pincode validation
  const pincodeInfo = PATNA_PINCODES[pincode];
  const isPincodeValid = Boolean(pincodeInfo);

  // Delivery fee logic
  let deliveryFee = 0;
  if (orderType === 'delivery') {
    if (subtotal >= 699) {
      deliveryFee = 0; // Free delivery above 699
    } else {
      deliveryFee = pincodeInfo ? pincodeInfo.deliveryFee : 45;
    }
  }

  // Packaging charge (flat ₹25 for delivery/pickup, ₹0 for dine-in)
  const packagingCharge = orderType === 'dine_in' ? 0 : 25;

  // GST calculation: 5% (2.5% CGST + 2.5% SGST)
  const gstAmount = Math.round(subtotal * 0.05 * 100) / 100;

  // Discount calculation
  let discount = 0;
  if (appliedCoupon && subtotal >= appliedCoupon.minOrderValue) {
    if (appliedCoupon.discountType === 'flat') {
      discount = appliedCoupon.discountValue;
    } else {
      const pct = (subtotal * appliedCoupon.discountValue) / 100;
      discount = appliedCoupon.maxDiscount ? Math.min(pct, appliedCoupon.maxDiscount) : pct;
    }
  }

  const grandTotal = Math.max(0, Math.round((subtotal + packagingCharge + gstAmount + deliveryFee - discount) * 100) / 100);

  const handleApplyCoupon = (code: string) => {
    setCouponError('');
    const target = AVAILABLE_COUPONS.find((c) => c.code.toUpperCase() === code.trim().toUpperCase());
    if (!target) {
      setCouponError('Invalid coupon code');
      return;
    }
    if (subtotal < target.minOrderValue) {
      setCouponError(`Min order value for ${target.code} is ₹${target.minOrderValue}`);
      return;
    }
    onApplyCoupon(target);
    setCouponInput('');
  };

  return (
    <div className="modal-overlay" onClick={onClose} style={{ justifyContent: 'flex-end', padding: 0 }}>
      <div 
        className="glass-drawer"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '460px',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 210,
          animation: 'slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        {/* Drawer Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid rgba(245, 158, 11, 0.2)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ShoppingBag size={22} color="#f59e0b" />
            <h3 className="font-serif" style={{ fontSize: '20px', fontWeight: '800', color: '#fff' }}>
              Your Feast <span style={{ fontSize: '14px', color: '#f59e0b', fontWeight: '600' }}>({items.length} dishes)</span>
            </h3>
          </div>

          <button onClick={onClose} className="btn-icon" style={{ width: '34px', height: '34px' }}>
            <X size={18} />
          </button>
        </div>

        {/* Fulfillment Switch: Delivery, Pickup, Dine-in */}
        <div style={{ padding: '14px 24px', background: 'rgba(15, 21, 35, 0.6)', borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', background: '#0a0d14', padding: '4px', borderRadius: '10px' }}>
            {(['delivery', 'pickup', 'dine_in'] as OrderType[]).map((type) => (
              <button
                key={type}
                onClick={() => onSetOrderType(type)}
                style={{
                  background: orderType === type ? 'var(--gold-gradient)' : 'transparent',
                  color: orderType === type ? '#0b0f17' : '#94a3b8',
                  border: 'none',
                  borderRadius: '7px',
                  padding: '7px 4px',
                  fontSize: '12px',
                  fontWeight: orderType === type ? '800' : '600',
                  cursor: 'pointer',
                  textTransform: 'capitalize'
                }}
              >
                {type.replace('_', '-')}
              </button>
            ))}
          </div>

          {/* Patna Delivery Pincode Input */}
          {orderType === 'delivery' && (
            <div style={{ marginTop: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MapPin size={15} color="#f59e0b" />
                <span style={{ fontSize: '12px', color: '#cbd5e1', fontWeight: '600' }}>Patna Pincode:</span>
                <input
                  type="text"
                  maxLength={6}
                  value={pincode}
                  onChange={(e) => onSetPincode(e.target.value)}
                  placeholder="800001"
                  style={{
                    background: '#121826',
                    border: isPincodeValid ? '1px solid #10b981' : '1px solid rgba(255,255,255,0.15)',
                    color: '#fff',
                    borderRadius: '6px',
                    padding: '4px 8px',
                    width: '85px',
                    fontSize: '13px',
                    fontWeight: '700',
                    outline: 'none'
                  }}
                />
              </div>

              {/* Pincode Info / Validation */}
              {isPincodeValid ? (
                <div style={{ fontSize: '11px', color: '#10b981', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <CheckCircle size={12} /> Serviceable: {pincodeInfo.locality} (~{pincodeInfo.estimatedMins} mins)
                </div>
              ) : (
                <div style={{ fontSize: '11px', color: '#f59e0b', marginTop: '4px' }}>
                  Enter valid Patna Pincode (e.g., 800001, 800013, 800020)
                </div>
              )}
            </div>
          )}
        </div>

        {/* Cart Item List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 24px' }}>
          {items.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 0', color: '#94a3b8' }}>
              <div style={{ fontSize: '48px', marginBottom: '12px' }}>🛒</div>
              <h4 style={{ color: '#fff', fontSize: '18px', marginBottom: '6px' }}>Your cart is empty</h4>
              <p style={{ fontSize: '13px' }}>Explore the menu to add delicious Patna specialties!</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {items.map(({ dish, quantity }) => (
                <div
                  key={dish.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    background: 'rgba(18, 24, 38, 0.7)',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    borderRadius: '12px',
                    padding: '10px 12px'
                  }}
                >
                  <img 
                    src={dish.imageUrl} 
                    alt={dish.name} 
                    style={{ width: '56px', height: '56px', borderRadius: '8px', objectFit: 'cover' }} 
                  />

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span className={dish.dietary === 'veg' ? 'badge-veg' : 'badge-nonveg'} style={{ width: '12px', height: '12px' }} />
                      <h4 style={{ fontSize: '14px', fontWeight: '700', color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {dish.name}
                      </h4>
                    </div>
                    <div style={{ fontSize: '13px', color: '#fde68a', fontWeight: '700', marginTop: '2px' }}>
                      ₹{dish.price * quantity} <span style={{ fontSize: '11px', color: '#64748b', fontWeight: '400' }}>(₹{dish.price} x {quantity})</span>
                    </div>
                  </div>

                  {/* Quantity Stepper */}
                  <div className="quantity-stepper" style={{ padding: '2px 4px', gap: '8px' }}>
                    <button onClick={() => onUpdateQuantity(dish.id, -1)} className="stepper-btn" style={{ width: '24px', height: '24px' }}>
                      <Minus size={11} />
                    </button>
                    <span className="stepper-count" style={{ fontSize: '13px', minWidth: '16px' }}>{quantity}</span>
                    <button onClick={() => onUpdateQuantity(dish.id, 1)} className="stepper-btn" style={{ width: '24px', height: '24px' }}>
                      <Plus size={11} />
                    </button>
                  </div>

                  {/* Remove Button */}
                  <button 
                    onClick={() => onRemoveItem(dish.id)}
                    style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', padding: '4px' }}
                    title="Remove item"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '4px' }}>
                <button 
                  onClick={onClearCart}
                  style={{ background: 'none', border: 'none', color: '#94a3b8', fontSize: '12px', cursor: 'pointer', textDecoration: 'underline' }}
                >
                  Clear all items
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Bill Details & Coupons (If items exist) */}
        {items.length > 0 && (
          <div style={{
            padding: '18px 24px',
            borderTop: '1px solid rgba(245, 158, 11, 0.2)',
            background: 'rgba(8, 11, 17, 0.95)'
          }}>
            {/* Coupon Code Section */}
            <div style={{ marginBottom: '14px' }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                <div style={{ position: 'relative', flex: 1 }}>
                  <Tag size={14} color="#f59e0b" style={{ position: 'absolute', left: '10px', top: '10px' }} />
                  <input
                    type="text"
                    placeholder="Enter Coupon (e.g. PATNA100)"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                    style={{
                      width: '100%',
                      background: '#121826',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                      padding: '8px 10px 8px 32px',
                      color: '#fff',
                      fontSize: '12px',
                      fontWeight: '700',
                      outline: 'none'
                    }}
                  />
                </div>
                <button
                  onClick={() => handleApplyCoupon(couponInput)}
                  className="btn-gold"
                  style={{ padding: '8px 14px', fontSize: '12px' }}
                >
                  Apply
                </button>
              </div>

              {/* Predefined Quick Coupons */}
              <div style={{ display: 'flex', gap: '6px', marginTop: '6px', flexWrap: 'wrap' }}>
                {AVAILABLE_COUPONS.map((cp) => (
                  <button
                    key={cp.code}
                    onClick={() => handleApplyCoupon(cp.code)}
                    style={{
                      background: appliedCoupon?.code === cp.code ? 'rgba(16, 185, 129, 0.2)' : 'rgba(245, 158, 11, 0.08)',
                      border: appliedCoupon?.code === cp.code ? '1px solid #10b981' : '1px dashed rgba(245, 158, 11, 0.3)',
                      color: appliedCoupon?.code === cp.code ? '#10b981' : '#fde68a',
                      borderRadius: '6px',
                      padding: '2px 8px',
                      fontSize: '11px',
                      fontWeight: '700',
                      cursor: 'pointer'
                    }}
                  >
                    {cp.code}
                  </button>
                ))}
              </div>

              {couponError && (
                <div style={{ fontSize: '11px', color: '#ef4444', marginTop: '4px' }}>
                  {couponError}
                </div>
              )}

              {appliedCoupon && (
                <div style={{ fontSize: '11px', color: '#10b981', marginTop: '4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>✓ {appliedCoupon.description}</span>
                  <button onClick={() => onApplyCoupon(null)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '11px' }}>
                    Remove
                  </button>
                </div>
              )}
            </div>

            {/* Price Calculations */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px', color: '#cbd5e1', marginBottom: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Item Subtotal</span>
                <span>₹{subtotal}</span>
              </div>

              {packagingCharge > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Eco-Packaging Charge</span>
                  <span>₹{packagingCharge}</span>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Restaurant GST (5% CGST + SGST)</span>
                <span>₹{gstAmount}</span>
              </div>

              {orderType === 'delivery' && (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Delivery Fee</span>
                  <span>{deliveryFee === 0 ? <strong style={{ color: '#10b981' }}>FREE</strong> : `₹${deliveryFee}`}</span>
                </div>
              )}

              {discount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#10b981', fontWeight: '700' }}>
                  <span>Coupon Discount ({appliedCoupon?.code})</span>
                  <span>-₹{discount}</span>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '17px', fontWeight: '800', color: '#fff', paddingTop: '8px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                <span>Grand Total</span>
                <span className="text-gold">₹{grandTotal}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={onProceedToCheckout}
              className="btn-gold"
              style={{ width: '100%', padding: '14px', fontSize: '15px', borderRadius: '12px' }}
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={18} />
            </button>
          </div>
        )}

      </div>

      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
};
