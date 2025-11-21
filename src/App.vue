<template>
  <v-app id="app" :windowsizename="windowSizeName">
    <v-overlay :value="overlay" z-index="999">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>

    <router-view></router-view>

    <Dialog />
    <Snackbar />
  </v-app>
</template>

<script>
import { mapState } from 'vuex'
import Dialog from '@/components/Dialog.vue'
import Snackbar from '@/components/Snackbar.vue'

export default {
  name: 'App',
  components: {
    Dialog,
    Snackbar
  },
  computed: {
    ...mapState(['overlay'])
  }
}
</script>

<style>
html {
  overflow-y: auto !important;
}

.v-application {
  font-family: 'Roboto', sans-serif !important;
}

.v-application a {
  text-decoration: none;
}
</style>
