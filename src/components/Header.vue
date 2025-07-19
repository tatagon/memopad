<template>
  <header>
    <h1>
      <RouterLink to="/">Memopad</RouterLink>
    </h1>
  </header>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>

<style lang="scss" scoped>
@use '@/assets/base.scss' as *;

header {
  line-height: 1.5;
  max-height: 100vh;

  nav {
    width: 100%;
    margin-top: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 2em;

    a {
      display: inline-block;
      border-left: solid 1px var(--color-border);

      &.router-link-exact-active {
        color: var(--color-text);
      }

      &.router-link-exact-active:hover {
        background-color: transparent;
      }

      &:first-of-type {
        border: none;
      }
    }
  }
}
</style>
