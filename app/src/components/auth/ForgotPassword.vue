<template>
  <section class="hero is-success is-fullheight">
    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="column is-4 is-offset-4">
          <h3 class="title has-text-grey">Forgot password</h3>

          <div class="box">
            <form>
              <div class="notification is-danger" v-if="error">
                {{ this.error }}
              </div>

              <div class="field">
                <div class="control">
                  <input v-model="username" class="input is-large" type="text" placeholder="username" :disabled="sentCode" autofocus=""/>
                </div>
              </div>

              <div class="field" v-if="sentCode">
                <div class="control">
                  <input v-model="code" class="input is-large" type="text" placeholder="code"/>
                </div>
              </div>

              <div class="field" v-if="sentCode">
                <div class="control">
                  <input v-model="password" class="input is-large" type="password" placeholder="new password"/>
                </div>
              </div>

              <button :disabled="!username" v-if="!sentCode" v-on:click="sendCode" class="button is-block is-info is-large is-fullwidth">
                Send Reset Code
              </button>

              <button :disabled="!username || !password || !code" v-if="sentCode" v-on:click="resetPassword" class="button is-block is-info is-large is-fullwidth">
                Reset Password
              </button>
            </form>
          </div>

          <p class="has-text-grey">
            <a href="#">Need Help?</a>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { Auth, Logger } from 'aws-amplify'

const logger = new Logger('Auth.ForgotPassword')

export default {
  name: 'AuthForgotPassword',

  data () {
    return {
      username: '',
      password: '',
      code: '',
      error: '',
      sentCode: false
    }
  },

  methods: {
    sendCode: function (evt) {
      this.setError('')
      Auth.forgotPassword(this.username)
        .then(data => {
          logger.debug(data)
          this.sentCode = true
        })
        .catch(error => this.setError(error))
    },

    resetPassword: function (evt) {
      this.setError('')
      Auth.forgotPasswordSubmit(this.username, this.code, this.password)
        .then(data => {
          this.$router.push('/')
        })
        .catch(error => this.setError(error))
    },

    setError: function (error) {
      this.error = error.message || error
    }
  }
}
</script>
