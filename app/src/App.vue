<template>
  <div id="app">
    <router-view v-if="isHydrated"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Store from './store'

export default {
  name: 'App',

  computed: {
    ...mapGetters([
      'isHydrated'
    ])
  },

  // we want to wait for the appsync client to hydrate...
  async mounted () {
    await this.$apollo.provider.defaultClient.hydrated()
    Store.commit('APPSYNC_HYDRATED')
  }
}
</script>
