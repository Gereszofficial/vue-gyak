<template>
  <div class="app-shell">
    <AppNav />
    <main class="page">
      <router-view />
    </main>
    <footer class="footer">
      <div class="container footer-inner">
        <span>© {{ new Date().getFullYear() }} Virágok</span>
        <span class="muted">Vue klón – minden gomb működik</span>
      </div>
    </footer>
  </div>
</template>

<script setup>
import AppNav from './components/AppNav.vue'
</script>
