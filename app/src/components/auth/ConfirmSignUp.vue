<template>
  <section class="hero is-success is-fullheight">
    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="column is-4 is-offset-4">
          <h3 class="title has-text-grey">Confirm Sign Up</h3>

          <div class="box">
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
                  <input v-model="code" class="input is-large" type="text" placeholder="code"/>
                </div>
              </div>

              <button :disabled="!username || !code" v-on:click="confirm" class="button is-block is-info is-large is-fullwidth">Confirm</button>
            </form>
          </div>

          <p class="has-text-grey">
            <a v-on:click="resend">Resend Code</a> &nbsp;|&nbsp;
            <a href="#">Need Help?</a>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { Auth, Logger } from 'aws-amplify'

const logger = new Logger('Auth.ConfirmSignUp')

export default {
  name: 'AuthSignUp',

  data () {
    return {
      username: '',
      code: '',
      error: ''
    }
  },

  methods: {
    confirm: function (evt) {
      this.setError('')
      Auth.confirmSignUp(this.username, this.code)
        .then(() => this.$router.push('/'))
        .catch((error) => this.setError(error))
    },

    resend: function () {
      Auth.resendSignUp(this.username)
        .then(() => logger.debug('Confirmation code resent'))
        .catch((error) => this.setError(error))
    },

    setError: function (error) {
      this.error = error.message || error
    }
  }
}
</script>
