# 📚 StudyHere – React Study Space Finder

StudyHere is a simple React app that helps students explore, filter, and reserve study spaces across campus. It demonstrates key React concepts such as components, props, state, event handling, and list rendering with `.map()`.

Link: https://studyhere.vercel.app/

## ⭐ Overview

StudyHere allows users to browse different study locations across campus, filter them by capacity, noise level, availability, and more, and reserve a space using a simple toggle button. This project was built as a hands-on introduction to React fundamentals.

## 🚀 Features

### ✔ Browse study spaces

Each space displays:
- Name & building
- Emoji icon
- Capacity
- Noise level
- Open/Closed status
- Outlets availability

### ✔ Filters

Users can filter spaces by:
- Search query
- Minimum capacity
- Open now
- Sorting (name or capacity)

### ✔ Reserve a space

A simple toggle button switches between:
- Reserve
- Reserved

The button also changes color to indicate reservation status.

### ✔ Fully interactive UI

All updates are managed using React state, re-rendering only the components that change.

## 🧩 Components

### App.jsx

Main application component. Responsibilities:
- Holds all app-level state (`searchTerm`, `minCapacity`, `sortBy`, `onlyOpen`, `reserved`)
- Filters and sorts study spaces
- Passes props to child components
- Handles `onToggleReserved`

### Header

Displays the title and introduction.

### Filters

Receives props from `App` and triggers:
- `onSearch`
- `onCapacity`
- `onOnlyOpen`
- `onSort`

This component updates the filtering state in the parent.

### StudySpaceList

Renders a list of study spaces using `.map()`. Receives:
- Filtered list of spaces
- Reserved state
- `onToggleReserved`

### StudySpaceCard

Displays individual study space information. Includes the Reserve ↔ Reserved toggle button. Receives:
- A space object
- `isReserved`
- `onToggleReserved`

### Chip

A small reusable UI component used to display tags (e.g., "Open now", "Quiet", "Outlets available").

## ⚙️ How It Works

### 1. State Management

All main reactive data lives in `App.jsx`:
- `searchTerm`
- `minCapacity`
- `onlyOpen`
- `sortBy`
- `reserved` (Set of reserved study space IDs)

Updating state triggers automatic UI updates.

### 2. Filtering and Sorting

A `useMemo` hook recalculates the filtered list when the user updates:
- Search text
- Minimum capacity
- Open-now checkbox
- Sorting preference

This keeps the UI responsive and avoids unnecessary recalculations.

### 3. Reservation Toggle

The "Reserve / Reserved" button works by updating the `reserved` Set:

```javascript
const toggleReserved = (id) => {
  setReserved(prev => {
    const next = new Set(prev);
    next.has(id) ? next.delete(id) : next.add(id);
    return next;
  });
};
```

The card's button reads from this state:
- Shows **Reserve** when not reserved
- Shows **Reserved** (green highlight) when reserved

### 4. Props Flow

- `App` ➝ passes props ➝ `Filters`, `StudySpaceList`
- `StudySpaceList` ➝ passes props ➝ `StudySpaceCard`
- `StudySpaceCard` → triggers callback → back to `App`

This one-way data flow is a core React pattern.

## 🛠️ Getting Started

### Install dependencies:

```bash
npm install
```

### Run the dev server:

```bash
npm run dev
```

### Open in browser:

```
http://localhost:5173
```

## 📦 Tech Stack

- **React** - UI library
- **Vite** - Build tool and dev server
- **JavaScript (ES6+)** - Programming language

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.