<template>
  <div class="container">
    <div class="hero">
      <h1>Kezdőlap</h1>
      <p class="lead">
        Ez egy olyan felület klónja, mint a képeken – csak itt könyvek helyett <b>virágok</b> vannak.
      </p>
      <div class="hero-actions">
        <RouterLink to="/viragok" class="btn primary">Virágok megtekintése</RouterLink>
        <RouterLink to="/kosar" class="btn ghost">Kosár</RouterLink>
      </div>
    </div>

    <div class="info-grid">
      <div class="info-card">
        <h3>Mit tud?</h3>
        <ul>
          <li>Virág lista kártyákkal</li>
          <li>Részletek oldal (adatok, leírás, értékelés)</li>
          <li>Kosárba rakás, mennyiség, törlés</li>
          <li>Kliens oldali routing (Vue Router)</li>
        </ul>
      </div>
      <div class="info-card">
        <h3>Megjelenés</h3>
        <p class="muted">
          Sötét felső sáv, középre igazított menü, fehér háttér, kártyák és ugyanaz a “Részletek” gomb-stílus.
        </p>
      </div>
    </div>
  </div>
</template>
