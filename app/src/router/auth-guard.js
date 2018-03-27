// Navigation Guards
// @see https://router.vuejs.org/en/advanced/navigation-guards.html

import { Auth, Logger } from 'aws-amplify'
import Store from '../store'

const logger = new Logger('AuthGuard')

const AuthGuard = (to, from, next) => {
  logger.debug(`[AuthGuard] Routing from ${from.name} to ${to.name}`)

  if (to.matched.some(record => record.meta.skipAuth)) {
    next()
    return
  }

  Auth.currentAuthenticatedUser()
    .then(user => {
      Store.dispatch('login', user)
      Auth.currentCredentials()
        .then(credentials => {
          Store.dispatch('setCurrentUserId', credentials.identityId)
        })
        .catch(error => logger.debug('[ERROR] Could not retrieve current credentials ', error))
      next()
    })
    .catch(error => {
      logger.error(error)
      Store.dispatch('logout')
      if (!to.name.startsWith('auth')) {
        next('/auth/signin')
      } else {
        next()
      }
    })
}

export default AuthGuard
