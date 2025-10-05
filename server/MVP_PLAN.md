# 🎮 Gamified Quiz App - MVP Plan

## 📋 Project Overview

A gamified learning platform where users choose their field of expertise, select topics and difficulty levels, answer quiz questions, and unlock collectible cards/badges as rewards for their progress.

---

## 🎯 Core Concept

**Flow:** Login → Choose Field → Choose Sub-field → Choose Level → Quiz → Checkpoint Rewards → Progress

**Gamification:** Users unlock badges and collectible cards by completing question milestones in different topics and difficulty levels.

---

## 🛠️ Tech Stack

### Frontend
- **React** with TypeScript
- **Tailwind CSS** for styling
- **Shadcn/ui** for components
- **React Router** for navigation
- **Axios** for API calls
- **Vite** as build tool

### Backend
- **Express.js** with TypeScript
- **bcrypt** for password hashing
- **jsonwebtoken** for JWT authentication
- **cors** for cross-origin requests
- **express-validator** for input validation

### Database
- **PostgreSQL** (primary choice)
- Alternative: **MySQL** or **SQLite** for development

### Development Tools
- **ESLint** + **Prettier** for code quality
- **Thunder Client** or **Postman** for API testing
- **Git** for version control

---

## 📊 Database Schema

### Users Table
```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    username VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Questions Table
```sql
CREATE TABLE questions (
    id SERIAL PRIMARY KEY,
    field VARCHAR(100) NOT NULL,           -- 'programming', 'design', etc.
    topic VARCHAR(100) NOT NULL,           -- 'javascript', 'python', etc.
    level VARCHAR(50) NOT NULL,            -- 'beginner', 'intermediate', etc.
    question_text TEXT NOT NULL,
    option_a VARCHAR(255) NOT NULL,
    option_b VARCHAR(255) NOT NULL,
    option_c VARCHAR(255) NOT NULL,
    option_d VARCHAR(255) NOT NULL,
    correct_option CHAR(1) NOT NULL,       -- 'a', 'b', 'c', or 'd'
    explanation TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Cards Table
```sql
CREATE TABLE cards (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    rarity VARCHAR(50) NOT NULL,           -- 'common', 'uncommon', 'rare', 'legendary'
    field VARCHAR(100) NOT NULL,
    topic VARCHAR(100) NOT NULL,
    level VARCHAR(50) NOT NULL,
    image_url VARCHAR(500),
    description TEXT,
    unlock_requirement INTEGER DEFAULT 10,  -- questions needed to unlock
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### User Progress Table
```sql
CREATE TABLE user_progress (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    field VARCHAR(100) NOT NULL,
    topic VARCHAR(100) NOT NULL,
    level VARCHAR(50) NOT NULL,
    questions_answered INTEGER DEFAULT 0,
    questions_correct INTEGER DEFAULT 0,
    last_question_id INTEGER,
    last_answered_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, field, topic, level)
);
```

### User Cards Table
```sql
CREATE TABLE user_cards (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    card_id INTEGER REFERENCES cards(id) ON DELETE CASCADE,
    earned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, card_id)
);
```

---

## 🎮 MVP Features

### ✅ Phase 1: Core Foundation (Week 1)

#### User Authentication
- [ ] User registration with email/password
- [ ] User login with JWT token
- [ ] Password hashing with bcrypt
- [ ] Protected route middleware
- [ ] Auth context for React

#### Basic Setup
- [ ] Project structure setup
- [ ] Database connection
- [ ] Basic Express server
- [ ] CORS configuration
- [ ] Environment variables setup

### ✅ Phase 2: Quiz System (Week 2)

#### Backend Quiz Logic
- [ ] Question API endpoints
- [ ] Answer validation
- [ ] Progress tracking
- [ ] Score calculation

#### Frontend Quiz Interface
- [ ] Field selection page
- [ ] Topic selection page
- [ ] Level selection page
- [ ] Question display component
- [ ] Answer submission
- [ ] Progress indicators

### ✅ Phase 3: Gamification (Week 3)

#### Reward System
- [ ] Card unlock logic
- [ ] Badge system
- [ ] Milestone tracking
- [ ] Reward notifications

#### Gallery & Profile
- [ ] User gallery page
- [ ] Card collection display
- [ ] Progress overview
- [ ] Achievement showcase

---

## 🌐 API Endpoints

### Authentication
```
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/profile
```

### Fields & Topics
```
GET  /api/fields                    # Get all available fields
GET  /api/fields/:field/topics      # Get topics for a field
GET  /api/topics/:topic/levels      # Get levels for a topic
```

### Quiz System
```
GET  /api/questions                 # Get question by field/topic/level
POST /api/questions/answer          # Submit answer
GET  /api/progress/:userId          # Get user progress
```

### Cards & Rewards
```
GET  /api/cards/available           # Get unlockable cards for user
POST /api/cards/unlock             # Unlock a card
GET  /api/gallery/:userId          # Get user's card collection
```

---

## 📱 React Pages & Components

### Pages
```
src/pages/
├── Auth.tsx              # Login/Register
├── FieldSelection.tsx    # Choose field (Programming, Design, etc.)
├── TopicSelection.tsx    # Choose topic (JS, Python, etc.)
├── LevelSelection.tsx    # Choose difficulty level
├── Quiz.tsx              # Question interface
├── Gallery.tsx           # Card collection
└── Profile.tsx           # User stats and progress
```

### Components
```
src/components/
├── ui/                   # Shadcn components
├── auth/
│   ├── LoginForm.tsx
│   └── RegisterForm.tsx
├── quiz/
│   ├── QuestionCard.tsx
│   ├── AnswerOptions.tsx
│   └── ProgressBar.tsx
├── cards/
│   ├── CollectibleCard.tsx
│   ├── CardGallery.tsx
│   └── UnlockAnimation.tsx
└── layout/
    ├── Header.tsx
    ├── Navigation.tsx
    └── Layout.tsx
```

---

## 🏗️ Development Phases

### Phase 1: Foundation (Days 1-5)
1. **Day 1-2:** Project setup, database design, Express server
2. **Day 3-4:** User authentication (backend + frontend)
3. **Day 5:** Protected routes and auth context

### Phase 2: Core Features (Days 6-10)
1. **Day 6-7:** Question system (database + API)
2. **Day 8-9:** Quiz interface (React components)
3. **Day 10:** Progress tracking

### Phase 3: Gamification (Days 11-15)
1. **Day 11-12:** Card system and unlock logic
2. **Day 13-14:** Gallery and rewards UI
3. **Day 15:** Testing and bug fixes

---

## 🎯 Checkpoint Rewards System

### Reward Tiers
- **10 questions answered:** Common card/badge
- **25 questions answered:** Uncommon card/badge
- **Complete level:** Rare card
- **Complete all levels in topic:** Legendary card

### Card Rarities
- **Common:** Gray border, basic design
- **Uncommon:** Green border, enhanced design
- **Rare:** Blue border, animated elements
- **Legendary:** Gold border, special effects

---

## 🧪 Testing Strategy

### Backend Testing
- [ ] API endpoint testing with Postman
- [ ] Database query validation
- [ ] Authentication flow testing
- [ ] Error handling verification

### Frontend Testing
- [ ] Component rendering
- [ ] User interaction flows
- [ ] API integration testing
- [ ] Responsive design testing

---

## 🚀 Deployment Plan

### Development
- Local development with hot reload
- Environment variables for database
- Git version control

### Production (Future)
- **Frontend:** Vercel or Netlify
- **Backend:** Railway, Render, or DigitalOcean
- **Database:** PostgreSQL on cloud
- **Images:** Cloudinary or AWS S3

---

## 📈 Future Enhancements (Post-MVP)

### Advanced Features
- [ ] Leaderboards and competitions
- [ ] Daily challenges
- [ ] Social features (friends, sharing)
- [ ] Achievement system expansion
- [ ] Time-based challenges
- [ ] Adaptive difficulty
- [ ] Multiplayer quiz battles

### Technical Improvements
- [ ] Caching for better performance
- [ ] Real-time notifications
- [ ] Mobile app (React Native)
- [ ] Analytics and user tracking
- [ ] Advanced admin dashboard

---

## 📚 Learning Resources

### Documentation
- [React TypeScript Guide](https://react-typescript-cheatsheet.netlify.app/)
- [Express.js Documentation](https://expressjs.com/)
- [PostgreSQL Tutorial](https://www.postgresql.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

### Tools
- [Shadcn/ui Components](https://ui.shadcn.com/)
- [Prisma ORM](https://www.prisma.io/) (optional upgrade)
- [React Hook Form](https://react-hook-form.com/)

---

## ⚡ Quick Start Commands

```bash
# Create project structure
mkdir quiz-app
cd quiz-app
mkdir backend frontend database

# Backend setup
cd backend
npm init -y
npm install express typescript @types/node @types/express
npm install bcrypt jsonwebtoken cors express-validator
npm install -D @types/bcrypt @types/jsonwebtoken @types/cors
npm install -D nodemon ts-node

# Frontend setup
cd ../frontend
npm create vite@latest . -- --template react-ts
npm install @types/react @types/react-dom
npm install axios react-router-dom
npm install -D tailwindcss postcss autoprefixer
npm install @shadcn/ui
```

---

## 🎉 Success Metrics

### MVP Success Criteria
- [ ] Users can register and login successfully
- [ ] Users can select field, topic, and level
- [ ] Users can answer questions and see progress
- [ ] Users can unlock and view cards
- [ ] Responsive design works on mobile/desktop
- [ ] No major bugs in core flow

### Performance Goals
- [ ] API response time < 500ms
- [ ] Page load time < 2 seconds
- [ ] Mobile-friendly design
- [ ] Error-free user experience

---

**Ready to start building? Let's make this amazing gamified quiz app together! 🚀**