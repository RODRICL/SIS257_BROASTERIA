<script lang="ts">
import { computed, ref } from 'vue';
import http from '@/plugins/axios';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
/* eslint-disable @typescript-eslint/no-explicit-any */

export default {
  components: {
    Dialog,
    Button
  },
  setup() {
    const ventas = ref<any[]>([]);
    const mostrarDetalles = ref(false);
    const ventaSeleccionada = ref<any>(null);
    const mostrarVentas = ref(false);
    const noVentas = ref(false);

    const formatDate = (date: string) => {
      const d = new Date(date);
      return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`;
    };

    const obtenerVentas = async () => {
      try {
        const response = await http.get('/ventas');
        ventas.value = response.data;
        noVentas.value = ventas.value.length === 0;
      } catch (error) {
        console.error('Error al obtener las ventas:', error);
      }
    };

    const verDetalles = async (ventaId: number) => {
      try {
        const response = await http.get(`/ventas/${ventaId}`);
        console.log(response.data); // Aquí es donde agregas el console.log
        ventaSeleccionada.value = response.data;
        console.log(ventaSeleccionada.value);
        mostrarDetalles.value = true;
      } catch (error) {
        console.error('Error al obtener los detalles de la venta:', error);
      }
    };

    const cerrarDetalles = () => {
      mostrarDetalles.value = false;
      ventaSeleccionada.value = null;
    };

    const mostrarTodasLasVentas = () => {
      obtenerVentas();
      mostrarVentas.value = true;
    };

    const ocultarVentas = () => {
      mostrarVentas.value = false;
    };

    // Calcular el Monto Total de la venta seleccionada
    const calcularMontoTotal = computed(() => {
      if (ventaSeleccionada.value && ventaSeleccionada.value.detalleventas) {
        return ventaSeleccionada.value.detalleventas.reduce((total: number, detalle: any) => {
          return total + parseFloat(detalle.subtotal);
        }, 0).toFixed(2); // Redondear a dos decimales
      }
      return '0.00'; // Si no hay detalle, mostrar 0
    });

    return {
      ventas,
      mostrarDetalles,
      ventaSeleccionada,
      verDetalles,
      cerrarDetalles,
      mostrarVentas,
      mostrarTodasLasVentas,
      ocultarVentas,
      noVentas,
      formatDate,
      calcularMontoTotal
    };
  }
};
</script>

<template>
  <div class="m-8">
    <h1 style="font-family: 'Times New Roman', sans-serif; font-weight: bold; color:white">Historial de Ventas</h1>

    <!-- Botones Mostrar Todo y Ocultar -->
    <div class="botones">
      <Button label="Mostrar Todo" @click="mostrarTodasLasVentas" class="mostrar-todo-btn" />
      <Button label="Ocultar" @click="ocultarVentas" class="ocultar-btn" />
    </div>

    <!-- Mostrar mensaje si no hay ventas -->
    <div v-if="noVentas && mostrarVentas" class="no-ventas">
      <p>No se han registrado ventas.</p>
    </div>

    <!-- Mostrar tabla de ventas si hay registros -->
    <div v-if="mostrarVentas && ventas.length > 0">
      <table class="ventas-table">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Cliente</th>
            <th>Monto Total</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(venta, index) in ventas" :key="venta.id">
            <td>{{ formatDate(venta.fechaCreacion) }}</td>
            <td>
              {{ venta.cliente.nombreCompleto }}
            </td>
            <td>{{ venta.montoTotal }}</td>
            <td>
              <Button label="Ver Detalles" @click="verDetalles(venta.id)" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal para mostrar los detalles de la venta -->
    <Dialog v-model:visible="mostrarDetalles" header="Detalles de la Venta" :style="{ width: '700px' }" :modal="true"
      :closable="false">
      <div v-if="ventaSeleccionada">

        <table class="detalle-table">
          <thead>
            <tr>
              <th>Nro</th>
              <th>Producto</th>
              <th>Descripción</th>
              <th>Categoría</th>
              <th>Cantidad</th>
              <th>Precio Venta</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(detalle, index) in ventaSeleccionada.detalleventas" :key="index">
              <td>{{ index + 1 }}</td>
              <td>{{ detalle.producto.nombre }}</td>
              <td>{{ detalle.producto.descripcion }}</td>
              <td>{{ detalle.producto.categoria.nombre }}</td>
              <td>{{ detalle.cantidad }}</td>
              <td>{{ detalle.precioVenta }}</td>
              <td>{{ detalle.subtotal }}</td>
            </tr>

            <tr>
              <td colspan="6" style="text-align: right; font-weight: bold;">Monto Total</td>
              <td>{{ calcularMontoTotal }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <Button label="Cerrar" icon="pi pi-times" @click="cerrarDetalles" class="cerrar-detalles-btn" />
    </Dialog>
  </div>
</template>

<style scoped>
.historial-view {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
}

.no-ventas {
  text-align: center;
  margin-top: 20px;
}

.ventas-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
  table-layout: auto;
  /* Ajusta el ancho de las celdas según el contenido */
}

.ventas-table th,
.ventas-table td {
  padding: 8px 12px;
  /* Reduce el padding para ajustarse al contenido */
  text-align: left;
  border: 1px solid #000000;
}

.ventas-table th {
  background-color: #ff9f00;
  font-weight: bold;
  text-transform: uppercase;
}

.ventas-table tr {
  background-color: #d3d1dbb7;
}

.ventas-table tr:hover {
  background-color: #f4b44d;
}

.detalle-table {
  width: 100%;
  border-collapse: collapse;
  table-layout: auto;
  /* Ajusta el ancho de las celdas según el contenido */
  background-color: #460e0e;
}

.detalle-table th,
.detalle-table td {
  padding: 8px 12px;
  /* Ajuste de padding para detalle de la venta */
  border: 1px solid #000000;
  color: #333;
}

.detalle-table th {
  background-color: #ff9f00;
  /* Fondo de las cabeceras */
  color: white;
  /* Color del texto en las cabeceras */

}

.detalle-table td {
  background-color: #fff;
  /* Fondo blanco para las celdas normales */
}

.detalle-table tr:nth-child(even) td {
  background-color: #f2f2f2;
  /* Fondo alternativo en las filas pares */
}

.detalle-table tr:hover td {
  background-color: #f4b44d;
  /* Fondo al pasar el cursor sobre una fila */
}

button {
  background-color: #ff9f00;
  color: rgb(7, 7, 7);
  border: none;
  padding: 8px 16px;
  cursor: pointer;
  transition: none;
}

.mostrar-todo-btn,
.ocultar-btn,
.cerrar-detalles-btn {
  transition: none;
}

.cerrar-detalles-btn {
  background-color: #ff9f00;
  color: rgb(253, 253, 253);
}

.botones {
  margin-bottom: 20px;
}

.mostrar-todo-btn,
.ocultar-btn {
  margin-right: 10px;
  padding: 8px 16px;
}

.mostrar-todo-btn {
  background-color: #007bff;
  color: white;
  transition: none;
}

.ocultar-btn {
  background-color: #ff9f00;
  color: white;
  transition: none;
}
</style>