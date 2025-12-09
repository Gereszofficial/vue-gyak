<template>
  <div class="app-root">
    <div class="bg-orb orb-1"></div>
    <div class="bg-orb orb-2"></div>
    <div class="bg-orb orb-3"></div>

    <div class="app-content">
      <div class="brand">
        <div class="brand-pill">Geresz Studio</div>
        <h1 class="brand-title">Welcome back</h1>
        <p class="brand-subtitle">
          Sign in to your premium dashboard and keep pushing your progress to the next level.
        </p>
      </div>

      <CreateAccount />
    </div>
  </div>
</template>

<script>
import CreateAccount from './components/CreateAccount.vue';
export default {
  name: 'App',
  components: { CreateAccount },
};
</script>

<style>
:root {
  color-scheme: dark;
}

body {
  margin: 0;
}

.app-root {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  background:
    radial-gradient(circle at top left, #1d4ed8 0, transparent 55%),
    radial-gradient(circle at bottom right, #ec4899 0, transparent 55%),
    radial-gradient(circle at top right, #0ea5e9 0, transparent 55%),
    #020617;
  padding: 24px;
  box-sizing: border-box;
}

.app-content {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
  gap: 48px;
  max-width: 1120px;
  width: 100%;
  align-items: center;
}

@media (max-width: 900px) {
  .app-content {
    grid-template-columns: minmax(0, 1fr);
    gap: 32px;
  }
}

.brand {
  color: #e5e7eb;
}

.brand-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 999px;
  background: rgba(15, 23, 42, 0.7);
  border: 1px solid rgba(148, 163, 184, 0.6);
  font-size: 12px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #c7d2fe;
  backdrop-filter: blur(14px);
}

.brand-title {
  margin: 18px 0 8px;
  font-size: 40px;
  line-height: 1.1;
  font-weight: 800;
  letter-spacing: -0.03em;
  color: #f9fafb;
}

.brand-subtitle {
  margin: 0;
  max-width: 420px;
  font-size: 15px;
  line-height: 1.6;
  color: #9ca3af;
}

/* Animated background orbs */

.bg-orb {
  position: absolute;
  filter: blur(60px);
  opacity: 0.65;
  border-radius: 999px;
  mix-blend-mode: screen;
  animation: float 22s ease-in-out infinite alternate;
}

.orb-1 {
  width: 420px;
  height: 420px;
  background: #4f46e5;
  top: -120px;
  left: -60px;
}

.orb-2 {
  width: 360px;
  height: 360px;
  background: #ec4899;
  bottom: -120px;
  right: -40px;
  animation-delay: -6s;
}

.orb-3 {
  width: 260px;
  height: 260px;
  background: #22d3ee;
  top: 40%;
  right: 50%;
  animation-delay: -12s;
}

@keyframes float {
  0% {
    transform: translate3d(0, 0, 0) scale(1);
  }
  50% {
    transform: translate3d(20px, -30px, 0) scale(1.05);
  }
  100% {
    transform: translate3d(-20px, 30px, 0) scale(0.98);
  }
}
</style>
