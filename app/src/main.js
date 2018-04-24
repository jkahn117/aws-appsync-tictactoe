// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

// for our UI
import Buefy from 'buefy'
import 'buefy/lib/buefy.css'
import 'font-awesome/css/font-awesome.min.css'
import './assets/app.css'

// AWS AppSync configuration
import AWSAppSyncClient from 'aws-appsync'
import AWSAppSyncConfig from './appsync'
import VueApollo from 'vue-apollo'

// AWS Amplify
import Amplify, { Auth, Logger } from 'aws-amplify'
import AWSExports from './aws-exports'

// configure AWS Amplify
Amplify.configure(AWSExports)
Amplify.Logger.LOG_LEVEL = 'DEBUG'
const logger = new Logger('main')

Auth.currentUserInfo()
  .then(user => logger.debug(user))
  .catch(error => logger.debug(error))

// configure AWS AppSync client
const appSyncClient = new AWSAppSyncClient({
  url: AWSAppSyncConfig.graphqlEndpoint,
  region: AWSAppSyncConfig.region,
  auth: {
    type: AWSAppSyncConfig.authenticationType,
    // apiKey: AWSAppSyncConfig.apiKey,
    // changed getAccessToken to getIdToken per issue with username not being filled
    jwtToken: async () => (await Auth.currentSession()).getAccessToken().getJwtToken()
  }
}, {
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network'
    }
  }
})

const appSyncProvider = new VueApollo({
  defaultClient: appSyncClient
})

Vue.config.productionTip = false
Vue.use(Buefy, { defaultIconPack: 'fa' })
Vue.use(VueApollo)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  provide: appSyncProvider.provide(),
  template: '<App/>'
})
