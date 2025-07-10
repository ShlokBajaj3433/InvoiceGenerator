import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import AppcontextProvider from './context/Appcontext.jsx';
import { ClerkProvider } from '@clerk/clerk-react';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if(!PUBLISHABLE_KEY){
  throw new Error('VITE_PUBLISHABLE_KEY is not defined. Please set it in your environment variables.');
}



createRoot(document.getElementById('root')).render(
  <AppcontextProvider>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} >
      <App />
    </ClerkProvider>
  </AppcontextProvider>
)
