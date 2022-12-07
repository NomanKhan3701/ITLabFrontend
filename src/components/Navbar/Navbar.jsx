import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Btn_prime1 from '../UI/Buttons/Btn_prime1/Btn_prime1'
import Btn_prime2 from '../UI/Buttons/Btn_prime2/Btn_prime2'
import './Navbar.scss'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useRef, useState } from 'react'
import * as actions from '../../store/actions/index';

const Navbar = () => {
  const JWT = useSelector((state) => state.auth.token ? state.auth.token : null);
  const userInfo = useSelector((state) => state.auth.user ? state.auth.user : null);
  const navRef = useRef(null);
  const dispatch = useDispatch();
  const [reRender, setReRender] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.addEventListener('scroll', handleNavScroll);
    return () => window.removeEventListener('scroll', handleNavScroll);
  }, [])

  useEffect(() => {
    if (JWT) {
      setReRender(state => !state);
      navigate('/');
    }
  }, [JWT])


  const handleNavScroll = () => {
    if (window.scrollY > 20 && navRef.current) {
      navRef.current.classList.add('scrolled');
    } else if (navRef.current) {
      navRef.current.classList.remove('scrolled');
    }
  }

  return (
    <div className='Navbar container' ref={navRef}>
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
                  <span name="author_nav_link">Authors</span>
                </Btn_prime2>
              </Link>
              <Link to='/crawler_authors'>
                <Btn_prime2>
                  <span name="author_nav_link">Crawled authors</span>
                </Btn_prime2>
              </Link>
              <Link to='/posts'>
                <Btn_prime2>
                  Posts
                </Btn_prime2>
              </Link>
              {/* <div onClick={() => {
                dispatch(actions.logout)
                window.location.reload();
              }}>Logout</div> */}
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