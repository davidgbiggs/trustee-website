/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it
import 'firebase/auth'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'

import FirebaseProvider from './FirebaseProvider'

export const wrapRootElement = FirebaseProvider

// eslint-disable-next-line react/prop-types
// export default ({ element }) => <FirebaseProvider>{element}</FirebaseProvider>
