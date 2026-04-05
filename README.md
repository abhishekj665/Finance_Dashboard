# Finance Dashboard

A responsive finance dashboard built with React, TypeScript, Vite, Material UI, Tailwind CSS, Redux Toolkit, and Recharts.

This project focuses on a clean dashboard experience for reviewing financial activity, filtering transactions, visualizing trends, and simulating role-based UI behavior on the frontend.

## Overview

The dashboard includes:

- Summary cards for income, expenses, and balance
- Monthly and category-based charts
- Transaction table with pagination
- Search, category, type, and date-range filters
- Reset filters action
- Frontend-only role simulation for `viewer` and `admin`
- Dark mode toggle
- Responsive settings experience for desktop and mobile
- Lightweight entrance and surface transitions

This is a frontend-focused project. There is no backend, authentication system, or persistent API integration.

## Tech Stack

- React 19
- TypeScript
- Vite
- Material UI
- Tailwind CSS v4
- Redux Toolkit
- React Redux
- React Router
- Recharts
- ESLint

## Key Features

### Dashboard Experience

- Sticky top navigation
- Desktop side settings panel for role and theme controls
- Mobile settings drawer when the side panel is hidden
- Responsive layout for charts, cards, filters, and table sections

### Transactions

- Transaction listing with date, category, type, and amount
- Admin-only add and edit actions
- Viewer read-only experience
- Client-side pagination using Material UI pagination

### Filtering

- Search by category
- Filter by transaction type
- Filter by category
- Filter by date range with `From` and `To`
- Reset all filters with one action

### UI State

- Theme mode managed through context
- Role simulation managed through context
- Transaction and filter state managed through Redux Toolkit

## Project Structure

```text
Finance_Dashboard/
├── README.md
└── client/
    ├── package.json
    ├── vite.config.ts
    ├── tsconfig.json
    ├── public/
    └── src/
        ├── App.tsx
        ├── main.tsx
        ├── index.css
        ├── App.css
        ├── assets/
        ├── components/
        │   ├── charts/
        │   │   ├── CategoryChart.tsx
        │   │   └── MonthlyChart.tsx
        │   ├── common/
        │   │   ├── RoleSwitcher.tsx
        │   │   └── ThemeToggle.tsx
        │   ├── dashboard/
        │   │   ├── FilterBar.tsx
        │   │   ├── InsightPanel.tsx
        │   │   └── SummaryCard.tsx
        │   ├── layout/
        │   │   └── DashboardLayout.tsx
        │   └── transactions/
        │       └── TransactionTable.tsx
        ├── context/
        │   ├── RoleContext.tsx
        │   └── ThemeContext.tsx
        ├── data/
        │   └── mockData.tsx
        ├── features/
        │   └── transactions/
        │       ├── chartSelectors.tsx
        │       ├── insightSelector.tsx
        │       ├── selector.tsx
        │       └── transactionSlice.tsx
        ├── hooks/
        │   └── useFinancialSummary.tsx
        ├── pages/
        │   └── DashboardPage.tsx
        ├── redux/
        │   └── store.tsx
        └── types.ts
```

## Architecture Notes

### State Management

Transaction data and filters are stored in Redux Toolkit. Selectors are used to derive filtered transaction lists, chart-ready datasets, and insights.

### Theme and Role

Theme mode and role simulation are handled with React Context to keep these UI-level concerns lightweight and globally available.

### Data Source

The app currently uses local mock transaction data. Role behavior is simulated entirely on the frontend:

- `viewer`: can only view dashboard data
- `admin`: can add and edit transactions from the UI

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

```bash
cd client
npm install
```

### Run Development Server

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Available Scripts

From the `client` directory:

- `npm run dev` - start the Vite development server
- `npm run build` - run TypeScript build and create the production bundle
- `npm run preview` - preview the production build locally
- `npm run lint` - run ESLint

## Production Notes

- The app is built as a static frontend and can be deployed to platforms like Netlify, Vercel, or GitHub Pages.
- Since the project uses mock frontend data, transaction changes are not backed by a server.
- If you extend this into production, the next logical additions would be:
  - API-backed transaction storage
  - authentication and real RBAC
  - form validation improvements
  - user persistence for theme and role preferences
  - testing coverage for reducers, selectors, and UI flows

## UX Decisions

- Desktop users get a side settings panel for faster access to role and theme controls.
- Smaller screens use a dedicated settings drawer to avoid overcrowding the header.
- The top bar stays sticky for easier navigation during scroll.
- Filters and transactions remain responsive across viewport sizes.

## Future Improvements

- Delete transaction flow
- Export transactions
- Persistent local storage or API integration
- Better number and currency formatting consistency
- Unit and integration tests
- Advanced chart interactions and tooltips

## License

This project is currently provided for learning, development, and portfolio use.
