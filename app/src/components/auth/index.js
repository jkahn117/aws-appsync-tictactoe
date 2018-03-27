import Vue from 'vue'

import AuthLayout from './AuthLayout'
import AuthSignIn from './SignIn'
import AuthSignOut from './SignOut'
import AuthSignUp from './SignUp'
import AuthConfirmSignup from './ConfirmSignUp'
import AuthForgotPassword from './ForgotPassword'

Vue.component('pet-store-auth-view', AuthLayout)
Vue.component('pet-store-sign-in', AuthSignIn)
Vue.component('pet-store-sign-out', AuthSignOut)
Vue.component('pet-store-sign-up', AuthSignUp)
Vue.component('pet-store-confirm-sign-up', AuthConfirmSignup)
Vue.component('pet-store-forgot-password', AuthForgotPassword)

export {
  AuthLayout,
  AuthSignIn,
  AuthSignOut,
  AuthSignUp,
  AuthConfirmSignup,
  AuthForgotPassword
}
