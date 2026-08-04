# VIBEZ - Restaurant Booking, Marketing & Marketplace Management Portal

VIBEZ is an enterprise-grade, modern SaaS platform designed to bridge the gap between restaurant entities, booking patrons, and marketing affiliate partners. The VIBEZ Portal enables platform administrators to control marketplace operations and lets restaurant owners manage daily floor operations, bookings, menus, marketing videos, staff scheduling, and performance analytics.

---

## 📖 Table of Contents
1. [System Architecture Overview](#-system-architecture-overview)
2. [Role-Based Feature Specifications](#-role-based-feature-specifications)
   - [Platform Administrators (Admin Portal)](#1-platform-administrators-admin-portal)
   - [Restaurant Owners (Restaurant Dashboard)](#2-restaurant-owners-restaurant-dashboard)
   - [Restaurant Staff Portal](#3-restaurant-staff-portal)
3. [Technical Architecture & State Flow](#-technical-architecture--state-flow)
   - [RTK Query Caching & Tag Invalidation](#1-rtk-query-caching--tag-invalidation)
   - [Seamless Re-Authentication Interceptor](#2-seamless-re-authentication-interceptor)
   - [Media & Upload Resolution Core](#3-media--upload-resolution-core)
4. [Tech Stack Matrix](#-tech-stack-matrix)
5. [Directory Layout](#-directory-layout)
6. [Local Setup Guide](#-local-setup-guide)
   - [Prerequisites](#1-prerequisites)
   - [Configuration](#2-configuration)
   - [Execution](#3-execution)
7. [Production Build & Code Guidelines](#-production-build--code-guidelines)

---

## 🏗️ System Architecture Overview

VIBEZ operates on a split-portal layout powered by Next.js **App Router** groups. By isolating routes into layout groups like `(Admin)`, `(Restaurant)`, `(Staff)`, and `(auth)`, the system separates layout contexts and limits bundle sizes per portal. Data hydration and synchronization are managed via an RTK-based centralized state store, maintaining a single source of truth across all modules.

---

## 🚀 Role-Based Feature Specifications

### 1. Platform Administrators (Admin Portal)
Administrators manage platform-wide configurations, billing models, listing verifications, and marketplace metrics.
- **Dynamic Stats Board**: Live tracking of overall platform revenue (Monthly vs. Annual), active subscribers, payment failures, upcoming renewals, and partner payout distributions using interactive charts.
- **Subscription Engine**: Create and update pricing structures (MONTHLY, HALF_YEARLY, YEARLY). Admins can toggle free trials, define trial day lengths, and manage billing plans.
- **Partner Referral & Commissions Ledger**: Oversee affiliate codes, track referrers, calculate commission percentages (e.g. `percentOff` discounts), and manage manual withdrawal payouts.
- **Listing Onboarding & Moderation**: Audit restaurant listing submissions, suspend non-compliant owners, and manage category listings.
- **System Coupons & Deals**: Setup platform-wide seasonal promotional campaigns, customize target discounts, and monitor usage metrics.

### 2. Restaurant Owners (Restaurant Dashboard)
A complete system for managing a physical restaurant branch and its online marketplace presence.
- **Analytics & Booking Visualizers**: Live dashboard displaying reservations, peak booking hours, weekly visitor statistics, and customer metrics using responsive graphs.
- **Table Reservator & Calendar**: Real-time management of reservation schedules, seating capacities, and walk-in updates.
- **Marketing Video Channels ("Shorts")**: Upload promotional short-form marketing videos directly to the client feed to boost local customer interest.
- **Shift & Staff Scheduling**: Add staff members (Managers, Hosts, Waiters), assign shifts, manage work logs, and track staff schedules.
- **Geographic Map Listings**: Define restaurant location coordinates using map overlays (powered by React Leaflet) so users can locate venues easily.

### 3. Restaurant Staff Portal
- **Shift Calendars**: Clean, lightweight visual workspace for on-duty staff to review assignations, shift shifts, and operational task lists.
- **Reservation Check-ins**: Real-time booking check-in interface.

---

## 🔑 Technical Architecture & State Flow

### 1. RTK Query Caching & Tag Invalidation
Query caching and updates are handled by Redux Toolkit Query (`baseApi.ts`). The API utilizes tags to optimize network traffic:
- **Core Tag Types**: `SubscriptionPlan`, `User`, `Deal`, `Restaurant`, `Coupon`, `Reservation`, `Dashboard`, `Withdrawal`.
- **Query Mutators**: Mutations such as `createSubscriptionPlan` automatically mark tags as dirty (`invalidatesTags: ["SubscriptionPlan"]`), triggering background updates for dashboard lists without requiring a page reload.

### 2. Seamless Re-Authentication Interceptor
The platform handles JWT-based authentication securely through HTTP headers:
- If a query fails with a `401 Unauthorized` or `403 Forbidden` error, the custom re-auth handler (`baseQueryWithReauth`) pauses queries, triggers a POST request to `/auth/refresh-token` (injecting credentials), updates the Redux token store, and automatically retries the failed requests.
- If the token refresh process fails, the session is purged, and the user is redirected to `/login` to prevent security leaks.

### 3. Media & Upload Resolution Core
Uploaded files (profile pictures, banners, restaurant shorts) are kept in storage and resolved using `getImageUrl()` (`lib/utils.ts`):
- Converts relative system filenames (e.g., `uploads/profile-images/...`) to absolute paths.
- Reads `NEXT_PUBLIC_PIC_URL` dynamically as the base asset domain while avoiding double-slash (`//`) errors.

---

## 🛠️ Tech Stack Matrix

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Framework** | [Next.js v16](https://nextjs.org/) | Core App Router framework, SSR, and path structures |
| **State Engine** | [Redux Toolkit (v2)](https://redux-toolkit.js.org/) | Global store provider, auth token slice, and page parameters |
| **API Caching** | [RTK Query](https://redux-toolkit.js.org/rtk-query/overview) | Backend API sync layer, interceptors, and tags |
| **Data Graphs** | [Recharts](https://recharts.org/) | Custom revenue breakdowns, booking histograms, and stats |
| **Maps & Geoloc** | [React Leaflet](https://react-leaflet.js.org/) | Geographic coordinates picker and map visualizer |
| **Styling** | Tailwind CSS v4 & Vanilla CSS | Performance-driven designs, components, and fluid responsiveness |
| **Realtime Sync** | [Socket.io Client](https://socket.io/) | Live table reservation statuses and check-in pushes |
| **Alerts & Toasts**| [Sonner](https://github.com/emilkowalski/sonner) & SweetAlert2 | Premium alerts, toasts, confirmations, and custom notifications |

---

## 📁 Directory Layout

```bash
├── app/
│   ├── (Admin)/            # Layout & pages exclusive to platform admins
│   │   └── admin/          # Dashboard, user plans, referrals, stats, coupons, withdrawals
│   ├── (Restaurant)/       # Layout & pages for restaurant owners
│   │   └── dashboard/      # Bookings, analytics, schedules, deals, video uploading
│   ├── (Staff)/            # Pages for restaurant managers and service staff
│   ├── (auth)/             # Authentication route layouts (login, register, reset-pass)
│   ├── (Home)/             # Public landing pages
│   ├── Components/         # Shared global design system components
│   ├── globals.css         # Theme stylesheet, Tailwind layer, custom fonts
│   └── layout.tsx          # Main root metadata provider
├── redux/
│   ├── api/
│   │   └── baseApi.ts      # Main API interceptor with reauth and tagging config
│   ├── features/           # Slices and API endpoint mutations
│   │   ├── auth/           # Login credentials slice and user payload
│   │   ├── admin/          # Subscription plan APIs
│   │   ├── dashboard/      # Admin statistics and revenue query slice
│   │   └── reservations/   # Reservation and weekly booking slices
│   └── store.ts            # Configured Redux state store
├── lib/
│   └── utils.ts            # Dynamic image resolvers and styling tailwind-mergers
└── public/                 # Static illustrations, logos, icons
```

---

## ⚙️ Local Setup Guide

### 1. Prerequisites
- **Node.js**: `v18.0.0` or higher
- **Package Manager**: `npm` (v9+) or `yarn` / `pnpm`

### 2. Configuration
Create a `.env` file in the project root containing your setup configurations:
```env
# URL pointing to the VIBEZ backend server REST API
NEXT_PUBLIC_API_URL=https://vibezapi.apponislam.top/api/v1

# URL pointing to the static assets / uploads directory root on server
NEXT_PUBLIC_PIC_URL=https://vibezapi.apponislam.top

# Google Maps API Key for Leaflet coordinate loading
NEXT_PUBLIC_MAPS_API_KEY=your_maps_api_key
```

### 3. Execution
Follow these shell commands to launch your environment:
```bash
# 1. Install dependencies
npm install

# 2. Start the hot-reloading development server
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your web browser.

---

## 📦 Production Build & Code Guidelines

### Code Standards & Quality
Ensure the project complies with styling and programming standards before building:
```bash
npm run lint
```

### Compiling Build
Compile your production package:
```bash
npm run build
```
This builds static client pages, optimizes fonts, compiles TypeScript, and places optimized assets in the `.next` folder.

### Running Production
Run the compiled code:
```bash
npm start
```
*Port configuration can be overridden by passing a `PORT` environment variable before launching the command.*
