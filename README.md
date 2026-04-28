# Insighta Labs+

A lightweight web frontend for the **Insighta Demographic Intelligence Platform** — browse, filter, and search demographic profiles powered by a name-analysis API.

---

## Features

- **GitHub OAuth login** with automatic token management and silent refresh
- **Dashboard** — at-a-glance totals: profiles, male/female breakdown
- **Profiles browser** — paginated table with filters for gender, age group, country, and sort order
- **Profile detail** — full breakdown including gender probability and country confidence score
- **Natural language search** — query profiles in plain English (e.g. *"young males from Nigeria"*)
- **Account page** — displays logged-in user's GitHub avatar, username, email, and role

---

## Tech Stack

| Layer | Details |
|-------|---------|
| Frontend | Vanilla HTML5, CSS3, JavaScript (no framework) |
| Auth | GitHub OAuth 2.0 via backend redirect |
| Token storage | `localStorage` (access + refresh tokens) |
| Backend API | REST — hosted on Railway |
| Deployment | Static files (any static host) |

---

## Project Structure

```
insighta-web/
├── index.html          # Login / landing page
├── dashboard.html      # Metrics overview
├── profiles.html       # Paginated & filterable profile list
├── profile.html        # Individual profile detail
├── search.html         # Natural language search
├── account.html        # Logged-in user account info
├── css/
│   └── style.css       # Shared stylesheet
└── js/
    ├── auth.js         # Token management, login guard, logout
    └── api.js          # Authenticated fetch wrapper with auto-refresh
```

---

## Getting Started

### Prerequisites

- A modern web browser
- A static file server (e.g. [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) for VS Code, or `npx serve`)
- Access to the Insighta backend (see [Backend](#backend))

### Running Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/insighta-web.git
   cd insighta-web
   ```

2. Serve the files locally. Using VS Code Live Server (default port `5500`):
   - Open the project folder in VS Code
   - Click **Go Live** in the status bar

   Or using `npx serve`:
   ```bash
   npx serve .
   ```

3. Open `http://localhost:5500` (or whichever port your server uses) in your browser.

4. Click **Continue with GitHub** to authenticate.

---

## Configuration

### Backend URL

The backend base URL is defined at the top of [js/api.js](js/api.js):

```js
const BACKEND_URL = "https://name-profiler-production.up.railway.app";
```

Update this value if you are running the backend locally or on a different host.

### OAuth Redirect URI

The GitHub OAuth link in [index.html](index.html) includes a hardcoded redirect URI:

```html
https://name-profiler-production.up.railway.app/auth/github?redirect_to=https://insighta-lab.netlify.app/dashboard.html
```

Update the `redirect_to` parameter to match your deployment URL before hosting in production.

---

## Authentication Flow

1. User clicks **Continue with GitHub** on the login page.
2. They are redirected to GitHub for authorization.
3. After approval, the backend redirects back to `dashboard.html` with query params:
   ```
   ?access_token=...&refresh_token=...&username=...
   ```
4. `auth.js` reads the tokens, stores them in `localStorage`, and clears them from the URL via `history.replaceState`.
5. All subsequent API requests include `Authorization: Bearer <access_token>`.
6. On a `401` response, `api.js` automatically attempts a token refresh before retrying the request. If the refresh fails, the user is logged out.

---

## Backend

The backend API is separately maintained and deployed on [Railway](https://railway.app).

**Base URL:** `https://name-profiler-production.up.railway.app`

| Endpoint | Description |
|----------|-------------|
| `GET /auth/github` | Initiates GitHub OAuth |
| `POST /auth/refresh` | Refreshes access/refresh token pair |
| `GET /auth/me` | Returns the authenticated user's info |
| `GET /api/profiles` | Lists profiles (supports filters & pagination) |
| `GET /api/profiles/:id` | Returns a single profile by ID |
| `GET /api/profiles/search` | Natural language profile search |

---

## License

MIT
