<template>
  <section class="hero is-success is-fullheight">
    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="column is-4 is-offset-4">
          <h3 class="title has-text-grey">Sign Up</h3>

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
                  <input v-model="email" class="input is-large" type="text" placeholder="email" autofocus=""/>
                </div>
              </div>

              <div class="field">
                <div class="control">
                  <input v-model="username" class="input is-large" type="text" placeholder="username"/>
                </div>
              </div>

              <div class="field">
                <div class="control">
                  <input v-model="password" class="input is-large" type="password" placeholder="password"/>
                </div>
              </div>

              <button :disabled="!username || !password || !email" v-on:click="signUp" class="button is-block is-info is-large is-fullwidth">Sign Up</button>
            </form>
          </div>

          <p class="has-text-grey">
            <a v-on:click="signIn">Sign In</a> &nbsp;|&nbsp;
            <a href="#">Need Help?</a>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { Auth, Logger } from 'aws-amplify'

const logger = new Logger('Auth.SignUp')

export default {
  name: 'AuthSignUp',

  data () {
    return {
      username: '',
      password: '',
      email: '',
      error: ''
    }
  },

  methods: {
    signUp: function (evt) {
      this.setError('')
      Auth.signUp(this.username, this.password, this.email, null)
        .then(result => {
          logger.debug('Sign up successful', result)
          this.$router.push('/auth/confirmSignup')
        })
        .catch(error => this.setError(error))
    },

    signIn: function () {
      this.$router.push('/auth/signin')
    },

    setError: function (error) {
      this.error = error.message || error
    }
  }
}
</script>
