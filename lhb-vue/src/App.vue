<template>
  <div id="app">
    <desktop-header class="container"/>
    <router-view/>
  </div>
</template>

<script>
import DesktopHeader from '@/components/DesktopHeader.vue'
import dalService from '..\..\..\src\dal.js'

export default {
  components: {
    DesktopHeader
  },
  created() {
    // Run when page loads
    dalService.dalGetCityTable().then((response) => this.$store.commit("SET_CITIES", response.data)).catch((err) => console.log(err + ": No city data available."));
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
