📚 StudyHere – React Study Space Finder

StudyHere is a simple React application that allows students to browse, filter, and reserve study spaces across campus. This project serves as a hands-on introduction to key React fundamentals such as components, props, state, event handling, and list rendering with .map().

Links: https://studyhere.vercel.app/


📝 Overview

The StudyHere app displays a collection of study spaces located across different campus buildings. Users can:

Explore the list of spaces

Filter by capacity, opening status, and search terms

Sort the spaces by name or capacity

Reserve a study space with a toggle button

This small app demonstrates how React helps build dynamic, interactive UIs without manually updating the DOM.

✨ Features
✔ Browse Spaces

Each study space card shows:

Name

Building

Emoji icon

Capacity

Noise level

Outlet availability

Open/Closed status

✔ Filtering

Users can filter study spaces by:

Text search

Minimum capacity

“Open now” checkbox

Sorting options (A–Z, capacity ascending/descending)

✔ Reservation Toggle

Each space includes a Reserve / Reserved toggle button:

“Reserve” → white/gray button

“Reserved” → green highlighted button

State updates immediately change the UI.

✔ Fully interactive with React state

All user interactions are state-driven and re-render automatically.

🧩 Components
App.jsx

The root component that:

Holds the main state (searchTerm, minCapacity, onlyOpen, sortBy, reserved)

Filters/sorts study spaces with useMemo

Passes props + event handlers to children

Renders the main layout

Header.jsx

A simple header section displaying the app title and description.

Filters.jsx

Contains:

Search bar

Capacity input

“Open now” checkbox

Sorting dropdown

Receives callback props from App and returns updated values.

StudySpaceList.jsx

Displays the filtered list using .map().
Receives:

Filtered spaces

reserved Set

onToggleReserved handler

StudySpaceCard.jsx

Shows individual space details, including:

Emoji, name, building

Tags (chips) for noise, outlets, capacity, open status

Reservation toggle button

Receives:

space object

isReserved boolean

onToggleReserved callback

Chip.jsx

A reusable component for small tagged labels.

⚙️ How It Works
🔹 1. Data & State

App stores:

const [reserved, setReserved] = useState(new Set());


A Set is used for fast add/remove operations when reserving spaces.

🔹 2. Filtering Logic

useMemo recalculates the filtered list only when needed:

const filtered = useMemo(() => {
  return spaces.filter(...);
}, [searchTerm, minCapacity, onlyOpen, sortBy]);

🔹 3. Reservation Button

The Reserve/Reserved toggle works by adding/removing the space id in the Set:

const toggleReserved = (id) => {
  setReserved(prev => {
    const next = new Set(prev);
    next.has(id) ? next.delete(id) : next.add(id);
    return next;
  });
};


UI updates instantly because React re-renders the component tree.

🔹 4. Props Flow

React’s one-way data flow looks like:

App  
 ├── Filters (gets setters)  
 ├── StudySpaceList (gets filtered spaces + reserved)  
       └── StudySpaceCard (gets space + isReserved + toggle handler)

📦 Installation & Running the App
1. Install dependencies
npm install

2. Start the development server
npm run dev

3. Open in the browser
http://localhost:5173