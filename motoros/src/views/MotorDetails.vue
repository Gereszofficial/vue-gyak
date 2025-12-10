<template>
  <div class="page" v-if="motor">
    <div class="layout">
      <section class="hero-card">
        <div class="hero-img-wrap">
          <img :src="motor.image" :alt="fullName" />
        </div>
        <div class="hero-body">
          <p class="badge">Pálya / superbike</p>
          <h1 class="title">{{ fullName }}</h1>
          <p class="subtitle">{{ motor.year }} · {{ motor.hp }} LE · {{ formatPrice(motor.price) }}</p>

          <p class="description">
            {{ motor.description }}
          </p>

          <div class="chips">
            <span class="chip">Karbon elemek</span>
            <span class="chip">Versenypálya fókusz</span>
            <span class="chip">Launch control</span>
          </div>

          <div class="actions">
            <RouterLink to="/motors" class="btn-secondary">⬅ Vissza a listához</RouterLink>
          </div>
        </div>
      </section>
    </div>
  </div>

  <div v-else class="page">
    <p>Motor nem található.</p>
    <RouterLink to="/motors" class="btn-secondary">Vissza</RouterLink>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useMotorsStore } from '../stores/motors'
import { storeToRefs } from 'pinia'

const route = useRoute()
const store = useMotorsStore()
const { motors } = storeToRefs(store)

onMounted(async () => {
  if (!motors.value.length) {
    await store.fetchMotors()
  }
})

const motor = computed(() =>
  store.getById(route.params.id)
)

const fullName = computed(() => {
  if (!motor.value) return ''
  return `${motor.value.brand} ${motor.value.model}`
})

const formatPrice = (price) =>
  new Intl.NumberFormat('hu-HU', { style: 'currency', currency: 'HUF', maximumFractionDigits: 0 }).format(price)
</script>

<style scoped>
.page {
  max-width: 1100px;
  margin: 0 auto;
}

.layout {
  display: flex;
  flex-direction: column;
}

.hero-card {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 1.1fr);
  gap: 26px;
  padding: 22px;
  border-radius: 22px;
  background:
    radial-gradient(circle at top left, rgba(255,0,80,0.25), transparent 55%),
    radial-gradient(circle at bottom right, rgba(255,0,40,0.2), #050608 70%);
  border: 1px solid rgba(255, 0, 70, 0.6);
  box-shadow:
    0 0 0 1px rgba(255, 0, 70, 0.5),
    0 22px 50px rgba(0, 0, 0, 0.95);
}

.hero-img-wrap {
  position: relative;
}

.hero-img-wrap::after {
  content: '';
  position: absolute;
  inset: 12px;
  border-radius: 20px;
  border: 1px solid rgba(255,255,255,0.08);
  pointer-events: none;
}

.hero-img-wrap img {
  width: 100%;
  height: 100%;
  max-height: 380px;
  object-fit: cover;
  border-radius: 20px;
  display: block;
}

.hero-body {
  display: flex;
  flex-direction: column;
  gap: 12px;
  justify-content: center;
}

.badge {
  display: inline-block;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: #ffcdd5;
  border-radius: 999px;
  border: 1px solid rgba(255,224,230,0.6);
  padding: 4px 10px;
}

.title {
  font-size: 2rem;
  margin: 0;
  color: #ffffff;
}

.subtitle {
  color: #ff99aa;
  font-size: 0.95rem;
}

.description {
  margin-top: 4px;
  color: #f0f0f0;
  line-height: 1.6;
}

.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 6px;
}

.chip {
  font-size: 0.78rem;
  padding: 5px 10px;
  border-radius: 999px;
  border: 1px solid rgba(255,255,255,0.16);
  background: rgba(0,0,0,0.35);
}

.actions {
  margin-top: 16px;
}

.btn-secondary {
  display: inline-block;
  padding: 8px 18px;
  border-radius: 999px;
  border: 1px solid rgba(255,255,255,0.45);
  color: #fff;
  text-decoration: none;
  font-size: 0.88rem;
  background: rgba(0,0,0,0.4);
  transition: all 0.18s ease;
}

.btn-secondary:hover {
  background: rgba(0,0,0,0.7);
  box-shadow: 0 0 18px rgba(255,0,80,0.65);
  border-color: rgba(255,0,80,0.9);
}

@media (max-width: 900px) {
  .hero-card {
    grid-template-columns: 1fr;
  }
}
</style>
