# Architecture Overview

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         Client Layer                            │
├─────────────────────────────────┬───────────────────────────────┤
│                                 │                               │
│     Web Application             │    Mobile Application         │
│     (React + Vite)              │    (React Native + Expo)      │
│                                 │                               │
│  ┌──────────────────────┐       │   ┌──────────────────────┐   │
│  │ - React Router       │       │   │ - React Navigation   │   │
│  │ - TanStack Query     │       │   │ - TanStack Query     │   │
│  │ - Zustand            │       │   │ - Zustand            │   │
│  │ - Axios              │       │   │ - Axios              │   │
│  │ - TailwindCSS        │       │   │ - React Native       │   │
│  └──────────┬───────────┘       │   └──────────┬───────────┘   │
│             │                   │              │               │
└─────────────┼───────────────────┴──────────────┼───────────────┘
              │                                  │
              │         HTTP/REST API            │
              │         (JSON)                   │
              └──────────────┬───────────────────┘
                             │
┌────────────────────────────▼────────────────────────────────────┐
│                      Backend Layer                              │
│                   (Express.js + TypeScript)                     │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                    API Routes                           │   │
│  │  /api/auth      - Authentication                        │   │
│  │  /api/products  - Products Management                   │   │
│  │  /api/master    - Companies, Roles, Users               │   │
│  │  /api/formbuilder - Form Builder                        │   │
│  │  /api/dynamic   - Dynamic Entities                      │   │
│  │  /api/documents - Document Builder                      │   │
│  └─────────────────────────┬───────────────────────────────┘   │
│                            │                                   │
│  ┌─────────────────────────▼───────────────────────────────┐   │
│  │                   Controllers                           │   │
│  │  - Request Validation                                   │   │
│  │  - Error Handling                                       │   │
│  │  - Response Formatting                                  │   │
│  └─────────────────────────┬───────────────────────────────┘   │
│                            │                                   │
│  ┌─────────────────────────▼───────────────────────────────┐   │
│  │                    Services                             │   │
│  │  - Business Logic                                       │   │
│  │  - Data Processing                                      │   │
│  │  - Multi-tenant Isolation                               │   │
│  └─────────────────────────┬───────────────────────────────┘   │
│                            │                                   │
│  ┌─────────────────────────▼───────────────────────────────┐   │
│  │                  Prisma ORM                             │   │
│  │  - Database Queries                                     │   │
│  │  - Type Safety                                          │   │
│  │  - Migrations                                           │   │
│  └─────────────────────────┬───────────────────────────────┘   │
│                            │                                   │
└────────────────────────────┼───────────────────────────────────┘
                             │
┌────────────────────────────▼────────────────────────────────────┐
│                      Database Layer                             │
│                     (PostgreSQL)                                │
│                                                                 │
│  Tables:                                                        │
│  - User                                                         │
│  - Tenant                                                       │
│  - Product                                                      │
│  - Company                                                      │
│  - Role                                                         │
│  - Form                                                         │
│  - FormField                                                    │
│  - DynamicEntity                                                │
│  - Document                                                     │
│  - DocumentField                                                │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Mobile App Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    Mobile App Structure                         │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │                      App.tsx                             │   │
│  │  - Root Component                                        │   │
│  │  - Query Client Provider                                 │   │
│  │  - Gesture Handler Root                                  │   │
│  └────────────────────────┬─────────────────────────────────┘   │
│                           │                                     │
│  ┌────────────────────────▼─────────────────────────────────┐   │
│  │              Navigation Layer                            │   │
│  │              (AppNavigator.tsx)                          │   │
│  │                                                          │   │
│  │  Auth Stack          │         Main Stack               │   │
│  │  - Login             │         - Home                    │   │
│  │  - Register          │         - Products                │   │
│  │                      │         - Companies               │   │
│  │                      │         - Roles                   │   │
│  │                      │         - Users                   │   │
│  │                      │         - Forms                   │   │
│  │                      │         - Profile                 │   │
│  └────────────────────────┬─────────────────────────────────┘   │
│                           │                                     │
│  ┌────────────────────────▼─────────────────────────────────┐   │
│  │                  Screen Layer                            │   │
│  │  - LoginScreen                                           │   │
│  │  - RegisterScreen                                        │   │
│  │  - HomeScreen                                            │   │
│  │  - ProductsScreen                                        │   │
│  │  - [Other Screens]                                       │   │
│  └──────┬─────────────────────────────────────┬─────────────┘   │
│         │                                     │                 │
│  ┌──────▼──────────┐              ┌───────────▼──────────────┐  │
│  │  State Layer    │              │    Component Layer       │  │
│  │                 │              │                          │  │
│  │  Auth Store     │              │  - Button                │  │
│  │  (Zustand)      │              │  - Input                 │  │
│  │                 │              │  - Loading               │  │
│  │  React Query    │              │  - [Other Components]    │  │
│  │  (Server State) │              │                          │  │
│  └──────┬──────────┘              └──────────────────────────┘  │
│         │                                                       │
│  ┌──────▼────────────────────────────────────────────────────┐  │
│  │                    API Layer                              │  │
│  │                                                           │  │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐   │  │
│  │  │ Auth API     │  │ Products API │  │ Master API   │   │  │
│  │  └──────────────┘  └──────────────┘  └──────────────┘   │  │
│  │  ┌──────────────┐  ┌──────────────┐                     │  │
│  │  │ Forms API    │  │ API Client   │                     │  │
│  │  └──────────────┘  └──────────────┘                     │  │
│  │                                                           │  │
│  │  Features:                                                │  │
│  │  - Axios Instance                                         │  │
│  │  - Request Interceptor (Add JWT Token)                   │  │
│  │  - Response Interceptor (Handle Errors)                  │  │
│  │  - Error Handling                                         │  │
│  └───────────────────────────┬───────────────────────────────┘  │
│                              │                                  │
└──────────────────────────────┼──────────────────────────────────┘
                               │
                               │ HTTP/REST
                               │
                        Backend API
```

## Data Flow

### Authentication Flow
```
1. User Input (LoginScreen)
   │
   ▼
2. authStore.login({ email, password })
   │
   ▼
3. authApi.login(credentials)
   │
   ▼
4. POST /api/auth/login
   │
   ▼
5. Backend validates credentials
   │
   ▼
6. Return { token, user }
   │
   ▼
7. Save to AsyncStorage
   │
   ▼
8. Update authStore state
   │
   ▼
9. Navigate to HomeScreen
```

### API Request Flow
```
1. Component calls API (e.g., productApi.getAll())
   │
   ▼
2. API service uses apiClient (Axios)
   │
   ▼
3. Request Interceptor adds JWT token
   │
   ▼
4. GET /api/products
   │
   ▼
5. Backend validates token
   │
   ▼
6. Backend filters by tenantId
   │
   ▼
7. Return products data
   │
   ▼
8. Response Interceptor handles errors
   │
   ▼
9. Data returned to component
   │
   ▼
10. Component updates UI
```

## Multi-Tenancy

```
┌─────────────────────────────────────────────────────────┐
│                   Request Flow                          │
│                                                         │
│  Mobile App                                             │
│  ┌──────────────────────────────────────────────┐       │
│  │ User Login                                   │       │
│  │ - email: user@company1.com                   │       │
│  │ - password: ********                         │       │
│  └────────────────────┬─────────────────────────┘       │
│                       │                                 │
│                       ▼                                 │
│  ┌──────────────────────────────────────────────┐       │
│  │ Backend validates and returns:               │       │
│  │ {                                            │       │
│  │   token: "jwt_token_here",                   │       │
│  │   user: {                                    │       │
│  │     id: "user1",                             │       │
│  │     email: "user@company1.com",              │       │
│  │     tenantId: "tenant1"  ◄─── IMPORTANT     │       │
│  │   }                                          │       │
│  │ }                                            │       │
│  └────────────────────┬─────────────────────────┘       │
│                       │                                 │
│                       ▼                                 │
│  ┌──────────────────────────────────────────────┐       │
│  │ All subsequent requests include:             │       │
│  │ - JWT token (contains tenantId)              │       │
│  │                                              │       │
│  │ Backend automatically filters all queries:   │       │
│  │ WHERE tenantId = "tenant1"                   │       │
│  │                                              │       │
│  │ Result: User only sees their tenant's data   │       │
│  └──────────────────────────────────────────────┘       │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

## Technology Stack Comparison

| Feature | Web App | Mobile App |
|---------|---------|------------|
| Framework | React | React Native |
| Build Tool | Vite | Expo |
| Language | TypeScript | TypeScript |
| Routing | TanStack Router | React Navigation |
| State | Zustand + React Query | Zustand + React Query |
| HTTP Client | Axios | Axios |
| Styling | TailwindCSS | React Native StyleSheet |
| Storage | localStorage | AsyncStorage |
| Backend | **Same Express API** | **Same Express API** |

## Shared Components

Both web and mobile apps share:
- ✅ Same backend API
- ✅ Same authentication mechanism (JWT)
- ✅ Same data models (TypeScript types)
- ✅ Same business logic (handled by backend)
- ✅ Same multi-tenant architecture
- ✅ Same state management pattern (Zustand)
- ✅ Same data fetching pattern (React Query)

## Key Differences

| Aspect | Web | Mobile |
|--------|-----|--------|
| UI Components | HTML + Radix UI | React Native Components |
| Styling | TailwindCSS | StyleSheet |
| Navigation | TanStack Router | React Navigation |
| Storage | localStorage | AsyncStorage |
| Platform | Browser | iOS + Android |
| Deployment | Web Server | App Stores |
