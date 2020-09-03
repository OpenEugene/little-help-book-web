<template>
  <!-- Can probably use v-show to toggle the desktop and mobile versions -->
  <div class="desktop-header">
    <router-link v-bind:to="{ name: 'Home' }">
      <img class="desktop-logo" src="@/assets/white-bird-on-black.png" alt="White Bird Clinic" />
      <h1 class="little-help-book">Little Help Book</h1>
    </router-link>
    <nav class="nav-bar">
      <!-- Is the active city supposed to display, with Eugene as default? -->
      <!-- Is cityMenu() in the template homepage.js meant as a filter toggle for all locations in that city? -->
      <!-- Wonder if it's possible to add an inSpanish boolean or something to each component to toggle language? -->
      <router-link v-bind:to="{ name: 'About' }">
        <h2 class="about menu-button">About</h2>
      </router-link>
    </nav>
  </div>
</template>

<script>
export default {
  name: "desktop=header",
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

.menu-button {
  font-family: sans-serif;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: bold;
  color: rgb(226, 226, 226);
  background-color: black;
  border-radius: 8px;
  border-style: solid;
  border: none;
  white-space: nowrap;
  transition: 0.3s color ease-in-out;
  margin: 2.6rem 0.5rem 1.5rem 0;
}
</style>