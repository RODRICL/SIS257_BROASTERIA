<script setup lang="ts">
// Importamos el componente productoVentaView
import ProductoVentaView from '@/views/ProductoVentaView.vue';
import CarritoView from '@/views/CarritoView.vue';

</script>

<template>
  <div>


    <!-- Aquí importamos el componente ProductoVentaView sin fusionar nada -->
    <ProductoVentaView />

    <!-- Otros contenidos que quieras agregar a pruebaView -->
    <CarritoView />
  </div>
</template>

<style scoped>
/* Estilos para pruebaView */
h1 {
  text-align: center;
}
</style>