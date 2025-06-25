import React from 'react'
import { assets } from './../assets/assets';

function Logo() {
  return (
    <img
      src={assets.logo}
      alt="Logo"
      height={60}
      width={60}
      // style={{ background: 'transparent' }}

    />
  )
}

export default Logo