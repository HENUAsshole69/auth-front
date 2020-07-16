<template>
  <v-app>
    <router-view></router-view>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import AxiosInstance from "./client/AxiosInstance";
import {UserClient} from "@/client/UserClient";


export default Vue.extend({
  name: 'App',

  components: {
  },
  async mounted() {
    if(localStorage.getItem('token') !== null){
      AxiosInstance.defaults.headers.common['x-api-key'] = localStorage.getItem('token')
      this.$store.commit('login',localStorage.getItem('token'))
      this.$store.commit('loadUser',await UserClient.getUser())
    }
  },
  data: () => ({
    //
  }),
});
</script>
