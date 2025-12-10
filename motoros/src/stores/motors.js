import { defineStore } from 'pinia'

const BASE_URL = 'http://localhost:3000/motors'

export const useMotorsStore = defineStore('motors', {
  state: () => ({
    motors: [],
    loading: false,
    error: null
  }),
  actions: {
    async fetchMotors () {
      this.loading = true
      this.error = null
      try {
        const res = await fetch(BASE_URL)
        this.motors = await res.json()
      } catch (err) {
        this.error = 'Nem sikerült betölteni a motorokat.'
        console.error(err)
      } finally {
        this.loading = false
      }
    },
    getById (id) {
      return this.motors.find(m => m.id === Number(id))
    },
    async addMotor (motor) {
      this.error = null
      try {
        const res = await fetch(BASE_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(motor)
        })
        const created = await res.json()
        this.motors.push(created)
        return created
      } catch (err) {
        this.error = 'Nem sikerült létrehozni a motort.'
        console.error(err)
      }
    },
    async updateMotor (motor) {
      this.error = null
      try {
        const res = await fetch(`${BASE_URL}/${motor.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(motor)
        })
        const updated = await res.json()
        const idx = this.motors.findIndex(m => m.id === updated.id)
        if (idx !== -1) this.motors[idx] = updated
        return updated
      } catch (err) {
        this.error = 'Nem sikerült frissíteni a motort.'
        console.error(err)
      }
    },
    async deleteMotor (id) {
      this.error = null
      try {
        await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' })
        this.motors = this.motors.filter(m => m.id !== id)
      } catch (err) {
        this.error = 'Nem sikerült törölni a motort.'
        console.error(err)
      }
    }
  }
})
