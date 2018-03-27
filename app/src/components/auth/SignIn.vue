<template>
  <section class="hero is-success is-fullheight">
    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="column is-4 is-offset-4">
          <h3 class="title has-text-grey">Please login</h3>

          <div class="box">
            <figure class="avatar">
              <img src="https://placehold.it/128x128"/>
            </figure>

            <form>
              <div class="notification is-danger" v-if="error">
                {{ this.error }}
              </div>

              <div class="field">
                <div class="control">
                  <input v-model="username" class="input is-large" type="text" placeholder="username" autofocus=""/>
                </div>
              </div>

              <div class="field">
                <div class="control">
                  <input v-model="password" class="input is-large" type="password" placeholder="password"/>
                </div>
              </div>

              <button :disabled="!username || !password" v-on:click="signIn" class="button is-block is-info is-large is-fullwidth">Login</button>
            </form>
          </div>

          <p class="has-text-grey">
            <a v-on:click="signUp">Sign Up</a> &nbsp;|&nbsp;
            <a v-on:click="forgotPassword">Forgot Password</a>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { Auth, Logger } from 'aws-amplify'
import Store from '@/store'

const logger = new Logger('Auth.SignIn')

export default {
  name: 'AuthSignIn',

  data () {
    return {
      username: '',
      password: '',
      error: ''
    }
  },

  methods: {
    signIn: function (evt) {
      this.setError('')
      Auth.signIn(this.username, this.password)
        .then(user => {
          logger.debug('Sign-in success', user)
          Store.dispatch('login', user)
          // ignoring MFA for now
          this.$router.push('/')
        })
        .catch(error => {
          this.setError(error)
        })
    },

    forgotPassword: function () {
      this.$router.push('/auth/forgotpassword')
    },

    signUp: function () {
      this.$router.push('/auth/signup')
    },

    setError: function (error) {
      this.error = error.message || error
    }
  }
}
</script>
