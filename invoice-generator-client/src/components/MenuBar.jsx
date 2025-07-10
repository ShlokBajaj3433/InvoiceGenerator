import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Logo from './Logo';
import { assets } from './../assets/assets';
import { useClerk } from '@clerk/clerk-react';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import { InitialInvoiceData } from '../context/Appcontext';
import { AppContext } from './../context/Appcontext';

function MenuBar() {
  const {openSignIn,} = useClerk()
  const {setInvoiceData, setInvoicetitle, Settemplate} = useContext(AppContext)
  const  navigate = useNavigate()

  const openLogin = () => {
    openSignIn({});
  }

  const handleGenerateClicked = () => {
    setInvoiceData(InitialInvoiceData);
    setInvoicetitle("New Invoice");
    Settemplate("template1");
    navigate("/generate");
  };


  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top'>
      <div className="container pd-2 d-flex justify-content-between align-items-center">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <Logo />
          <span className='ms-2 fw-bold fs-4' style={{ fontFamily: 'Poppins, sans-serif', letterSpacing: '0.5px', color: '#0D6EFDB2' }} onClick={handleGenerateClicked}>
            Invoice Generator
          </span>
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          <ul className='navbar-nav ms-auto mb-2 mb-lg-0 d-flex align-items-center'>
             <li className='nav-item'>
              <Link className='nav-link' to='/home'>
                Home
              </Link>
            </li>
              <SignedIn>
              <li className='nav-item'>
              <Link className='nav-link' aria-current='page' to='/Dashboard'>
                Dashboard
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to='/Generate'>
                Generate Invoice
              </Link>
            </li>
            <UserButton/>
              </SignedIn>
              <SignedOut>
                
            <li className='nav-item '>
              <button className='btn btn-primary rounded-pill px-4 fw-medium' onClick={() => openLogin()} >
                Login / Sign Up
              </button>
            </li>
              </SignedOut>
          </ul>

        </div>
      </div>
    </nav>
  )
}

export default MenuBar