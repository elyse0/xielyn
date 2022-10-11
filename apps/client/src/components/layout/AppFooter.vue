<template>
  <div class="app-footer">
    <div class="badge">
      <div class="badge-header">
        <img
          src="https://xielyng.s3.fr-par.scw.cloud/logo.png"
          alt="Xielyng logo"
          width="40"
        >
        Xielyng
      </div>

      <p>Xielyng's source code is licensed under MIT.</p>
    </div>
    <div class="links">
      <ul>
        <li>
          <a
            href="https://github.com/elyse0/xielyng"
            target="_blank"
          >Github repository</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
div.app-footer {
  display: flex;
  margin: 50px 50px 40px 50px;
  padding: 20px;
  border-top: 1px solid gray;
}

div.badge {
  min-width: 200px;
}

div.badge-header {
  filter: grayscale(1);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 5px;
}

div.links {
  margin-left: 100px;
}

li > a {
  color: #00b3ff;
}

li > a:hover {
  text-decoration: underline;
}
</style>
