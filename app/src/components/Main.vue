<template>
  <div>
    <nav-bar/>

    <section class="section">
      <div class="tile is-ancestor">
        <div class="tile is-5 is-vertical is-parent">
          <div class="tile is-child box">
            <in-progress-games/>
          </div>
          <div class="tile is-child box">
            <b-tabs v-model="activeTab">
              <b-tab-item label="Invited">
                <invited-games/>
              </b-tab-item>
              <b-tab-item label="Completed">
                <completed-games/>
              </b-tab-item>
            </b-tabs>
          </div>
        </div>
        <div class="tile is-parent">
          <div class="tile is-child box">
            <game/>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script>
import Vue from 'vue'
import NavBar from './shared/NavBar'

Vue.component('nav-bar', NavBar)

export default {
  name: 'Main',

  data () {
    return {
      activeTab: 0
    }
  }
}
</script>
