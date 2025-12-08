# AlgorithmLab — React + Node.js

The project demonstrates the operation of selected algorithms through interactive visualization.
Its goal is to showcase practical knowledge of algorithms and the ability to implement them in a full-stack application.

## 🛠 Technologies

- **Frontend:** React + Vite
  - `React` — a library for building user interfaces
  - `Vite` — a fast bundler and development server for frontend projects
  - `React Router` — handling navigation and routing between different pages/components

- **Backend:** Node.js + Express
  - `Node.js` — a JavaScript runtime environment for server-side development
  - `Express` — a framework for building APIs and handling HTTP requests
  - `CORS` — middleware that allows communication between frontend and backend running on different ports

## 📂 Project Structure

```ascii
frontend/          # React frontend
  ├─ src/
  │   ├─ components/
  │   │   ├─ InsertionSortVisualizer.jsx
  │   │   └─ InsertionSortDescription.jsx
  │   ├─ pages/
  │   │   └─ Home.jsx
  │   └─ App.jsx
  └─ main.jsx       # React entry point

backend/           # Node.js backend
  ├─ algorithms/
  │   └─ insertionSort.js
  └─ server.js

```

## 🌐 Routing in React
- The frontend uses React Router to handle navigation between pages.

- `/`- → Home page with algorithm selection cards

- `/insertion-sort` → Insertion Sort visualizer page

- Each algorithm will eventually have its own route and visualizer component.

This approach allows multiple pages without reloading the browser, which is standard in modern single-page applications (SPA).

## 🔗 Backend Endpoints

The backend provides `REST` endpoints for handling sorting and descriptions:

- `GET /`

  - **Test endpoint**, returns _AlgorithmLab backend is running_

- `POST /sort/insertion`

  - Receives `JSON { array: [5,2,4,3] }`
  - Returns the sorting steps and the sorted array

- `GET /description/insertion` (_future feature_)

  - Will return a text description of the algorithm
  - Can be later connected to a database (Supabase, MongoDB Atlas, etc.)

## ⚡ Supabase Integration

This project uses [Supabase](https://supabase.com/) as a backend to store algorithm descriptions. The `InsertionSortVisualizer` component fetches the description of the algorithm from the Supabase database and displays it above the input field.

### Setup

1. Create a Supabase project and a table called `algorithms` with columns:
   - `id` (uuid or serial)
   - `name` (text)
   - `description` (text)
   - `category` (text)

2. Insert data into the table, for example:

```sql
INSERT INTO public.algorithms (id, name, description, category)
VALUES ('1', 'InsertionSort', 'Insertion Sort is a simple way to sort a list of numbers...', 'Sorting');

3. Enable Row Level Security (RLS) and create a policy to allow public read access:

```sql
create policy "Allow read for everyone" on public.algorithms
for select using (true);
```

4. Add your Supabase credentials in the `.env` file in your frontend folder:

```sql
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## 🏃‍♂️ Running the project

#### **Backend**

Being in project root directory:

```bash
cd backend
node server.js
```

#### **Frontend**

Being in project root directory:

```bash
cd frontend
npm run dev
```
Open your browser at `http://localhost:5173`.
