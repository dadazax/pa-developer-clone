<template>
  <v-snackbar
    v-model="snackbar.show"
    :color="snackbar.color"
    :timeout="snackbar.timeout"
    top
    right
  >
    {{ snackbar.message }}
    <template v-slot:action="{ attrs }">
      <v-btn
        text
        v-bind="attrs"
        @click="hideSnackbar"
      >
        关闭
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'Snackbar',
  computed: {
    ...mapState(['snackbar'])
  },
  methods: {
    ...mapMutations(['HIDE_SNACKBAR']),

    hideSnackbar() {
      this.HIDE_SNACKBAR()
    }
  }
}
</script>
