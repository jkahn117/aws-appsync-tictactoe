<template>
  <div></div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import moment from 'moment'

export default {
  props: [ 'games' ],

  computed: {
    ...mapGetters({
      username: 'currentUsername'
    })
  },

  filters: {
    since: function (timestamp) {
      return moment(timestamp, 'X').fromNow()
    }
  },

  methods: {
    ...mapActions([
      'setCurrentGame'
    ]),

    getTimestamp: function () {
      return moment().format('X')
    }
  }
}
</script>
