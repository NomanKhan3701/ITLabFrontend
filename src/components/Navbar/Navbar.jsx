import React from 'react'
import { Link } from 'react-router-dom'
import Btn_prime1 from '../UI/Buttons/Btn_prime1/Btn_prime1'
import Btn_prime2 from '../UI/Buttons/Btn_prime2/Btn_prime2'
import './Navbar.scss'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'

const Navbar = () => {
  const JWT = useSelector((state) => state.auth.token ? state.auth.token : null);
  const userInfo = useSelector((state) => state.auth.user ? state.auth.user : null);

  return (
    <div className='Navbar container'>
      <Link to='/'>
        <div className="logo">
          <img src='/public/assets/images/writeFeather.svg' alt="" />
          <div>Artex</div>
        </div>
      </Link>
      <div className="utils">
        {
          JWT ? (
            <>
              <Link to='/explore'>
                <Btn_prime2>
                  Authors
                </Btn_prime2>
              </Link>
              <Link to='/posts'>
                <Btn_prime2>
                  Posts
                </Btn_prime2>
              </Link>
              <Link to='/profile'>
                <Btn_prime1>
                  Profile
                </Btn_prime1>
              </Link>
            </>
          ) : (
            <>
              <Link to='/login'>
                <Btn_prime2>
                  Login
                </Btn_prime2>
              </Link>
              <Link to='/signup'>
                <Btn_prime1>
                  Signup
                </Btn_prime1>
              </Link>
            </>
          )
        }

      </div >

    </div >
  )
}

export default Navbar