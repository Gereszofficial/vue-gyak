<template>
  <div class="page">
    <h1 class="page-title">Admin · Motorok kezelése</h1>
    <p class="page-subtitle">
      Itt tudsz új motorokat felvenni, szerkeszteni vagy törölni a katalógusból.
    </p>

    <div v-if="store.error" class="banner error">{{ store.error }}</div>

    <section class="admin-layout">
      <form class="editor" @submit.prevent="handleSubmit">
        <h2 class="editor-title">
          {{ isEditing ? 'Motor szerkesztése' : 'Új motor felvétele' }}
        </h2>

        <div class="upload-zone"
             @dragover.prevent
             @dragenter.prevent="isDragOver = true"
             @dragleave.prevent="isDragOver = false"
             @drop.prevent="handleDrop">
          <p class="upload-title">Kép feltöltése (JPG/PNG)</p>
          <p class="upload-sub">
            Húzd ide a képet vagy kattints a gombra.
          </p>
          <input type="file" accept="image/*" ref="fileInput" class="hidden-input" @change="handleFileChange" />
          <button type="button" class="btn-ghost" @click="fileInput?.click()">Fájl kiválasztása</button>

          <div v-if="form.image" class="preview">
            <img :src="form.image" alt="Előnézet" />
          </div>

          <div v-if="isDragOver" class="drag-overlay">Dobd ide a képet</div>
        </div>

        <div class="form-grid">
          <label>
            Márka
            <input v-model="form.brand" required />
          </label>
          <label>
            Modell
            <input v-model="form.model" required />
          </label>
          <label>
            Évjárat
            <input v-model.number="form.year" type="number" min="1990" max="2100" required />
          </label>
          <label>
            Lóerő (LE)
            <input v-model.number="form.hp" type="number" min="50" max="400" required />
          </label>
          <label>
            Ár (HUF)
            <input v-model.number="form.price" type="number" min="0" step="10000" required />
          </label>
          <label class="wide">
            Rövid leírás
            <textarea v-model="form.description" rows="3" required></textarea>
          </label>
        </div>

        <div class="editor-actions">
          <button type="submit" class="btn-primary">
            {{ isEditing ? 'Mentés' : 'Hozzáadás' }}
          </button>
          <button v-if="isEditing" type="button" class="btn-ghost" @click="resetForm">
            Mégse
          </button>
        </div>
      </form>

      <section class="list-panel">
        <h2 class="editor-title">Jelenlegi motorok</h2>
        <div v-if="store.loading" class="banner">Betöltés...</div>

        <table v-else class="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Márka / modell</th>
              <th>Év</th>
              <th>LE</th>
              <th>Ár</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="m in motors" :key="m.id">
              <td>#{{ m.id }}</td>
              <td>{{ m.brand }} {{ m.model }}</td>
              <td>{{ m.year }}</td>
              <td>{{ m.hp }}</td>
              <td>{{ formatPrice(m.price) }}</td>
              <td class="cell-actions">
                <button class="btn-mini" @click="startEdit(m)">Szerkeszt</button>
                <button class="btn-mini danger" @click="handleDelete(m.id)">Töröl</button>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </section>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useMotorsStore } from '../stores/motors'

const store = useMotorsStore()
const { motors } = storeToRefs(store)

const emptyForm = () => ({
  id: null,
  brand: '',
  model: '',
  year: new Date().getFullYear(),
  hp: 200,
  price: 8000000,
  image: '',
  description: ''
})

const form = reactive(emptyForm())
const isEditing = ref(false)
const isDragOver = ref(false)
const fileInput = ref(null)

onMounted(() => {
  if (!motors.value.length) {
    store.fetchMotors()
  }
})

const resetForm = () => {
  Object.assign(form, emptyForm())
  isEditing.value = false
}

const startEdit = (motor) => {
  Object.assign(form, motor)
  isEditing.value = true
}

const handleFileChange = (e) => {
  const file = e.target.files[0]
  if (file) {
    readImageFile(file)
  }
}

const handleDrop = (e) => {
  isDragOver.value = false
  const file = e.dataTransfer.files[0]
  if (file) {
    readImageFile(file)
  }
}

const readImageFile = (file) => {
  if (!file.type.startsWith('image/')) return
  const reader = new FileReader()
  reader.onload = (ev) => {
    form.image = ev.target.result
  }
  reader.readAsDataURL(file)
}

const handleSubmit = async () => {
  if (isEditing.value) {
    await store.updateMotor({ ...form })
  } else {
    const toCreate = { ...form }
    delete toCreate.id
    await store.addMotor(toCreate)
  }
  resetForm()
}

const handleDelete = async (id) => {
  if (confirm('Biztosan törlöd ezt a motort?')) {
    await store.deleteMotor(id)
  }
}

const formatPrice = (price) =>
  new Intl.NumberFormat('hu-HU', { style: 'currency', currency: 'HUF', maximumFractionDigits: 0 }).format(price)
</script>

<style scoped>
.page {
  max-width: 1200px;
  margin: 0 auto;
}

.page-title {
  font-size: 1.9rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  margin-bottom: 6px;
}

.page-subtitle {
  color: #aaaaaa;
  margin-bottom: 20px;
}

.banner {
  padding: 10px 14px;
  border-radius: 10px;
  background: rgba(30, 30, 30, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.12);
  margin-bottom: 16px;
}

.banner.error {
  border-color: rgba(255, 64, 96, 0.8);
  background: rgba(80, 10, 24, 0.95);
}

.admin-layout {
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(0, 1.1fr);
  gap: 20px;
}

.editor,
.list-panel {
  background:
    repeating-linear-gradient(
      135deg,
      #15171a,
      #15171a 4px,
      #111318 4px,
      #111318 8px
    );
  border-radius: 18px;
  padding: 18px 18px 20px;
  border: 1px solid rgba(255, 0, 70, 0.5);
  box-shadow:
    0 0 0 1px rgba(255, 0, 70, 0.4),
    0 18px 40px rgba(0, 0, 0, 0.9);
}

.editor-title {
  font-size: 1.2rem;
  margin-top: 0;
  margin-bottom: 12px;
  color: #ff2f4f;
}

.upload-zone {
  position: relative;
  border-radius: 16px;
  border: 1px dashed rgba(255, 255, 255, 0.35);
  padding: 14px 14px 12px;
  margin-bottom: 14px;
  text-align: center;
  background: rgba(3, 4, 7, 0.85);
}

.upload-title {
  font-size: 0.9rem;
  font-weight: 600;
}

.upload-sub {
  font-size: 0.8rem;
  color: #cccccc;
  margin-bottom: 8px;
}

.hidden-input {
  display: none;
}

.preview {
  margin-top: 10px;
}

.preview img {
  width: 100%;
  max-height: 180px;
  object-fit: cover;
  border-radius: 10px;
}

.drag-overlay {
  position: absolute;
  inset: 0;
  border-radius: 16px;
  background: rgba(255, 0, 70, 0.16);
  border: 2px dashed rgba(255, 0, 120, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.9rem;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px 14px;
}

label {
  display: flex;
  flex-direction: column;
  font-size: 0.85rem;
  color: #dddddd;
  gap: 4px;
}

label.wide {
  grid-column: span 2;
}

input,
textarea {
  background: #05070a;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  padding: 7px 9px;
  color: #f5f5f5;
  font-size: 0.86rem;
  outline: none;
}

input:focus,
textarea:focus {
  border-color: rgba(255, 0, 90, 0.9);
  box-shadow: 0 0 0 1px rgba(255, 0, 90, 0.9);
}

.editor-actions {
  margin-top: 14px;
  display: flex;
  gap: 10px;
}

.btn-primary {
  padding: 7px 18px;
  border-radius: 999px;
  border: none;
  cursor: pointer;
  background: radial-gradient(circle at top left, #ff3355, #b80024);
  color: #fff;
  font-size: 0.86rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  box-shadow: 0 0 14px rgba(255, 0, 80, 0.8);
  transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.btn-primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 0 18px rgba(255, 0, 100, 1);
}

.btn-ghost {
  padding: 7px 14px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.4);
  background: transparent;
  color: #f5f5f5;
  cursor: pointer;
  font-size: 0.86rem;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.86rem;
}

.data-table th,
.data-table td {
  padding: 7px 6px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.data-table th {
  text-align: left;
  font-weight: 600;
  color: #f0f0f0;
}

.cell-actions {
  display: flex;
  gap: 6px;
}

.btn-mini {
  padding: 4px 8px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.4);
  background: rgba(0, 0, 0, 0.4);
  color: #fff;
  font-size: 0.75rem;
  cursor: pointer;
}

.btn-mini.danger {
  border-color: rgba(255, 80, 80, 0.9);
  color: #ffb4b4;
}

.btn-mini:hover {
  box-shadow: 0 0 10px rgba(255, 0, 80, 0.7);
}

@media (max-width: 980px) {
  .admin-layout {
    grid-template-columns: 1fr;
  }
  .form-grid {
    grid-template-columns: 1fr;
  }
  label.wide {
    grid-column: span 1;
  }
}
</style>
