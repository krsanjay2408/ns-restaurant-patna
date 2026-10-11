import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Sparkles, Plus, Check, MessageSquare, Phone } from 'lucide-react';
import { Dish, ChatMessage } from '../types';

interface AIAssistantWidgetProps {
  dishes: Dish[];
  onAddToCart: (dish: Dish) => void;
}

export const AIAssistantWidget: React.FC<AIAssistantWidgetProps> = ({
  dishes,
  onAddToCart,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'bot',
      text: 'Namaste! 🙏 Main NS Restaurant ka AI Food Assistant hoon. Aap English, Hindi ya Hinglish me kuch bhi pooch sakte hain — jaise dishes ki recommendations, spice level, ya Patna delivery!',
      timestamp: 'Just now',
    }
  ]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const quickPrompts = [
    'Champaran Handi meat kaisa hai?',
    'Spicy starters under ₹350',
    'Pure Veg & Jain options?',
    'Patna delivery timings & pincodes?'
  ];

  const handleSend = (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');

    // AI Intent & Response Generator (Grounded strictly on Patna menu data)
    setTimeout(() => {
      const q = query.toLowerCase();
      let botReply = '';
      let suggested: Dish[] = [];

      if (q.includes('champaran') || q.includes('handi') || q.includes('mutton') || q.includes('ahuna')) {
        const d = dishes.find(x => x.id === 'dish-1');
        botReply = 'Hamara Champaran Handi Meat (Ahuna Mutton) Bihar ka sabse mashhoor specialty hai! Yeh mitti ke bartan me desi masalon aur khadi lahsun ke sath slow-cook hota hai (₹480). Bahut hi swadist aur authentic spicy gravy hai!';
        if (d) suggested = [d];
      } else if (q.includes('ice') || q.includes('kulfi') || q.includes('sweet') || q.includes('falooda') || q.includes('chocolate')) {
        suggested = dishes.filter(x => x.category === 'icecream_desserts').slice(0, 3);
        botReply = 'Aapke sweet cravings ke liye: Royal Shahi Kulfi Falooda (₹190), Belgian Dark Chocolate Ice-Cream (₹160), aur Saffron Pista Matka Kulfi (₹130)! Turant yahan se add kar sakte hain:';
      } else if (q.includes('roll') || q.includes('burger') || q.includes('momo') || q.includes('fast food') || q.includes('fries')) {
        suggested = dishes.filter(x => x.category === 'rolls_wraps' || x.category === 'fast_food').slice(0, 3);
        botReply = 'Zesty Fast Food & Rolls: Kolkata Chicken Kathi Roll (₹160), Double Egg Roll (₹110), Crispy Chicken Burger (₹190) aur Steamed Momos! Yahan se 1-click me order karein:';
      } else if (q.includes('veg') && (q.includes('jain') || q.includes('pure'))) {
        suggested = dishes.filter(x => x.isJainFriendly);
        botReply = 'Ji haan! NS Restaurant me Pure Veg & Jain-friendly khana pure hygiene ke sath alag tandoor me banta hai. Aap Dal Makhani Bukhara, Paneer Butter Masala aur Matka Kulfi try kar sakte hain!';
      } else if (q.includes('under') || q.includes('budget') || q.includes('350') || q.includes('starter') || q.includes('tikha') || q.includes('spicy')) {
        suggested = dishes.filter(x => x.price <= 350 && (x.category === 'rolls_wraps' || x.category === 'fast_food' || x.spiceLevel >= 2)).slice(0, 3);
        botReply = 'Aapke budget aur taste ke hisaab se yeh best recommendations hain: Double Egg Roll (₹110), Chicken Kathi Roll (₹160), aur Litti Chokha Platter (₹260). Direct yahan se add kar lijiye!';
      } else if (q.includes('delivery') || q.includes('pincode') || q.includes('timing') || q.includes('fraser') || q.includes('boring road')) {
        botReply = 'Hamara outlet Fraser Road (Opp. Maurya Complex) Patna me hai. Hum Boring Road, Kankarbagh, Rajendra Nagar, Bailey Road, aur Danapur me 30-40 mins me express delivery dete hain! Timings: 11:30 AM to 11:00 PM.';
      } else if (q.includes('complaint') || q.includes('refund') || q.includes('late') || q.includes('call')) {
        botReply = 'Kisi bhi refund ya instant complaint ke liye aap hamare Patna support manager se direct call ya WhatsApp kar sakte hain (+91 94310 00000). Hamari team turant help karegi.';
      } else {
        // General culinary recommendation
        suggested = [dishes[0], dishes[3], dishes[11]].filter(Boolean);
        botReply = `NS Restaurant ke top 3 favorites: Champaran Handi Meat (₹480), Chicken Kathi Roll (₹160) aur Royal Kulfi Falooda (₹190). Aapko kya khana pasand aayega?`;
      }

      const botMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'bot',
        text: botReply,
        suggestedDishes: suggested.length > 0 ? suggested : undefined,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMsg]);
    }, 600);
  };

  const handleAddSuggested = (dish: Dish) => {
    onAddToCart(dish);
    setAddedIds((prev) => ({ ...prev, [dish.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [dish.id]: false }));
    }, 2000);
  };

  return (
    <>
      {/* Floating Widget Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="ai-bot-float-btn"
          title="Chat with NS Food Assistant"
        >
          <div className="pulse-ring" />
          <Bot size={28} />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div style={{
          position: 'fixed',
          bottom: '80px',
          right: '20px',
          width: 'calc(100vw - 40px)',
          maxWidth: '380px',
          height: '520px',
          background: 'rgba(11, 15, 23, 0.96)',
          backdropFilter: 'blur(20px)',
          border: '1.5px solid #f59e0b',
          borderRadius: '20px',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.9), 0 0 30px rgba(245, 158, 11, 0.25)',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 220,
          overflow: 'hidden',
          animation: 'bounceIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        }}>
          {/* Header */}
          <div style={{
            padding: '14px 18px',
            background: 'linear-gradient(135deg, #d97706 0%, #f59e0b 100%)',
            color: '#0b0f17',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: '#0b0f17', color: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Bot size={20} />
              </div>
              <div>
                <h4 style={{ fontWeight: '800', fontSize: '15px', color: '#0b0f17' }}>
                  NS-Bot • Khana Mitra
                </h4>
                <div style={{ fontSize: '11px', color: '#332104', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#047857' }} />
                  Grounded on Live Patna Menu
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              style={{ background: 'none', border: 'none', color: '#0b0f17', cursor: 'pointer', padding: '4px' }}
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages Container */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {messages.map((m) => (
              <div
                key={m.id}
                style={{
                  alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '85%',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px'
                }}
              >
                <div style={{
                  background: m.sender === 'user' ? 'var(--gold-gradient)' : 'rgba(255, 255, 255, 0.08)',
                  color: m.sender === 'user' ? '#0b0f17' : '#f8fafc',
                  border: m.sender === 'user' ? 'none' : '1px solid rgba(255, 255, 255, 0.08)',
                  padding: '10px 14px',
                  borderRadius: m.sender === 'user' ? '16px 16px 2px 16px' : '16px 16px 16px 2px',
                  fontSize: '13px',
                  lineHeight: '1.45',
                  fontWeight: m.sender === 'user' ? '700' : '400',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
                }}>
                  {m.text}
                </div>

                {/* Inline Recommended Dish Action Cards */}
                {m.suggestedDishes && m.suggestedDishes.length > 0 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '4px' }}>
                    {m.suggestedDishes.map((dish) => (
                      <div
                        key={dish.id}
                        style={{
                          background: 'rgba(18, 24, 38, 0.9)',
                          border: '1px solid rgba(245, 158, 11, 0.3)',
                          borderRadius: '10px',
                          padding: '8px 10px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '8px'
                        }}
                      >
                        <div style={{ minWidth: 0, flex: 1 }}>
                          <div style={{ fontSize: '12px', fontWeight: '700', color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {dish.name}
                          </div>
                          <div style={{ fontSize: '12px', color: '#fde68a', fontWeight: '800' }}>
                            ₹{dish.price}
                          </div>
                        </div>

                        <button
                          onClick={() => handleAddSuggested(dish)}
                          style={{
                            background: addedIds[dish.id] ? '#10b981' : 'var(--gold-gradient)',
                            color: '#0b0f17',
                            border: 'none',
                            borderRadius: '6px',
                            padding: '5px 10px',
                            fontSize: '11px',
                            fontWeight: '800',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '3px'
                          }}
                        >
                          {addedIds[dish.id] ? (
                            <>
                              <Check size={12} /> Added
                            </>
                          ) : (
                            <>
                              <Plus size={12} /> Add
                            </>
                          )}
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <span style={{ fontSize: '10px', color: '#64748b', alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start' }}>
                  {m.timestamp}
                </span>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestion Chips */}
          <div style={{ padding: '8px 14px', background: 'rgba(15, 21, 35, 0.7)', borderTop: '1px solid rgba(255, 255, 255, 0.05)', display: 'flex', gap: '6px', overflowX: 'auto', scrollbarWidth: 'none' }}>
            {quickPrompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(p)}
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  padding: '4px 10px',
                  color: '#cbd5e1',
                  fontSize: '11px',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap'
                }}
              >
                {p}
              </button>
            ))}
          </div>

          {/* Chat Input Bar */}
          <form
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
            style={{
              padding: '12px 14px',
              background: '#090d14',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              gap: '8px',
              alignItems: 'center'
            }}
          >
            <input
              type="text"
              placeholder="Ask anything (Hinglish/Hindi/English)..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              style={{
                flex: 1,
                background: '#121826',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '20px',
                padding: '8px 14px',
                color: '#fff',
                fontSize: '13px',
                outline: 'none'
              }}
            />
            <button
              type="submit"
              className="btn-gold"
              style={{ width: '36px', height: '36px', borderRadius: '50%', padding: 0 }}
            >
              <Send size={15} />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
