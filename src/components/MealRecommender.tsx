import React from 'react';
import { Sparkles, Clock, Utensils, Moon, Coffee, Heart, IceCream } from 'lucide-react';
import { MealTimeRecommendation } from '../types';

interface MealRecommenderProps {
  selectedMealTag: MealTimeRecommendation;
  onSelectMealTag: (tag: MealTimeRecommendation) => void;
}

export const MealRecommender: React.FC<MealRecommenderProps> = ({
  selectedMealTag,
  onSelectMealTag,
}) => {
  // Detect current time for auto smart tip
  const hour = new Date().getHours();
  let timeGreeting = '';
  let timeSuggestion = '';

  if (hour >= 11 && hour < 16) {
    timeGreeting = 'Dophar ka Waqt (Lunch Hours)';
    timeSuggestion = 'Bihari Litti Chokha, Champaran Handi Thali aur Biryani abhi ke liye best hain!';
  } else if (hour >= 16 && hour < 19) {
    timeGreeting = 'Shaam ki Bhookh (Evening Snacks)';
    timeSuggestion = 'Garma-garam Chicken Kathi Roll, Double Egg Roll, Burgers aur Chai try kijiye!';
  } else if (hour >= 19 && hour <= 23) {
    timeGreeting = 'Raat ka Shahi Bhojan (Dinner Hours)';
    timeSuggestion = 'Champaran Handi Mutton, Butter Chicken Aslam Style aur Garlic Naan perfect choice hai!';
  } else {
    timeGreeting = 'Sweet Cravings & Late Night';
    timeSuggestion = 'Thandi Matka Kulfi, Falooda aur Belgian Chocolate Ice-Cream ka maza lijiye!';
  }

  const recommendationOptions: {
    id: MealTimeRecommendation;
    title: string;
    subtitle: string;
    icon: any;
    badgeColor: string;
  }[] = [
    {
      id: 'all',
      title: 'Full Menu',
      subtitle: 'Browse all dishes',
      icon: Utensils,
      badgeColor: '#94a3b8',
    },
    {
      id: 'evening_snack',
      title: '🌯 Evening Snacks (4–7 PM)',
      subtitle: 'Rolls, Burgers, Momos & Fries',
      icon: Coffee,
      badgeColor: '#f59e0b',
    },
    {
      id: 'lunch_thali',
      title: '☀️ Lunch Feast (12–4 PM)',
      subtitle: 'Litti Chokha, Handi Thali & Rice',
      icon: Clock,
      badgeColor: '#10b981',
    },
    {
      id: 'royal_dinner',
      title: '👑 Royal Dinner (7–11 PM)',
      subtitle: 'Handi Mutton, Rogan Josh & Naans',
      icon: Moon,
      badgeColor: '#ec4899',
    },
    {
      id: 'late_night_sweet',
      title: '🍦 Ice-Cream & Sweets',
      subtitle: 'Matka Kulfi, Falooda, Chocolate',
      icon: IceCream,
      badgeColor: '#06b6d4',
    },
    {
      id: 'budget_bite',
      title: '💰 Budget under ₹150',
      subtitle: 'Egg rolls, Momos, Kulfi & Fries',
      icon: Heart,
      badgeColor: '#eab308',
    },
  ];

  return (
    <div style={{
      background: 'linear-gradient(135deg, rgba(18, 24, 38, 0.95) 0%, rgba(26, 34, 52, 0.8) 100%)',
      border: '1.5px solid rgba(245, 158, 11, 0.3)',
      borderRadius: '20px',
      padding: '24px',
      marginBottom: '36px',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.6), 0 0 20px rgba(245, 158, 11, 0.15)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Smart Live Tip Banner */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px',
        marginBottom: '20px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        paddingBottom: '16px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'var(--gold-gradient)', color: '#0b0f17', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Sparkles size={20} />
          </div>
          <div>
            <div style={{ fontSize: '11px', color: '#f59e0b', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: '800' }}>
              Smart Food Recommender • {timeGreeting}
            </div>
            <h3 className="font-serif" style={{ fontSize: '18px', fontWeight: '800', color: '#fff' }}>
              Kab Kya Khana Chahiye? (Chef's Timely Picks)
            </h3>
          </div>
        </div>

        <div style={{ background: 'rgba(245, 158, 11, 0.12)', border: '1px solid #f59e0b', padding: '6px 14px', borderRadius: '20px', fontSize: '12px', color: '#fde68a', fontWeight: '600' }}>
          💡 {timeSuggestion}
        </div>
      </div>

      {/* Recommendation Chips / Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '10px'
      }}>
        {recommendationOptions.map((opt) => {
          const isSelected = selectedMealTag === opt.id;
          return (
            <button
              key={opt.id}
              onClick={() => onSelectMealTag(opt.id)}
              style={{
                background: isSelected ? 'var(--gold-gradient)' : 'rgba(10, 14, 22, 0.7)',
                color: isSelected ? '#0b0f17' : '#fff',
                border: isSelected ? 'none' : '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '12px',
                padding: '12px 14px',
                textAlign: 'left',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
                transition: 'all 0.25s ease',
                boxShadow: isSelected ? '0 4px 18px rgba(245, 158, 11, 0.4)' : 'none'
              }}
            >
              <div style={{ fontWeight: isSelected ? '800' : '700', fontSize: '13px' }}>
                {opt.title}
              </div>
              <div style={{ fontSize: '11px', color: isSelected ? '#332104' : '#94a3b8' }}>
                {opt.subtitle}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
