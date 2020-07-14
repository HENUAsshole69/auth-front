<template>
  <v-app>
    <router-view></router-view>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import AxiosInstance from "./client/AxiosInstance";


export default Vue.extend({
  name: 'App',

  components: {
  },
  mounted() {
    if(localStorage.getItem('token') !== null){
      AxiosInstance.defaults.headers.common['x-api-key'] = localStorage.getItem('token')
        this.$store.commit('login',localStorage.getItem('token'))
    }
  },
  data: () => ({
    //
  }),
});
</script>
