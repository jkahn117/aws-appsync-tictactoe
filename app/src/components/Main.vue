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

              <p class="title is-3">My Games</p>

              <b-tabs v-model="activeTab" type="is-boxed">
                <b-tab-item>
                  <template slot="header">
                    <span>In Progress <b-tag rounded>{{ this.activeCount }}</b-tag></span>
                  </template>
                  <in-progress-games />
                </b-tab-item>
                <b-tab-item>
                  <template slot="header">
                    <span>Invited <b-tag rounded>{{ this.inviteCount }}</b-tag></span>
                  </template>
                  <invited-games />
                </b-tab-item>
                <b-tab-item>
                  <template slot="header">
                    <span>Completed <b-tag rounded>{{ this.completeCount }}</b-tag></span>
                  </template>
                  <completed-games />
                </b-tab-item>
              </b-tabs>
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
