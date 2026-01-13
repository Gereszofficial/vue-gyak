<template>
  <div class="container">
    <div class="detail">
      <div class="detail-left">
        <img class="detail-cover" :src="flower.image" :alt="flower.name" />

      </div>

      <div class="detail-right">
        <h1 class="detail-title">{{ flower.name }}</h1>
        <div class="detail-subtitle">{{ flower.latin }}</div>

        <section class="panel">
          <div class="panel-head">Virág adatai</div>
          <div class="panel-body two-col">
            <div><b>Azonosító:</b> {{ flower.id }}</div>
            <div><b>Cikkszám:</b> {{ flower.sku }}</div>
          </div>
        </section>

        <h2 class="section-title">Leírás</h2>
        <p class="desc">{{ flower.desc }}</p>

        <h2 class="section-title">Értékelések</h2>
        <div class="rating-row">
          <div class="rating-score">{{ flower.rating.toFixed(1) }}/5</div>
          <div class="bar">
            <div class="bar-fill" :style="{ width: (flower.rating/5*100).toFixed(0)+'%' }">
              <span class="bar-label">{{ flower.rating.toFixed(1) }}/5</span>
            </div>
          </div>
        </div>
        <div class="muted small">{{ flower.reviews }}</div>

        <div class="actions">
          <button class="btn secondary" @click="back">Vissza a virágokhoz</button>
          <button class="btn primary" @click="addToCart">Kosárba tesz</button>
        </div>

        <div v-if="justAdded" class="toast" role="status">
          Hozzáadva a kosárhoz ✓
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { flowers } from '../data/flowers'
import { useCartStore } from '../stores/cart'

const route = useRoute()
const router = useRouter()
const cart = useCartStore()

const id = computed(() => Number(route.params.id))
const flower = computed(() => flowers.find(x => x.id === id.value))

watch(flower, (v) => {
  if (!v) router.replace('/viragok')
}, { immediate: true })

const coverFor = (id) => new URL(`../assets/flowers/${id}.svg`, import.meta.url).href
const justAdded = ref(false)
let t = null

function addToCart() {
  cart.add(id.value, 1)
  justAdded.value = true
  clearTimeout(t)
  t = setTimeout(() => (justAdded.value = false), 1400)
}

function back() {
  router.push('/viragok')
}
</script>
