# GitHub User Search Application

A modern React application that allows users to search for GitHub profiles using the GitHub API with advanced filtering capabilities.

## Features

- **Advanced Search**: Search users by username, location, and minimum repository count
- **Rich User Information**: Display avatars, bios, statistics (repos, followers, following)
- **Pagination**: Load more results with efficient API calls
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Real-time Search**: Dynamic filtering with multiple criteria
- **Professional UI**: Modern card layouts with smooth transitions and hover effects

## Technologies Used

- React 18
- JavaScript (ES6+)
- Vite
- Tailwind CSS
- Axios
- GitHub REST API v3

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

## Deployment

### Deploy to Vercel

1. Push your code to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/github-user-search.git
git push -u origin main
```

2. Visit [Vercel](https://vercel.com) and sign in with GitHub

3. Click "New Project" and import your repository

4. Configure the project:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`

5. (Optional) Add environment variables:
   - Go to Project Settings → Environment Variables
   - Add `VITE_APP_GITHUB_API_KEY` with your GitHub token

6. Click "Deploy" and wait for the build to complete

7. Your application will be live at `https://your-project.vercel.app`

### Environment Variables (Optional)

To increase API rate limits, add a GitHub Personal Access Token:

1. Create a token at [GitHub Settings](https://github.com/settings/tokens)
2. Add it to Vercel's environment variables as `VITE_APP_GITHUB_API_KEY`
3. Redeploy the application

## License

MIT
