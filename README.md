# Azure IoT Central Clone

A visually-rich, real-time dashboard inspired by **Azure IoT Central**, built with **Vite**, **React**, and **TailwindCSS**. This app simulates IoT device metrics and dashboard behaviors entirely on the frontend, using `setTimeout` for real-time effects—no backend required.

## Features

- **Dashboard**: Modern widget-based layout displaying device status, sensor metrics, and quick summaries.
- **Real-Time Simulation**: Temperature, humidity, pressure, and energy consumption are updated live with simulated data.
- **Full Navigation**: Sidebar links to dashboard, devices, analytics, rules, audit logs, and other management sections.
- **Modular Codebase**: Organized by component, hooks, pages, and layouts.
- **Responsive UI**: Built with TailwindCSS for mobile-friendly and accessible design.

## Tech Stack

- **Vite**: Build tool and dev server.
- **React**: Component structure and UI state.
- **TailwindCSS**: Utility-first styling.
- **TypeScript**: Improved type safety (in your project).
- **setTimeout/Interval**: Simulates live device data.

## Screenshots

- Main dashboard with widgets for device status, temperature, humidity, pressure, and energy usage
- Folder structure in your IDE for reference

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Start the development server:**
   ```bash
   npm run dev
   ```
3. **Visit:** `http://localhost:5173`

## Simulated Data

All sensor and device data is simulated using random values updated with JavaScript timers—see `useDeviceData.ts` for the simulation logic.

## Customization

- **Add/modify metrics**: Edit `useDeviceData.ts` and related dashboard cards.
- **Expand navigation**: Add pages and update the sidebar.
- **Change simulation ranges**: Adjust helper constants in hooks or utilities.

## Limitations

- **No backend**: This is frontend-only; there’s no real IoT connection or persistence.
- **Simulation only**: Use for demos, prototyping, or UI showcase.

## Credits

- Inspired by Azure IoT Central.
- Built with Vite, React, and TailwindCSS.

## License

MIT – open for use, learning, and extension.

Feel free to copy, modify, and extend this project as needed!

