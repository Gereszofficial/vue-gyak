<template>
  <div class="container">
    <h1 class="page-title">Virágok</h1>

    <div class="grid">
      <article v-for="f in flowers" :key="f.id" class="card">
        <img class="cover" :src="f.image" :alt="f.name" />


        <div class="card-body">
          <div class="card-title">{{ f.name }}</div>
          <button class="btn primary small" @click="goDetails(f.id)">Részletek</button>
        </div>
      </article>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { flowers } from '../data/flowers'

const router = useRouter()
const coverFor = (id) => new URL(`../assets/flowers/${id}.svg`, import.meta.url).href
const goDetails = (id) => router.push(`/viragok/${id}`)
</script>
