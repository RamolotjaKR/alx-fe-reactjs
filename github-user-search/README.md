# GitHub User Search Application

A React application that allows users to search for GitHub profiles using the GitHub API.

## Features

- Search for GitHub users by username
- Display user information including avatar, bio, and profile details
- View user repositories
- Responsive design
- Built with React, TypeScript, and Vite

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/github-user-search.git
cd github-user-search
```

2. Install dependencies:
```bash
npm install
```

3. (Optional) Configure environment variables:
   - Copy `.env.example` to `.env`
   - Add your GitHub Personal Access Token to increase API rate limits
   - Get your token from: https://github.com/settings/tokens

### Running the Application

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Building for Production

Build the application:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Project Structure

```
github-user-search/
├── src/
│   ├── components/     # React components
│   ├── services/       # API services
│   ├── App.tsx         # Main application component
│   ├── App.css         # Application styles
│   ├── main.tsx        # Application entry point
│   └── index.css       # Global styles
├── public/             # Static assets
├── .env                # Environment variables (not committed)
├── .env.example        # Environment variables example
└── package.json        # Project dependencies
```

## API Usage

This application uses the GitHub REST API v3. Without authentication, you have a rate limit of 60 requests per hour. With a Personal Access Token, this increases to 5,000 requests per hour.

## Technologies Used

- React 19
- TypeScript
- Vite
- Axios
- GitHub REST API

## License

MIT
