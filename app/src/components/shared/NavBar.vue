<template>
  <nav class="navbar is-light main">
    <div class="container">
      <div class="navbar-brand">
        <router-link to="/" class="navbar-item">
          <b-icon icon="trophy" size="is-medium"></b-icon>
          <span>AWS AppSync TicTacToe</span>
        </router-link>

        <div class="navbar-burger burger">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div class="navbar-menu" v-if="isLoggedIn">
        <div class="navbar-end">
          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link">
              <b-icon icon="user-circle" size="is-small"></b-icon>
              <span>{{ currentUser.username }}</span>
            </a>

            <div class="navbar-dropdown">
              <a class="navbar-item" v-on:click="signOut">Sign Out</a>
            </div>
          </div>
        </div>
      </div>

    </div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'
import { Auth, Logger } from 'aws-amplify'
import Store from '@/store'

const logger = new Logger('Shared.NavBar')

export default {
  name: 'nav-bar',

  computed: {
    ...mapGetters([
      'currentUser',
      'isLoggedIn'
    ])
  },

  methods: {
    signOut: function () {
      Auth.signOut()
        .then(() => {
          Store.dispatch('logout')
          this.$router.push('/auth/signin')
        })
        .catch(error => {
          logger.error(error)
          this.$router.push('/')
        })
    }
  },

  mounted () {
    let $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0)

    // Check if there are any nav burgers
    if ($navbarBurgers.length > 0) {
      // Add a click event on each of them
      $navbarBurgers.forEach(($el) => {
        $el.addEventListener('click', () => {
          // Get the target from the "data-target" attribute
          var target = $el.dataset.target
          var $target = document.getElementById(target)
          // Toggle the class on both the "navbar-burger" and the "navbar-menu"
          $el.classList.toggle('is-active')
          $target.classList.toggle('is-active')
        })
      })
    }
  }
}
</script>

<style>
  span.icon {
    margin-right: 0.5rem;
  }

  nav.main {
    border-top: 0.3rem solid #8c67ef;
  }
</style>
