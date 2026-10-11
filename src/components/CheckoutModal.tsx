import React, { useState } from 'react';
import { X, QrCode, CreditCard, Banknote, Landmark, ShieldCheck, CheckCircle2, Lock } from 'lucide-react';
import { CartItem, Order, OrderType, PaymentMethod, UserProfile } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  subtotal: number;
  packagingCharge: number;
  gstAmount: number;
  deliveryFee: number;
  discount: number;
  couponCode?: string;
  total: number;
  orderType: OrderType;
  pincode: string;
  user: UserProfile | null;
  onOrderSuccess: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  subtotal,
  packagingCharge,
  gstAmount,
  deliveryFee,
  discount,
  couponCode,
  total,
  orderType,
  pincode,
  user,
  onOrderSuccess,
}) => {
  if (!isOpen) return null;

  const [customerName, setCustomerName] = useState(user?.name || '');
  const [customerPhone, setCustomerPhone] = useState(user?.phone || '');
  const [deliveryAddress, setDeliveryAddress] = useState(
    user?.savedAddresses[0]?.address || ''
  );
  const [landmark, setLandmark] = useState(user?.savedAddresses[0]?.landmark || '');
  const [tableNumber, setTableNumber] = useState('Table 4');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('upi');
  const [isProcessing, setIsProcessing] = useState(false);
  const [formError, setFormError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim()) {
      setFormError('Please enter your full name');
      return;
    }
    if (!customerPhone.trim() || customerPhone.replace(/\D/g, '').length < 10) {
      setFormError('Please enter a valid 10-digit mobile number');
      return;
    }
    if (orderType === 'delivery' && !deliveryAddress.trim()) {
      setFormError('Please enter your complete delivery address in Patna');
      return;
    }

    setFormError('');
    setIsProcessing(true);

    // Simulate payment authorization
    setTimeout(() => {
      const newOrder: Order = {
        id: `NS-${Math.floor(1000 + Math.random() * 9000)}`,
        customerName,
        customerPhone,
        customerEmail: user?.email || '',
        orderType,
        deliveryAddress: orderType === 'delivery' ? `${deliveryAddress}, Landmark: ${landmark}` : undefined,
        pincode: orderType === 'delivery' ? pincode : undefined,
        tableNumber: orderType === 'dine_in' ? tableNumber : undefined,
        items,
        subtotal,
        packagingCharge,
        gstAmount,
        deliveryFee,
        discount,
        couponCode,
        total,
        paymentMethod,
        paymentStatus: paymentMethod === 'cod' ? 'pending' : 'paid',
        orderStatus: 'received',
        createdAt: new Date().toISOString(),
        estimatedDeliveryMinutes: orderType === 'delivery' ? 30 : 20,
      };

      setIsProcessing(false);
      onOrderSuccess(newOrder);
    }, 1200);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="glass-modal" 
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '540px',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: '28px',
          position: 'relative'
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid rgba(245, 158, 11, 0.2)', paddingBottom: '14px' }}>
          <div>
            <h3 className="font-serif" style={{ fontSize: '22px', fontWeight: '800', color: '#fff' }}>
              Complete Your Order
            </h3>
            <p style={{ fontSize: '13px', color: '#f59e0b', textTransform: 'capitalize' }}>
              {orderType.replace('_', ' ')} • NS Restaurant Fraser Road
            </p>
          </div>
          <button onClick={onClose} className="btn-icon" style={{ width: '36px', height: '36px' }}>
            <X size={18} />
          </button>
        </div>

        {formError && (
          <div style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid #ef4444', color: '#fca5a5', padding: '10px 14px', borderRadius: '8px', fontSize: '13px', marginBottom: '16px' }}>
            {formError}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Customer Contact */}
          <div style={{ marginBottom: '18px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#cbd5e1', marginBottom: '6px' }}>
              Full Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Anand Kumar"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              style={{
                width: '100%',
                background: '#121826',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '8px',
                padding: '10px 14px',
                color: '#fff',
                fontSize: '14px',
                outline: 'none'
              }}
            />
          </div>

          <div style={{ marginBottom: '18px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#cbd5e1', marginBottom: '6px' }}>
              Mobile Number (for SMS & WhatsApp Tracking) *
            </label>
            <div style={{ display: 'flex' }}>
              <span style={{
                background: '#1a2234',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRight: 'none',
                borderRadius: '8px 0 0 8px',
                padding: '10px 12px',
                color: '#fde68a',
                fontSize: '14px',
                fontWeight: '700'
              }}>
                +91
              </span>
              <input
                type="tel"
                required
                maxLength={10}
                placeholder="98765 43210"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                style={{
                  flex: 1,
                  background: '#121826',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: '0 8px 8px 0',
                  padding: '10px 14px',
                  color: '#fff',
                  fontSize: '14px',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          {/* Delivery Specific Address */}
          {orderType === 'delivery' && (
            <>
              <div style={{ marginBottom: '18px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#cbd5e1', marginBottom: '6px' }}>
                  Delivery Address in Patna *
                </label>
                <textarea
                  required
                  rows={2}
                  placeholder="Flat/House No., Building Name, Street / Road..."
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  style={{
                    width: '100%',
                    background: '#121826',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '8px',
                    padding: '10px 14px',
                    color: '#fff',
                    fontSize: '14px',
                    outline: 'none',
                    resize: 'vertical'
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '18px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#cbd5e1', marginBottom: '4px' }}>
                    Landmark (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="Near Maurya Lok / St. Xavier's"
                    value={landmark}
                    onChange={(e) => setLandmark(e.target.value)}
                    style={{
                      width: '100%',
                      background: '#121826',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      borderRadius: '8px',
                      padding: '8px 12px',
                      color: '#fff',
                      fontSize: '13px',
                      outline: 'none'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#cbd5e1', marginBottom: '4px' }}>
                    Pincode
                  </label>
                  <input
                    type="text"
                    disabled
                    value={pincode}
                    style={{
                      width: '100%',
                      background: '#1a2234',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      borderRadius: '8px',
                      padding: '8px 12px',
                      color: '#10b981',
                      fontWeight: '700',
                      fontSize: '13px'
                    }}
                  />
                </div>
              </div>
            </>
          )}

          {/* Dine-in Table Number */}
          {orderType === 'dine_in' && (
            <div style={{ marginBottom: '18px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#cbd5e1', marginBottom: '6px' }}>
                Table Number / Seating Preference
              </label>
              <input
                type="text"
                value={tableNumber}
                onChange={(e) => setTableNumber(e.target.value)}
                style={{
                  width: '100%',
                  background: '#121826',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: '8px',
                  padding: '10px 14px',
                  color: '#fff',
                  fontSize: '14px',
                  outline: 'none'
                }}
              />
            </div>
          )}

          {/* Payment Method Selector */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#cbd5e1', marginBottom: '10px' }}>
              Select Payment Method
            </label>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
              {/* UPI */}
              <div
                onClick={() => setPaymentMethod('upi')}
                style={{
                  background: paymentMethod === 'upi' ? 'rgba(245, 158, 11, 0.15)' : '#121826',
                  border: paymentMethod === 'upi' ? '1.5px solid #f59e0b' : '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '10px',
                  padding: '12px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}
              >
                <QrCode size={20} color="#f59e0b" />
                <div>
                  <div style={{ fontSize: '13px', fontWeight: '700', color: '#fff' }}>UPI / QR</div>
                  <div style={{ fontSize: '11px', color: '#94a3b8' }}>GPay, PhonePe, Paytm</div>
                </div>
              </div>

              {/* Cards */}
              <div
                onClick={() => setPaymentMethod('card')}
                style={{
                  background: paymentMethod === 'card' ? 'rgba(245, 158, 11, 0.15)' : '#121826',
                  border: paymentMethod === 'card' ? '1.5px solid #f59e0b' : '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '10px',
                  padding: '12px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}
              >
                <CreditCard size={20} color="#f59e0b" />
                <div>
                  <div style={{ fontSize: '13px', fontWeight: '700', color: '#fff' }}>Cards</div>
                  <div style={{ fontSize: '11px', color: '#94a3b8' }}>Visa, Master, RuPay</div>
                </div>
              </div>

              {/* Netbanking */}
              <div
                onClick={() => setPaymentMethod('netbanking')}
                style={{
                  background: paymentMethod === 'netbanking' ? 'rgba(245, 158, 11, 0.15)' : '#121826',
                  border: paymentMethod === 'netbanking' ? '1.5px solid #f59e0b' : '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '10px',
                  padding: '12px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}
              >
                <Landmark size={20} color="#f59e0b" />
                <div>
                  <div style={{ fontSize: '13px', fontWeight: '700', color: '#fff' }}>Net Banking</div>
                  <div style={{ fontSize: '11px', color: '#94a3b8' }}>SBI, HDFC, ICICI, PNB</div>
                </div>
              </div>

              {/* COD */}
              <div
                onClick={() => setPaymentMethod('cod')}
                style={{
                  background: paymentMethod === 'cod' ? 'rgba(245, 158, 11, 0.15)' : '#121826',
                  border: paymentMethod === 'cod' ? '1.5px solid #f59e0b' : '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '10px',
                  padding: '12px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}
              >
                <Banknote size={20} color="#f59e0b" />
                <div>
                  <div style={{ fontSize: '13px', fontWeight: '700', color: '#fff' }}>Cash on Delivery</div>
                  <div style={{ fontSize: '11px', color: '#94a3b8' }}>Pay at Doorstep</div>
                </div>
              </div>
            </div>

            {/* UPI QR Display if UPI is selected */}
            {paymentMethod === 'upi' && (
              <div style={{
                marginTop: '14px',
                background: 'rgba(245, 158, 11, 0.08)',
                border: '1px dashed #f59e0b',
                borderRadius: '12px',
                padding: '14px',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '12px', color: '#cbd5e1', marginBottom: '8px' }}>
                  Scan to Pay ₹{total} via any UPI App:
                </div>
                {/* Simulated QR Code Graphic */}
                <div style={{
                  width: '120px',
                  height: '120px',
                  margin: '0 auto 8px auto',
                  background: '#ffffff',
                  borderRadius: '8px',
                  padding: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.5)'
                }}>
                  <img 
                    src="https://api.qrserver.com/v1/create-qr-code/?size=110x110&data=upi://pay?pa=nsrestaurant@hdfcbank&pn=NS%20Restaurant%20Patna" 
                    alt="UPI QR Code" 
                    style={{ width: '100%', height: '100%' }}
                  />
                </div>
                <div style={{ fontSize: '11px', color: '#fde68a', fontWeight: '700' }}>
                  UPI ID: nsrestaurant@hdfcbank
                </div>
              </div>
            )}
          </div>

          {/* Security & Action */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#94a3b8', marginBottom: '18px', justifyContent: 'center' }}>
            <Lock size={12} color="#10b981" />
            <span>256-Bit SSL Encrypted & PCI-DSS Compliant Payment</span>
          </div>

          <button
            type="submit"
            disabled={isProcessing}
            className="btn-gold"
            style={{ width: '100%', padding: '15px', fontSize: '16px', borderRadius: '12px' }}
          >
            {isProcessing ? (
              <span>Confirming Your Order...</span>
            ) : (
              <span>Pay & Place Order (₹{total})</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
