import React from 'react'
import { Link } from 'react-router-dom';
import Logo from './Logo';
import { assets } from './../assets/assets';

function MenuBar() {
  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top'>
      <div className="container pd-2 d-flex justify-content-between align-items-center">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <Logo />
          <span className='ms-2 fw-bold fs-4' style={{ fontFamily: 'Poppins, sans-serif', letterSpacing: '0.5px', color: '#0D6EFDB2' }}>
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
            <li className='nav-item'>
              <Link className='nav-link' aria-current='page' to='/Dashboard'>
                Dashboard
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to='/CreateInvoice'>
                Create Invoice
              </Link>
            </li>
            <li className='nav-item'>
              <button className='nav-link fw-medium' >
                Generate
              </button>
            </li>

            <li className='nav-item '>
              <button className='btn btn-primary rounded-pill px-4 fw-medium' >
                Login / Sign Up
              </button>
            </li>
           
            
          </ul>

        </div>
      </div>
    </nav>
  )
}

export default MenuBar