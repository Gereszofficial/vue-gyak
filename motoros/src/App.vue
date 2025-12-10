<template>
  <div class="app-shell">
    <header class="top-bar">
      <div class="logo">Sport Motorok</div>
      <nav class="nav-links">
        <RouterLink to="/">Landing</RouterLink>
        <RouterLink to="/motors">Katalógus</RouterLink>
        <RouterLink to="/admin/motors">Admin</RouterLink>
      </nav>
    </header>

    <main class="app-main">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
</script>

<style scoped>
.app-shell {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.top-bar {
  position: sticky;
  top: 0;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 32px;
  background: radial-gradient(circle at top left, #ff0033 0, #090909 40%, #050608 100%);
  box-shadow: 0 2px 18px rgba(0,0,0,0.8);
  border-bottom: 1px solid rgba(255,0,40,0.4);
}

.logo {
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.nav-links {
  display: flex;
  gap: 18px;
}

.nav-links a {
  color: #f5f5f5;
  text-decoration: none;
  font-size: 0.95rem;
  padding: 6px 10px;
  border-radius: 999px;
  border: 1px solid transparent;
  transition: all 0.2s ease;
}

.nav-links a.router-link-active {
  border-color: rgba(255,0,60,0.8);
  background: rgba(255,0,60,0.12);
}

.nav-links a:hover {
  transform: translateY(-1px);
  box-shadow: 0 0 12px rgba(255,0,60,0.4);
}

.app-main {
  padding: 24px;
}
</style>
