/* eslint-disable @typescript-eslint/camelcase */
import React, { ChangeEvent, FormEvent, useState, useContext, useEffect } from 'react'

import firebase from 'firebase'
import { navigate } from 'gatsby'
import { loadStripe } from '@stripe/stripe-js'
import styled from '@emotion/styled'
import moment from 'moment'
import Page from '../components/Page'
import Container from '../components/Container'
import Button from '../components/Button'
import IndexLayout from '../layouts'
import { FirebaseContext, isBrowser } from '../../FirebaseProvider'

const MembershipBox = styled.div`
  // border: 1px solid gray;
  // border-radius: 5px;
  padding: 15px;
`

const Separator = styled.div`
  border-top: 1px solid #cbd2d6;
  position: relative;
  margin: 10px 0 10px;
  text-align: center;
`

function AccountPage() {
  const firebaseContext = useContext(FirebaseContext)
  const { uid, subscription } = firebaseContext
  const [isLoading, setIsLoading] = useState(false)
  const [db, setDb] = useState(null)

  useEffect(() => {
    if (window) {
      setDb(firebase.firestore())
    }
  })

  useEffect(() => {
    setIsLoading(false)
  }, [subscription.cancel_at_period_end])

  if (uid === null) {
    navigate('../login')
  }

  console.log('subscription', subscription)
  console.log('uid', uid)

  const toggleCanceledRef = isBrowser() && firebase.functions().httpsCallable('toggleCanceled')
  async function toggleCanceled(subscriptionId: string, cancel_at_period_end: boolean) {
    setIsLoading(true)
    try {
      await toggleCanceledRef({ subscriptionId, cancel_at_period_end })
    } catch (error) {
      console.error(error)
    } finally {
      // window.location.reload()
      // setTimeout(() => {
      //   // window.location.reload()
      //   // setIsLoading(false)
      // }, 3000)
    }
  }

  async function sendToCheckout() {
    setIsLoading(true)

    const docRef = await db
      .collection('users')
      .doc(uid)
      .collection('checkout_sessions')
      .add({
        price: 'price_1HbcmfDsZ6um2x2w2Wmeidhd',
        success_url: window.location.origin,
        cancel_url: window.location.origin
      })
    // Wait for the CheckoutSession to get attached by the extension
    docRef.onSnapshot(async snap => {
      const error = snap.data()?.error
      const sessionId = snap.data()?.sessionId
      if (error) {
        // Show an error to your customer and
        // inspect your Cloud Function logs in the Firebase console.
        alert(`An error occured: ${error.message}`)
        setIsLoading(false)
      }
      if (sessionId) {
        // We have a session, let's redirect to Checkout
        // Init Stripe
        const stripe = await loadStripe(
          'pk_test_51HaSmoDsZ6um2x2wqMwFyDsQv5VIrgZeSBn8qvDvgVLG1Uzz6uK78KfBQDxcvx6z7MN3CDvm1RphRNktRifIEgQE00lcVlgV71'
        )
        stripe!.redirectToCheckout({ sessionId })
      }
    })
  }

  interface SubBoxProps {
    currentSubscription: TrusteeSubscription | 'unset'
    // endingDate?: Date | undefined | string
  }

  function SubscriptionBox({ currentSubscription }: SubBoxProps) {
    if (!currentSubscription) {
      return (
        <MembershipBox>
          <Button isLoading={isLoading} type="button" onClick={sendToCheckout}>
            Subscribe
          </Button>
          <p>No Subscription to show</p>
        </MembershipBox>
      )
    }
    if (currentSubscription === 'unset') {
      return <span>loading... </span>
    }
    if (currentSubscription.status === 'active') {
      const { stripeLink } = currentSubscription
      const pos = stripeLink.search('sub_')
      const subscriptionId = stripeLink.slice(pos, stripeLink.length)
      console.log('subscription Id: ', subscriptionId)
      if (currentSubscription.cancel_at_period_end) {
        return (
          <MembershipBox>
            <div>
              <div className="font-weight-bold">
                <span>Standard Subscription: $13.99/mo. (set to expire)</span>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <span>Subscription Ending On: {moment(currentSubscription.current_period_end?.toDate()).format('MMM Do, YYYY')}</span>
                <Button
                  isLoading={isLoading}
                  type="button"
                  onClick={() => toggleCanceled(subscriptionId, subscription.cancel_at_period_end)}
                >
                  Resume
                </Button>
              </div>
            </div>
          </MembershipBox>
        )
      }
      return (
        <MembershipBox>
          <div>
            <div className="font-weight-bold">
              <span>Standard Subscription: $13.99/mo.</span>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <span>Next billing date: {moment(currentSubscription.current_period_end?.toDate()).format('MMM Do, YYYY')}</span>
              <Button isLoading={isLoading} type="button" onClick={() => toggleCanceled(subscriptionId, subscription.cancel_at_period_end)}>
                Cancel
              </Button>
            </div>
          </div>
        </MembershipBox>
      )
    }
    if (currentSubscription.status === 'canceled') {
      return (
        <MembershipBox>
          <div>
            <div className="font-weight-bold">
              <span>Standard Subscription: $13.99/mo. (canceled)</span>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <span>Canceled On: {moment(currentSubscription.canceled_at?.toDate()).format('MMM Do, YYYY')}</span>
              <button type="button" onClick={sendToCheckout} className="btn btn-link">
                Renew
              </button>
            </div>
          </div>
        </MembershipBox>
      )
    }
    return <span>there was an error</span>
  }

  return (
    <IndexLayout>
      <Page>
        <Container>
          <h6>Membership</h6>
          <Separator />
          <SubscriptionBox currentSubscription={subscription} />
        </Container>
        <Container>
          <h6>Legal Review</h6>
          <Separator />
          <p className="font-weight-bold">What should go here?</p>
          <ul>
            <li>What price?</li>
            <li>Should I just send an email to aaron@elderlawok.com containing their report?</li>
            <li>How will you notify that their trustee data is valid? Just an email?</li>
            <li>Should we list their past Legal Review purchases here?</li>
          </ul>
        </Container>
      </Page>
    </IndexLayout>
  )
}

export default AccountPage
