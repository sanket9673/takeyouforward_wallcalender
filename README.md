# Wall Calendar Component

A production-ready, highly polished, and interactive "Wall Calendar Component" built with React, TypeScript, and Tailwind CSS.
Inspired by physical wall calendars, it features a strong visual hierarchy, aesthetic design elements, date-range selection, and an integrated notes system.

## Features
- **Aesthetic UI**: Replicates a physical wall calendar with a modern digital twist, complete with soft shadows, spiral binding styling, and a dynamic hero image overlay.
- **Date Range Selection**: Smoothly select start and end dates with highlighted ranges.
- **Notes System**: Add, view, and delete notes tied to selected dates. Persists via `localStorage`.
- **Animations**: Subtle and engaging transitions using Framer Motion.
- **Responsive Layout**: Adjusts layout seamlessly between desktop (split image + calendar + notes) and mobile (stacked).

## Tech Stack
- **Framework**: React (Vite)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Date Logic**: date-fns
- **Animations**: Framer Motion
- **Icons**: Lucide React

## Setup Instructions
1. Navigate to the project directory:
   ```bash
   cd wall-calendar
   ```
2. Install dependencies (if not already installed):
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Architecture Explanation
The application is structured into modular components promoting reusability and separation of concerns:
- `WallCalendar`: The main wrapper components managing the overall layout structure.
- `HeroImageSection`: Handles the aesthetic top portion of the calendar, including the image, month/year typography, and decorative SVGs.
- `CalendarGrid`: Generates and renders the interactive monthly grid.
- `NotesPanel`: Manages the UI for the notes system.
- *Hooks*: Features specialized hooks (`useCalendar`, `useDateRange`, `useNotes`) to abstract complex logic.
- *Store*: Zustand handles the global state (`currentMonth`, `selectedDates`, `notes`).

## Design Decisions
- **SVG Cutout**: Instead of relying purely on CSS masks, an inline SVG was used for the blue overlay to create a sharp, scalable diagonal cut that accurately replicates modern UI design while remaining responsive.
- **Local Storage over Backend**: To provide a ready-to-use component for demo purposes, note persistence uses `localStorage`. This allows instant feedback during evaluation without requiring backend setup.
- **Micro-interactions**: Focused heavily on subtle enter/exit animations and hover states to give the UI a premium, responsive feel.

## Future Improvements
- **Dynamic Theming**: Automatically extract prominent colors from the hero image dynamically using a library like `color-thief` and inject them as CSS variables.
- **Backend Integration**: Replace `localStorage` with a robust backend API for cross-device note synchronization.
- **Holiday Data Integration**: Fetch real holiday data to populate calendar cells intelligently.
