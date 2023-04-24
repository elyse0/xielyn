<template>
  <div class="app-navbar">
    <div class="logo">
      <router-link to="/">
        <img
          src="https://xielyng.s3.fr-par.scw.cloud/logo.png"
          alt="Sophire logo"
          width="50"
        >
      </router-link>
    </div>
    <div class="links">
      <o-button
        tag="router-link"
        :to="{path: '/chinese/verbs'}"
      >
        Chinese Verbs
      </o-button>
      <o-button
        tag="router-link"
        :to="{path: '/chinese/videos'}"
      >
        Chinese Videos
      </o-button>
      <o-button
        tag="router-link"
        :to="{path: '/chinese/vocabulary'}"
      >
        Chinese Vocabulary
      </o-button>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
div.app-navbar {
  display: flex;
  vertical-align: center;
  margin: 0 0 10px 0;
}

div.logo {
  margin: 0 20px 0 10px;
}

div.links {
  display: flex;
  align-items: center;
}

a.button {
  background-color: transparent;
  border-color: dimgray;
  color: white;
  font-weight: bold;
  margin: 0 5px;
}
</style>
