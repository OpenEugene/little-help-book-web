<template>
  <!-- Can probably use v-show to toggle the desktop and mobile versions -->
  <div class="desktop-header">
    <router-link v-bind:to="{ name: 'Home' }" class="homepage-link">
      <img class="desktop-logo" src="@/assets/white-bird-on-black.png" alt="White Bird Clinic" />
      <h1 class="little-help-book">Little Help Book</h1>
    </router-link>
    <nav-bar />
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import dal from '..\..\..\src\dal.js';

export default {
  name: 'desktop-header',
  components: {
    NavBar
  }
};
</script>

<style>
.desktop-header {
  display: flex;
  justify-content: space-around;
  color: #f5f5f5;
  font-size: 1.5rem;
  font-weight: bold;
  background-color: black;
  height: 6.6rem;
  overflow-x: hidden;
  margin: 0 -0.5rem;
  overflow-y: hidden;
  margin-top: -1rem;
  margin-bottom: 2.25rem;
}

.desktop-logo {
  position: absolute;
  left: 0.5rem;
  width: 66px;
  height: 66px;
  margin: 1.6rem 0 0.4rem 1.25rem;
}

.little-help-book {
  position: absolute;
  left: 1.7rem;
  font-size: 2.2rem;
  white-space: nowrap;
  margin: 2.4rem 0 0 5.8rem;
  color: white;
}
</style>