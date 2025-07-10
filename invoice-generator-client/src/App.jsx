import React from 'react';
import { BrowserRouter, Routes, Route, Router } from 'react-router-dom';   
import MenuBar from './components/MenuBar';
import Footer from './components/Footer';
import LandingPage from './pages/landing/LandingPage';
import Dashboard from './pages/Dashboard';
import MainPage from './pages/MainPage';
import PreviewPage from './pages/PreviewPage';
import { Toaster } from 'react-hot-toast';
import UserSyncHandler from './components/UserSyncHandler';
import { RedirectToSignIn, SignedOut, SignIn } from '@clerk/clerk-react';

const App = () => {
  return(
    <BrowserRouter>
      <UserSyncHandler/>
      <MenuBar />
      <Toaster />
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path='/dashboard' element={
          <>
            <SignIn>
              <Dashboard/>
            </SignIn>
            <SignedOut>
              <RedirectToSignIn/>
            </SignedOut>
          </>
          } />
        <Route path='/generate' element={
          <>
            <SignIn>
              <MainPage/>
            </SignIn>
            <SignedOut>
              <RedirectToSignIn/>
            </SignedOut>
          </>
        } />
        <Route path='/preview' element={<PreviewPage />} />
      </Routes>
      <Footer />
    
    </BrowserRouter>
  )}

  export default App;