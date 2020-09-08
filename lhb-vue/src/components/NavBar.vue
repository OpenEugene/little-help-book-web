<template>
  <div class="nav-bar">
    <div class="lane-county menu-icon">Lane County, Oregon</div>
    <breadcrumb-box class="breadcrumb-box" />
    <button
      class="spanish menu-button menu-icon"
      v-on:click.prevent="toggleLanguage"
      v-if="!$store.state.inSpanish"
    >Español</button>
    <button
      class="spanish menu-button menu-icon"
      v-on:click.prevent="toggleLanguage"
      v-if="$store.state.inSpanish"
    >English</button>
  </div>
</template>

<script>
import BreadcrumbBox from "@/components/BreadcrumbBox.vue";

export default {
  name: "nav-bar",
  components: {
    BreadcrumbBox,
  },
  methods: {
    toggleLanguage() {
      this.$store.commit("TOGGLE_LANGUAGE", !this.$store.state.inSpanish);
    },
  },
};
</script>

<style>
.nav-bar {
  display: flex;
}

.lane-county {
  color: rgb(226, 226, 226);
  margin: 3.2rem 0.5rem 0 30rem;
  white-space: nowrap;
}

.spanish:hover {
  color: white;
}

.menu-button {
  font-family: sans-serif;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: bold;
  color: rgb(226, 226, 226);
  background-color: black;
  border-radius: 8px;
  border-style: solid;
  border: none;
  white-space: nowrap;
  transition: 0.3s color ease-in-out;
  margin: 2.8rem 0.5rem 1.5rem 0;
}

@media screen and (max-width: 1175px) {
  .menu-icon {
    display: none;
  }
}
</style>