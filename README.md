# ReleaseCheck


## Setup Instructions

### Backend
1. `cd server`
2. Install dependencies: `npm install`
3. Generate Prisma Client: `npx prisma generate`
4. Push schema to your database: `npx prisma db push`
5. Start the server: `npm start`

### Frontend
1. Create a new terminal instance
2. cd client
3. npm install
4. npm run dev

## Database Schema

**Table:** `releases`

| Column | Type |
| :--- | :--- |
| `id` | DEFAULT |
| `name` | VARCHAR |
| `release_date` | TIMESTAMP |
| `additional_info` | TEXT |
| `completed_steps` | JSON |

## API Endpoints

* GET `/api/releases` - Fetches all releases, returns array of release objects
* POST `/api/releases` - Creates a new release. Requires `name`, `release_date`, and optional `additional_info` in the body. Returns newly created release object
* PUT `/api/releases/:id/steps` - Updates the completed steps for a release. Requires an array `completed_steps` in the body. Returns updated release object
* PUT `/api/releases/:id/info` - Updates the additional info. Requires `additional_info` in the body. Returns updated release object
* DELETE `/api/releases/:id` - Deletes a specific release.