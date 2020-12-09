import React, { useContext } from 'react'
import styled from '@emotion/styled'
import { transparentize } from 'polished'
import { Link, navigate } from 'gatsby'

import firebase from 'firebase'
import { heights, dimensions, colors } from '../styles/variables'
import Container from './Container'
import { FirebaseContext } from '../../FirebaseProvider'

const StyledHeader = styled.header`
  height: ${heights.header}px;
  padding: 0 ${dimensions.containerPadding}rem;
  background-color: ${colors.brand};
  color: ${transparentize(0.5, colors.white)};
`

const HeaderInner = styled(Container)`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;
  justify-content: space-between;
`

const HomepageLink = styled(Link)`
  color: ${colors.white};
  font-size: 1.5rem;
  font-weight: 600;

  &:hover,
  &:focus {
    text-decoration: none;
  }
`

function logout() {
  firebase
    .auth()
    .signOut()
    .then(function() {
      navigate('/')
    })
    .catch(function(error) {
      // An error happened.
    })
}

interface NavActionProps {
  isLoggedIn: 'unset' | 'yes' | 'no' | undefined
}

const NavAction: React.FC<NavActionProps> = ({ isLoggedIn }) => {
  if (isLoggedIn === 'unset' || !isLoggedIn) {
    return (
      <div style={{ marginRight: '40px' }} className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    )
  }
  if (isLoggedIn === 'yes') {
    return (
      <div className="btn-group">
        <button
          style={{ color: 'white' }}
          type="button"
          className="btn btn-link dropdown-toggle"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          Account
        </button>
        <div className="dropdown-menu">
          <Link to="/account/">
            <p className="dropdown-item">Manage Account</p>
          </Link>
          <div className="dropdown-divider" />
          <button type="button" className="dropdown-item" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    )
  }
  if (isLoggedIn === 'no') {
    return (
      <div>
        <Link style={{ color: 'white' }} to="/login/">
          Login
        </Link>
        <span>&nbsp;or&nbsp;</span>
        <Link style={{ color: 'white' }} to="/sign-up/">
          Sign Up
        </Link>
      </div>
    )
  }
  return null
}

interface HeaderProps {
  title: string
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const firebaseContext = useContext(FirebaseContext)

  return (
    <StyledHeader>
      <HeaderInner>
        <HomepageLink to="/">{title}</HomepageLink>
        <NavAction isLoggedIn={firebaseContext.isLoggedIn} />
      </HeaderInner>
    </StyledHeader>
  )
}

export default Header
