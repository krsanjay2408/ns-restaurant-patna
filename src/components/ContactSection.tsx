import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, MessageSquare, ChevronDown, ChevronUp } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: 'Which areas in Patna do you deliver to?',
      a: 'We deliver across Patna including Fraser Road, Dak Bungalow, Boring Road, Patliputra, Kankarbagh, Rajendra Nagar, Bailey Road, Raja Bazar, and Danapur within 30–40 minutes.'
    },
    {
      q: 'Is there a separate kitchen/prep for Pure Veg and Jain food?',
      a: 'Yes, absolutely. At NS Restaurant, vegetarian and Jain dishes are strictly prepared with dedicated cookware and clay tandoor section following pure dietary sanctities.'
    },
    {
      q: 'Do I need to reserve a table in advance on weekends?',
      a: 'Table reservation is highly recommended on Friday evenings and weekends to avoid wait times. You can reserve online through our website for immediate confirmation.'
    },
    {
      q: 'What is the delivery fee and minimum order value?',
      a: 'Delivery is 100% FREE on all orders above ₹699. For smaller orders, a nominal delivery fee of ₹35–₹45 applies depending on your Patna pincode.'
    }
  ];

  return (
    <section id="contact" style={{ padding: '70px 0', borderTop: '1px solid rgba(255, 255, 255, 0.06)', background: '#070a10' }}>
      <div className="container-custom">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px' }}>
          
          {/* Location & Hours */}
          <div>
            <div style={{ color: '#f59e0b', fontSize: '13px', fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '8px' }}>
              Visit Our Outlet
            </div>
            <h2 className="font-serif" style={{ fontSize: '32px', fontWeight: '800', color: '#fff', marginBottom: '16px' }}>
              NS RESTAURANT <span className="text-gold">PATNA</span>
            </h2>
            <p style={{ color: '#cbd5e1', fontSize: '14px', lineHeight: '1.6', marginBottom: '24px' }}>
              Located in the heart of Patna's commercial corridor. Experience royal hospitality, live tandoor aromas, and private dining lounges.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '28px' }}>
              <div style={{ display: 'flex', gap: '12px' }}>
                <MapPin size={20} color="#f59e0b" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <div style={{ fontWeight: '700', color: '#fff', fontSize: '14px' }}>Outlet Address</div>
                  <div style={{ color: '#94a3b8', fontSize: '13px' }}>
                    1st Floor, Royal Grand Arcade, Fraser Road, Opp. Maurya Lok Complex, Patna, Bihar – 800001
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <Clock size={20} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <div style={{ fontWeight: '700', color: '#fff', fontSize: '14px' }}>Operating Hours</div>
                  <div style={{ color: '#94a3b8', fontSize: '13px' }}>
                    Lunch: 11:30 AM – 04:00 PM<br />
                    Dinner: 07:00 PM – 11:00 PM (All 7 Days Open)
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <Phone size={20} color="#06b6d4" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <div style={{ fontWeight: '700', color: '#fff', fontSize: '14px' }}>Call & Bookings</div>
                  <div style={{ color: '#94a3b8', fontSize: '13px' }}>
                    +91 94310 00000 / 0612-2234567
                  </div>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <a
                href="https://maps.google.com/?q=Fraser+Road+Patna"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-gold"
                style={{ padding: '10px 18px', fontSize: '13px', textDecoration: 'none' }}
              >
                <MapPin size={15} /> Get Directions (Google Maps)
              </a>

              <a
                href="https://wa.me/919431000000?text=Hi%20NS%20Restaurant%20Patna"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold"
                style={{ padding: '10px 18px', fontSize: '13px', textDecoration: 'none' }}
              >
                <MessageSquare size={15} /> WhatsApp Us
              </a>
            </div>
          </div>

          {/* FAQ Accordion */}
          <div>
            <div style={{ color: '#f59e0b', fontSize: '13px', fontWeight: '700', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '8px' }}>
              Questions & Answers
            </div>
            <h3 className="font-serif" style={{ fontSize: '28px', fontWeight: '800', color: '#fff', marginBottom: '20px' }}>
              FREQUENTLY ASKED
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {faqs.map((f, idx) => (
                <div
                  key={idx}
                  style={{
                    background: 'rgba(18, 24, 38, 0.75)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    transition: 'border-color 0.2s'
                  }}
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    style={{
                      width: '100%',
                      padding: '16px',
                      background: 'none',
                      border: 'none',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      color: '#fff',
                      fontWeight: '700',
                      fontSize: '14px',
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    <span>{f.q}</span>
                    {openFaq === idx ? <ChevronUp size={18} color="#f59e0b" /> : <ChevronDown size={18} color="#94a3b8" />}
                  </button>

                  {openFaq === idx && (
                    <div style={{ padding: '0 16px 16px 16px', color: '#cbd5e1', fontSize: '13px', lineHeight: '1.5' }}>
                      {f.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer Copyright */}
        <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', marginTop: '60px', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', fontSize: '12px', color: '#64748b' }}>
          <div>
            © {new Date().getFullYear()} NS Restaurant Patna. All rights reserved.
          </div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <span>FSSAI Lic: 10421000001892</span>
            <span>•</span>
            <span>GSTIN: 10AABCN1234F1Z8</span>
          </div>
        </div>
      </div>
    </section>
  );
};
