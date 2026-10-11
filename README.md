# 🍽️ NS Restaurant – Patna (Website & Online Food Ordering Platform)

> **Authentic Bihari Delicacies & Multi-Cuisine Fine Dining**  
> 📍 Fraser Road, Near Patna Junction, Patna, Bihar (800001) | 📞 +91 94310 99887

---

## 📌 Overview

**NS Restaurant** is a high-performance, mobile-first responsive web application built for seamless online food ordering, table reservations, AI-guided food assistance, and restaurant staff management.

The website reflects a luxury **Obsidian Black & Imperial Gold** aesthetic, delivering an app-like experience with fast load times, local Patna delivery verification, instant UPI QR payments, and live order tracking.

---

## ✨ Key Features

### 1. 🥘 Dynamic Multi-Category Menu
- **9 Comprehensive Food Categories:**
  - 👑 **Patna Specials:** Famous Champaran Ahuna Handi Mutton, Bihari Sattu Litti Chokha, Dehati Chicken.
  - 🌯 **Rolls & Wraps:** Kolkata Double Egg Roll, Crispy Chicken Malai Roll, Paneer Tikka Kathi Roll.
  - 🍔 **Fast Food & Burgers:** Crispy Zinger Burger, Cheesy Loaded Fries, Veg Supreme Burger.
  - 🍗 **Chicken Specials:** Butter Chicken, Chicken Kadhai, Tandoori Chicken.
  - 🍖 **Mutton Specials:** Champaran Handi Gosht, Mutton Rogan Josh.
  - 🧀 **Pure Veg & Paneer:** Paneer Butter Masala, Dal Makhani, Palak Paneer (Jain friendly options available).
  - 🍚 **Biryani & Breads:** Hyderabadi Dum Biryani, Garlic Butter Naan, Laccha Paratha.
  - 🍨 **Ice Creams & Desserts:** Kesar Pista Matka Kulfi, Hot Gulab Jamun with Ice Cream, Chocolate Sundae.
  - 🥤 **Refreshing Beverages:** Masala Shikanji, Kulhad Masala Chai, Mango Lassi.
- **Dietary & Spice Filters:** Filter instantly by Veg, Non-Veg, Jain Friendly, and Spice Level (Mild / Medium / Tikha 🔥).
- **Interactive Stepper:** Add-to-cart transforms directly into an interactive `-` `qty` `+` quantity stepper.

---

### 2. ⏰ "Kab Kya Khana Chahiye?" Smart Meal-Time Recommender
- An intelligent recommendation engine that dynamically detects the time of day and user mood:
  - 🌇 **Evening Snacks (4 PM - 7 PM):** Hot rolls, burgers, and kulhad chai.
  - 🍛 **Lunch Thali (12 PM - 4 PM):** Wholesome thalis, handi curries, and rice bowls.
  - 👑 **Royal Dinner (7 PM - 11 PM):** Champaran Handi Meat, Biryanis, Butter Naan.
  - 🍨 **Late Night Craving (10 PM+):** Ice creams, kulfi, and desserts.
  - 💰 **Budget Bites:** Popular pocket-friendly picks under ₹150.

---

### 3. 🛒 Patna-Optimized Cart & Checkout
- **Patna Pincode Verification:** Real-time delivery validation for Patna pincodes (800001 to 800020).
- **Transparent Bill Breakdown:** 5% GST (2.5% CGST + 2.5% SGST), packaging fees, and free delivery thresholds.
- **Promo Coupon System:** Built-in discount coupons (`PATNA100`, `FIRST50`, `NSROYAL`).
- **Indian UPI QR Payment:** Real-time QR code generation supporting PhonePe, Google Pay, Paytm, BHIM, plus Cards, Netbanking, and Cash on Delivery (COD).

---

### 4. 🛵 Real-Time Order Tracking & Tax Invoice
- **4-Stage Visual Status Stepper:**
  1. `Order Received`
  2. `Kitchen Preparing`
  3. `Out for Delivery` (with Rider name & live contact)
  4. `Delivered`
- **Official GST Tax Invoice:** Generates printable/downloadable digital tax invoice receipts for all orders.

---

### 5. 🪑 Table Reservation System
- Select dining date, party size, and lunch/dinner time slots.
- Choose preferred dining ambiance:
  - ❄️ **Indoor AC Luxury**
  - 🌿 **Royal Patio (Outdoor)**
  - 👨‍👩‍👧‍👦 **Family VIP Lounge**
- Instant booking token confirmation.

---

### 6. 🤖 Multilingual AI Food Assistant ("Patna Foodie Bot")
- Grounded in NS Restaurant's live menu catalog.
- Understands **English, Hindi, and Hinglish** (e.g., *"Aaj dinner me kya special hai?", "Budget me chicken roll batao"*).
- Suggests dishes directly inside the chat with 1-click **"Add to Cart"** functionality.

---

### 7. 🔒 Customer Authentication (Safe Simulation + External OAuth Ready)
- **Built-in Safe Simulation Mode (Default):**
  - Instant testing with any 10-digit mobile number.
  - Verification code `4819` is displayed on screen — **zero external SMS recharge or API key required!**
  - 1-Click Google and WhatsApp profile sign-in for swift testing.
- **Persistent User Profile:** Saved delivery addresses, favorite dishes, and past order history with 1-click reorder.

---

### 8. 🧑‍🍳 Restaurant Staff Admin Dashboard
- Secret staff access portal via footer button.
- **Live Orders Pipeline:** Incoming orders trigger a real-time **Web Audio chime sound**.
- Update order statuses (`Preparing` ➔ `Out for Delivery` ➔ `Delivered`).
- **Menu Management (CRUD):** Live toggle dish availability (in-stock / 86'd), edit prices, and create new items.

---

## 🛠️ Tech Stack

- **Framework:** React 19 + TypeScript
- **Bundler:** Vite 8.3
- **Styling:** Modern Vanilla CSS (Dark Obsidian Luxury Theme with Gold Accents)
- **Icons:** Lucide React
- **Audio Engine:** HTML5 Web Audio API (Synthesized order alert chimes)
- **Code Quality:** Oxlint & TypeScript strict checks

---

## 📂 Project Directory Structure

```plaintext
ns-restaurant-patna/
├── public/
│   └── assets/                     # Brand logos, Patna hero banners, dish images
│       ├── ns_logo.jpg             # Minimalist circular gold logo
│       ├── hero_banner.jpg         # Fraser Road Patna flagship banner
│       ├── champaran_handi.jpg     # Signature Champaran Ahuna Handi Meat
│       └── litti_chokha.jpg        # Authentic Bihari Sattu Litti Chokha
├── src/
│   ├── assets/                     # Frontend bundled assets
│   ├── components/                 # Modular React UI components
│   │   ├── AIAssistantWidget.tsx   # Multilingual Hinglish AI food bot
│   │   ├── AdminPortal.tsx         # Live staff dashboard with audio chime alerts
│   │   ├── AuthModal.tsx           # OTP & Social authentication dialog
│   │   ├── CartDrawer.tsx          # Slide-over cart with Patna pincode check
│   │   ├── CategoryShowcase.tsx    # Visual category browser (Rolls, Handi, Burgers)
│   │   ├── CheckoutModal.tsx       # Dynamic UPI QR & payment selector
│   │   ├── DishCard.tsx            # Dish card with quantity stepper
│   │   ├── Hero.tsx                # Hero section with Patna address & CTAs
│   │   ├── MealRecommender.tsx     # "Kab Kya Khana Chahiye?" meal suggestions
│   │   ├── MenuSection.tsx         # Searchable, filterable menu grid
│   │   ├── MobileBottomBar.tsx     # Bottom app navigation for mobile users
│   │   ├── Navbar.tsx              # Brand header, location badge, cart trigger
│   │   ├── OrderTrackingModal.tsx  # 4-stage tracking & GST invoice print
│   │   ├── ProfileDrawer.tsx       # User profile, addresses, & order history
│   │   └── ReservationModal.tsx    # Table booking & slot scheduler
│   ├── data/
│   │   └── dishes.ts               # Complete Patna food menu database
│   ├── types/
│   │   └── index.ts                # TypeScript domain models & interfaces
│   ├── App.css
│   ├── App.tsx                     # Main layout & application state orchestration
│   ├── index.css                   # Obsidian Gold design system & glassmorphism
│   └── main.tsx                    # React application entry point
├── .env.example                    # Safe public environment variable template
├── .gitignore                      # Git ignore rules protecting private files
├── package.json                    # Project metadata & npm dependencies
├── tsconfig.json                   # TypeScript compiler configuration
├── vite.config.ts                  # Vite build configuration
└── README.md                       # Comprehensive project documentation
```

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js** (v18.0.0 or higher recommended)
- **npm** (v9.0.0 or higher)

### 2. Installation
Clone or navigate to the project directory:

```bash
cd D:\PROJECT\ns-restaurant-patna
```

Install dependencies:
```bash
npm.cmd install
```
*(or `npm install`)*

---

### 3. Running Locally

Start the local development server:

```bash
npm.cmd run dev
```
*(or `npm run dev`)*

Open your browser at:
```
http://localhost:5173/
```

---

### 4. Building for Production

To create an optimized production build:

```bash
npm.cmd run build
```

To preview the production build locally:

```bash
npm.cmd run preview
```

---

## 🔐 Environment & Security Guidelines

> [!IMPORTANT]
> **Zero Secrets in Repository:**  
> This project is designed so that **no sensitive API keys, passwords, or credentials** are ever committed to Git or pushed to GitHub.

### How Security is Configured:
1. **Protected by `.gitignore`:**
   The `.gitignore` file strictly blocks all environment files:
   ```gitignore
   .env
   .env.*
   !.env.example
   ```
2. **Safe Template (`.env.example`):**
   Only `.env.example` is tracked by Git. It contains only dummy variable names without any real secrets:
   ```env
   VITE_AUTH_MODE=simulation
   VITE_GOOGLE_CLIENT_ID=your_google_client_id_here
   VITE_FIREBASE_API_KEY=your_firebase_api_key_here
   VITE_WHATSAPP_PHONE=919431099887
   ```
3. **No Setup Required for Development:**
   The application runs in **Simulation Mode** by default. All features (OTP code `4819`, Google test login, WhatsApp integration, UPI QR demo, Audio alerts) function seamlessly without needing any external paid service or credentials!

---

## 👥 Restaurant Details & Contact

- **Restaurant:** NS Restaurant
- **Location:** Fraser Road, Opp. Maurya Complex, Patna, Bihar – 800001
- **Operational Hours:** 11:00 AM – 11:30 PM (All 7 Days)
- **Order Hotline:** +91 94310 99887
- **Delivery Service Areas:** Patna Central, Boring Road, Kankarbagh, Bailey Road, Rajendra Nagar, Patliputra (Pincodes: 800001 – 800020)

---

## 📄 License
This project is proprietary software created for **NS Restaurant (Patna)**. All rights reserved.
