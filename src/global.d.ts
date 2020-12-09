import firebase from 'firebase'

declare interface TrusteeSubscription {
  cancel_at: null | firebase.firestore.Timestamp
  cancel_at_period_end: boolean
  canceled_at: null | firebase.firestore.Timestamp
  created: firebase.firestore.Timestamp
  current_period_end: firebase.firestore.Timestamp
  current_period_start: firebase.firestore.Timestamp
  ended_at: null | firebase.firestore.Timestamp
  metadata: object
  price: firebase.firestore.DocumentReference
  prices: Array<firebase.firestore.DocumentReference>
  product: firebase.firestore.DocumentReference
  quantity: number
  role: string
  status: string
  stripeLink: string
  trial_end: null | firebase.firestore.Timestamp
  trial_start: null | firebase.firestore.Timestamp
}

declare module '*.scss' {
  const content: { [className: string]: string }
  export = content
}
