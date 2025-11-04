# Candidate Website Strategy - حملة حامد بندق

## Overview
موقع حملة انتخابية لحامد بندق - مرشح من بورسعيد. الموقع مبني بـ React + Vite + Tailwind CSS ومتصل بـ Supabase.

## Recent Changes
- **Nov 4, 2025**: Initial setup in Replit environment
  - Configured Vite to run on port 5000 with host 0.0.0.0
  - Set up TypeScript configuration
  - Connected to Supabase backend
  - Added deployment configuration

## Project Architecture

### Frontend Stack
- **Framework**: React 18.3.1
- **Build Tool**: Vite 6.3.5
- **Styling**: Tailwind CSS v4.1.3 (embedded in CSS)
- **UI Components**: Radix UI + shadcn/ui components
- **Animations**: Motion (Framer Motion)
- **Forms**: React Hook Form
- **State Management**: React hooks

### Backend Integration
- **Database**: Supabase
- **Project ID**: oufpkiwpnzjcbkojlirj
- **API Endpoint**: Supabase Edge Functions
- **Forms**: Volunteer registration, complaint tickets, and idea submissions

### Key Features
1. **Hero Section**: صفحة رئيسية مع دعوة للعمل
2. **Principles Section**: المبادئ الأساسية للحملة
3. **Youth Agenda**: برنامج الشباب
4. **Biography**: السيرة الذاتية للمرشح
5. **Contact Forms**: 
   - نموذج التطوع (Volunteer Form)
   - نموذج الشكاوى (Ticket Form)
   - نموذج الأفكار (Ideas Form)
6. **Media Center**: مركز إعلامي
7. **Admin Panel**: لوحة تحكم الإدارة

## File Structure
```
src/
├── components/
│   ├── ui/                    # Reusable UI components (shadcn/ui)
│   ├── figma/                 # Figma-exported components
│   ├── BiographySection.tsx
│   ├── ContactSection.tsx     # Forms with Supabase integration
│   ├── Footer.tsx
│   ├── HeroSection.tsx
│   ├── MediaCenter.tsx
│   ├── Navigation.tsx
│   ├── PrinciplesSection.tsx
│   └── YouthAgendaSection.tsx
├── utils/
│   └── supabase/
│       └── info.tsx           # Supabase configuration
├── App.tsx                     # Main app with routing
└── main.tsx                    # Entry point
```

## Development

### Running Locally
```bash
npm install
npm run dev
```
Server runs on http://0.0.0.0:5000

### Building for Production
```bash
npm run build
```
Output goes to `build/` directory

### Environment Variables
The project uses Vite environment variables:
- `VITE_SUPABASE_PROJECT_ID`: Supabase project ID
- `VITE_SUPABASE_ANON_KEY`: Supabase anonymous key

If not set, defaults are used from `src/utils/supabase/info.tsx`

## Deployment
Configured for Replit Autoscale deployment:
- Build command: `npm run build`
- Run command: `npx vite preview --host 0.0.0.0 --port 5000`

## Important Notes
- The site is RTL (right-to-left) for Arabic content
- Forms submit to Supabase Edge Functions
- Footer includes "made with addvalues.tech" attribution
- Admin panel accessible at `/admin` route

## User Preferences
- Language: Arabic
- Focus: Make sure forms work perfectly
- Footer attribution: addvalues.tech
