<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useCartStore } from '@/stores/cart';  // Importa el store del carrito
import http from '@/plugins/axios';
import type { Producto } from '@/models/producto';
import Button from 'primevue/button'; // Para usar el botón de PrimeVue

// Lista reactiva para almacenar los productos
const productos = ref<Producto[]>([]);

// Usamos el store de Pinia para el carrito
const cartStore = useCartStore();

// Función para obtener todos los productos con stock > 0
async function obtenerProductos() {
  try {
    const response = await http.get('productos');
    productos.value = response.data.filter((producto: Producto) => producto.stock > 0);
  } catch (error) {
    console.error('Error al obtener los productos:', error);
  }
}

// Llamamos a la función `obtenerProductos` cuando el componente se monta
onMounted(() => {
  obtenerProductos();
});

// Función para agregar un producto al carrito
function agregarAlCarrito(producto: Producto) {
  const productoCarrito = {
    ...producto,
    cantidad: 1, // Al agregarlo al carrito, comenzamos con 1
  };
  cartStore.agregarAlCarrito(productoCarrito); // Usamos la acción de Pinia para agregarlo
}
</script>

<template>
  <div class="m-8">
    <h1 style="font-family: 'Times New Roman', sans-serif; font-weight: bold; color:white">Productos Disponibles</h1>

    <!-- Mensaje cuando no hay productos disponibles -->
    <div v-if="productos.length === 0">No hay productos disponibles con stock.</div>

    <!-- Tabla de productos -->
    <table v-else>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Descripción</th>
          <th>Categoría</th>
          <th>Precio de Venta</th>
          <th>Cantidad Disponible</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="producto in productos" :key="producto.id">
          <td>{{ producto.nombre }}</td>
          <td>{{ producto.descripcion }}</td> <!-- Descripción del producto -->
          <td>{{ producto.categoria.nombre }}</td> <!-- Categoría del producto -->
          <td>{{ producto.precioVenta }}</td>
          <td>{{ producto.stock }}</td>
          <td>
            <!-- Botón para agregar al carrito -->
            <Button icon="pi pi-cart" label="Agregar Producto" @click="agregarAlCarrito(producto)" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  box-shadow: 0 2px 10px rgba(253, 255, 254, 0.87);
  /* Sombra sutil */
  background-color: #dadadaa1;
  /* Fondo claro para la tabla */
  transition: background-color 0.3s ease;
}

/* Estilo para las cabeceras */
th {
  background-color: #ff9f00;
  /* Fondo azul para las cabeceras */
  color: rgb(0, 0, 0);
  /* Color blanco para las letras */
  text-align: left;
  border: 1px solid #000000;
  padding: 12px 16px;
  font-weight: bold;
  text-transform: uppercase;
  /* Todo en mayúsculas */
}

/* Estilo para las celdas */
td {
  padding: 12px 16px;
  text-align: left;
  border: 1px solid #000000;
  font-size: 14px;
  color: #333;
  /* Color de texto de las celdas */
}



/* Efecto hover en las filas */
tr:hover {
  background-color: #f4b44d;
  /* Fondo celeste al pasar el mouse */
  transition: background-color 0.3s ease;
  /* Transición suave al pasar el mouse */
}


button {
  background-color: #ff9f00;
  color: rgb(3, 3, 3);
  border: none;
  padding: 8px 15px;
  cursor: pointer;
  border-radius: 5px;
  /* Bordes redondeados */
  font-size: 14px;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #a86b07;
  /* Fondo verde más oscuro al pasar el mouse */
}

h1 {
  text-align: center;
  margin-bottom: 30px;
  color: #fff;
}
</style>