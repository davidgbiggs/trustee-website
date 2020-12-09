/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { ChangeEvent, FormEvent, useState } from 'react'

import firebase from 'firebase'
import { navigate } from 'gatsby'
import styled from '@emotion/styled'
import Page from '../components/Page'
import Container from '../components/Container'
import BoxForm from '../components/BoxForm'
import Button from '../components/Button'
import IndexLayout from '../layouts'

const SignUpForm = styled(BoxForm)`
  margin-top: 50px;
`

function SignUpPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errorText, setErrorText] = useState('none')
  const [isLoading, setIsLoading] = useState(false)

  function handleEmailChange(event: ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value)
  }

  function handlePasswordChange(event: ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value)
  }

  function handleConfirmPasswordChange(event: ChangeEvent<HTMLInputElement>) {
    setConfirmPassword(event.target.value)
  }

  function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
    if (password !== confirmPassword) {
      setErrorText("Looks like your passwords don't match. Please double-check and try again.")
    } else {
      setIsLoading(true)
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          navigate('/')
        })
        .catch(function(error) {
          setErrorText(error.code)
        })
        .finally(() => {
          setIsLoading(false)
        })
    }
    event.preventDefault()
  }

  return (
    <>
      <IndexLayout>
        <Page>
          <Container>
            <SignUpForm errorText={errorText} onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input
                  disabled={isLoading}
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  className="form-control"
                  id="email"
                  aria-describedby="emailHelp"
                />
                <small id="emailHelp" className="form-text text-muted">
                  We'll never share your email with anyone else.
                </small>
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  disabled={isLoading}
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  className="form-control"
                  id="password"
                />
              </div>
              <div className="form-group">
                <label htmlFor="confirm-password">Confirm Password</label>
                <input
                  disabled={isLoading}
                  type="password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  className="form-control"
                  id="confirm-password"
                />
              </div>
              {/* <div className="form-group form-check">
                <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                <label className="form-check-label" htmlFor="exampleCheck1">
                  Check me out
                </label>
              </div> */}
              <Button isLoading={isLoading} type="submit" block>
                Sign Up
              </Button>
            </SignUpForm>
          </Container>
        </Page>
      </IndexLayout>
    </>
  )
}

export default SignUpPage
