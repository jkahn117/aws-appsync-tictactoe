import Vue from 'vue'

import AuthLayout from './AuthLayout'
import AuthSignIn from './SignIn'
import AuthSignOut from './SignOut'
import AuthSignUp from './SignUp'
import AuthConfirmSignup from './ConfirmSignUp'
import AuthForgotPassword from './ForgotPassword'

Vue.component('tictactoe-auth-view', AuthLayout)
Vue.component('tictactoe-sign-in', AuthSignIn)
Vue.component('tictactoe-sign-out', AuthSignOut)
Vue.component('tictactoe-sign-up', AuthSignUp)
Vue.component('tictactoe-confirm-sign-up', AuthConfirmSignup)
Vue.component('tictactoe-forgot-password', AuthForgotPassword)

export {
  AuthLayout,
  AuthSignIn,
  AuthSignOut,
  AuthSignUp,
  AuthConfirmSignup,
  AuthForgotPassword
}
