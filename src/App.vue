<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
    <header>
      <nav>
        <RouterLink to="/sellers" exact-active-class="active">Vendedores</RouterLink>
        <RouterLink to="/sales" exact-active-class="active">Vendas</RouterLink>
      </nav>
    </header>

    <main>
      <RouterView />
    </main>
</template>

<style>
:root {
  --color-bg: #121212;
  --color-text: #eee;
  --color-border: #444;
  --color-active: #4fc08d;
}

* {
  box-sizing: border-box;
}

html, body #app {
  margin: 0 !important;
  padding: 0 !important;
  height: 100% !important;
  background-color: var(--color-bg) !important;
  color: var(--color-text) !important;
  font-family: Arial, sans-serif !important;
}

.app-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #1f1f1f;
  border-bottom: 1px solid var(--color-border);
  height: 50px;
  display: flex;
  align-items: center;
  z-index: 1000;
}

main {
  margin-top: 50px;
  flex: 1;
  padding: 1rem;
  min-height: calc(100vh - 50px); /* garantir altura total visível */
}

nav {
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
  display: flex;
  justify-content: flex-start;
  gap: 1.5rem;
  font-size: 1rem;
}

nav a {
  color: var(--color-text);
  text-decoration: none;
  padding: 0.5rem 0;
  border-bottom: 2px solid transparent;
  transition: border-color 0.3s ease;
}

nav a:hover {
  border-bottom-color: var(--color-active);
}

nav a.active {
  color: var(--color-active);
  border-bottom-color: var(--color-active);
  font-weight: 600;
}
</style>
