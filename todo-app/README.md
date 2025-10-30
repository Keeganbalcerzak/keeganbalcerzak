# My Amazing Todo List

A beautiful, feature-rich, and modern todo list application built with React, Vite, and Tailwind CSS.

## Features

### Core Functionality
- **Add, Edit, and Delete Tasks** - Manage your tasks with ease
- **Mark as Complete** - Check off completed tasks with smooth animations
- **Persistent Storage** - All tasks are saved to localStorage
- **Real-time Search** - Quickly find tasks with instant search

### Organization
- **Priority Levels** - Categorize tasks as High, Medium, or Low priority
- **Categories** - Organize tasks by Personal, Work, Shopping, Health, or Other
- **Due Dates** - Set deadlines for your tasks with overdue indicators
- **Smart Filtering** - Filter by status (All/Active/Completed) and priority

### User Experience
- **Dark/Light Mode** - Toggle between beautiful themes
- **Progress Tracking** - Visual progress bar showing completion percentage
- **Responsive Design** - Works perfectly on all screen sizes
- **Smooth Animations** - Delightful transitions and hover effects
- **Beautiful UI** - Modern gradient backgrounds and clean design

## Tech Stack

- **React 19** - Latest version of React
- **Vite** - Fast build tool and dev server
- **Tailwind CSS v4** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library
- **LocalStorage** - Client-side data persistence

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd todo-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Usage

### Adding a Task
1. Enter your task in the input field
2. Select priority level (High/Medium/Low)
3. Choose a category
4. Optionally set a due date
5. Click "Add" or press Enter

### Managing Tasks
- Click the circle icon to mark a task as complete
- Click the edit icon to modify a task
- Click the trash icon to delete a task
- Use the search bar to find specific tasks
- Use filters to view specific task groups

### Theme Toggle
Click the sun/moon icon in the top right to switch between light and dark modes.

## Project Structure

```
todo-app/
├── src/
│   ├── TodoList.jsx      # Main todo list component
│   ├── App.jsx           # Root component
│   ├── main.jsx          # Entry point
│   └── index.css         # Global styles
├── public/               # Static assets
├── index.html            # HTML template
└── package.json          # Dependencies and scripts
```

## Features Breakdown

### Priority System
- **High Priority** - Red indicators for urgent tasks
- **Medium Priority** - Yellow indicators for important tasks
- **Low Priority** - Green indicators for routine tasks

### Smart Filters
- Filter by completion status
- Filter by priority level
- Search across all task text
- Combined filtering for precise results

### Data Persistence
- All tasks automatically saved to localStorage
- Theme preference persisted across sessions
- Data survives page refreshes

## Browser Support

Works on all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## Contributing

Feel free to submit issues and enhancement requests!

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Acknowledgments

- Icons by [Lucide](https://lucide.dev/)
- Built with [Vite](https://vitejs.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
