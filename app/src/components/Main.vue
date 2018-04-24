<template>
  <div>
    <nav-bar/>

    <section class="section">
      <div class="container">
        <div class="columns">
          <div class="column is-half">
            <div class="box">
              <div class="block is-pulled-right">
                <a class="button is-info" v-on:click="showModal = true">New Game</a>
              </div>

              <game-menu />
            </div>
          </div>

          <div class="column">
            <div class="box">
              <game/>
            </div>
          </div>
        </div>
      </div>
    </section>

    <b-modal has-modal-card :active.sync="showModal">
      <new-game-modal />
    </b-modal>
  </div>
</template>

<script>
import Vue from 'vue'
import NavBar from './shared/NavBar'
import { mapGetters } from 'vuex'

Vue.component('nav-bar', NavBar)

export default {
  name: 'Main',

  data () {
    return {
      activeTab: 0,
      showModal: false
    }
  },

  computed: {
    ...mapGetters([
      'activeCount',
      'inviteCount',
      'completeCount'
    ])
  }
}
</script>

<style scoped>
.box {
  min-height: 500px;
}

section.tab-content {
  padding: 1rem 0;
}
</style>
