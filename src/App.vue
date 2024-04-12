<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </nav>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  width: 100%;
  padding: 1rem;
  border-bottom: 1px solid var(--color-border);
}

nav {
  display: flex;
  gap: 1rem;
}
</style>
