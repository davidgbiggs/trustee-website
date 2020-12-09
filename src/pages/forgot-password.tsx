/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { ChangeEvent, FormEvent, useState } from 'react'

// import firebase from 'firebase'
import { navigate, Link } from 'gatsby'
import styled from '@emotion/styled'
import Page from '../components/Page'
import Container from '../components/Container'
import BoxForm from '../components/BoxForm'
import IndexLayout from '../layouts/index'
import StyleLayout from '../layouts/style-layout'

function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [errorText, setErrorText] = useState('none')

  function handleEmailChange(event: ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value)
  }

  function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)
    // firebase
    //   .auth()
    //   .sendPasswordResetEmail(email)
    //   .then(() => {
    //     console.log('signed in')
    //     navigate('/account/')
    //   })
    //   .catch(function(error) {
    //     // Handle Errors here.
    //     switch (error.code) {
    //       case 'auth/user-not-found':
    //         setErrorText(`We couldn't find any records for that user. Did you type your email correctly?`)
    //         break
    //       case 'auth/wrong-password':
    //         setErrorText('There was an error signing in. Please double check your password.')
    //         break
    //       default:
    //         setErrorText('There was an unknown error signing in.')
    //     }
    //   })
    //   .finally(() => setIsLoading(false))
  }

  const WhiteSpaceDiv = styled.div`
    padding-bottom: 50px;
  `

  const HeadingContainer = styled.div`
    text-align: center;
  `

  const ResetHeading = styled.p`
    font-size: 25px;
    font-weight: bold;
  `

  const BeforeButtonChildren: React.FC = () => {
    return (
      <>
        <HeadingContainer>
          <ResetHeading>Please enter your email address</ResetHeading>
        </HeadingContainer>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email</label>
          <input
            disabled={isLoading}
            type="email"
            onChange={handleEmailChange}
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </div>
      </>
    )
  }

  return (
    <IndexLayout>
      <StyleLayout>
        <Page>
          <Container>
            {/* <input value={email} onChange={handleEmailChange} />
          <input value={password} onChange={handlePasswordChange} />
          <button type="button">hi</button> */}
            <WhiteSpaceDiv>&nbsp;</WhiteSpaceDiv>
            <BoxForm
              buttonText="Reset Password"
              onSubmit={handleFormSubmit}
              errorText={errorText}
              beforeButtonChildren={BeforeButtonChildren}
              isLoading={isLoading}
            />
          </Container>
        </Page>
      </StyleLayout>
    </IndexLayout>
  )
}

export default ForgotPasswordPage
