import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'

import AuthGuard from './auth-guard'

// ---- Components
import * as Components from '@/components'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: Main
    },
    // auth routes
    {
      path: '/auth',
      name: 'auth',
      component: Components.AuthLayout,
      meta: { skipAuth: true },
      children: [
        {
          path: 'signin',
          name: 'AuthSignIn',
          component: Components.AuthSignIn
        },
        {
          path: 'signup',
          name: 'AuthSignUp',
          component: Components.AuthSignUp
        },
        {
          path: 'confirmSignUp',
          name: 'AuthConfirmSignUp',
          component: Components.AuthConfirmSignup
        },
        {
          path: 'signout',
          name: 'AuthSignOut',
          component: Components.AuthSignOut
        },
        {
          path: 'forgotpassword',
          name: 'AuthForgotPassword',
          component: Components.AuthForgotPassword
        }
      ]
    }
  ]
})

router.beforeEach(AuthGuard)

export default router
