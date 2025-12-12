import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import './App.css';
import Navigation from './components/Navigation';
import RegistrationForm from './components/RegistrationForm';
import FormikForm from './components/formikForm';
import PostsComponent from './components/PostsComponent';
import UsersComponent from './components/UsersComponent';

// Create a client for React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Disable auto-refetch on window focus for demo
      retry: 1, // Retry failed requests once
    },
  },
});

function App() {
  const [currentView, setCurrentView] = useState('posts');

  return (
    <QueryClientProvider client={queryClient}>
      <div className="app">
        <Navigation onNavigate={setCurrentView} currentView={currentView} />
        
        {currentView === 'forms' && (
          <>
            <div className="header">
              <h1>React Form Handling Tutorial</h1>
              <p>Learn form management with Controlled Components and Formik</p>
            </div>
            
            <div className="forms-container">
              <RegistrationForm />
              <FormikForm />
            </div>
          </>
        )}
        
        {currentView === 'posts' && (
          <>
            <div className="header">
              <h1>React Query Data Fetching - Posts</h1>
              <p>Fetch and cache blog posts with automatic background updates</p>
            </div>
            
            <PostsComponent />
          </>
        )}
        
        {currentView === 'users' && (
          <>
            <div className="header">
              <h1>React Query Data Fetching - Users</h1>
              <p>Dependent queries: Click users to dynamically fetch their posts</p>
            </div>
            
            <UsersComponent />
          </>
        )}
      </div>
      
      {/* React Query DevTools - Shows cache and query status */}
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
}

export default App
