<script lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCartStore } from '@/stores/cart'
import { computed, ref, onMounted } from 'vue'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import http from '@/plugins/axios'
import { useAuthStore } from '@/stores/index'

export default {
  components: {
    InputText,
    Button,
    Dialog,
  },
  setup() {
    const cartStore = useCartStore()

    const mostrarFormularioCliente = ref(false)

    // Estado para almacenar los detalles del cliente seleccionado
    const clienteSeleccionado = ref({
      id: null,
      ci: '',
      nombre: '',
      apellidoPaterno: '',
      apellidoMaterno: '',
    })

    // Lista de clientes para mostrar en el select
    const clientes = ref<any[]>([])
    const searchCI = ref('') // Para el select de C.I.

    // Cargar clientes del backend
    const obtenerClientes = async () => {
      try {
        const response = await http.get('/clientes')
        clientes.value = response.data
      } catch (error) {
        console.error('Error al obtener los clientes', error)
      }
    }

    // Cargar clientes al montar el componente
    onMounted(() => {
      obtenerClientes()
    })

    // Cuando se selecciona un C.I., se obtiene la información del cliente
    function seleccionarClientePorCI() {
      const clienteEncontrado = clientes.value.find((cliente) => cliente.ci === searchCI.value)
      if (clienteEncontrado) {
        clienteSeleccionado.value = clienteEncontrado
      } else {
        alert('Cliente no encontrado')
      }
    }

    // Función para calcular el total del carrito
    const totalCarrito = computed(() => {
      return cartStore.productos.reduce((total, producto) => {
        return total + producto.precio * producto.cantidad
      }, 0)
    })

    // Función para eliminar un producto del carrito
    function eliminarProducto(productoId: number) {
      cartStore.eliminarDelCarrito(productoId)
    }

    // Función para vaciar el carrito
    function vaciarCarrito() {
      cartStore.vaciarCarrito()
    }

    // Función para aumentar la cantidad de un producto
    function aumentarCantidad(productoId: number, stock: number) {
      const producto = cartStore.productos.find((p) => p.id === productoId)
      if (producto) {
        if (producto.cantidad < stock) {
          producto.cantidad++
        }
      }
    }

    // Función para disminuir la cantidad de un producto
    function disminuirCantidad(productoId: number) {
      const producto = cartStore.productos.find((p) => p.id === productoId)
      if (producto && producto.cantidad > 1) {
        producto.cantidad--
      }
    }

    function registrarVenta() {
      // Verificar si el cliente está seleccionado
      if (!clienteSeleccionado.value.id) {
        alert('Debe seleccionar un cliente para completar la venta.')
        return
      }

      // Verificar si el carrito tiene productos
      if (cartStore.productos.length === 0) {
        alert('El carrito está vacío. Agrega productos para realizar la venta.')
        return
      }

      // Obtener el token de autenticación desde el store
      const authStore = useAuthStore()
      console.log('Estado del authStore:', authStore.user)
      const token = authStore.token
      //const userId = authStore.userId

      /*if (!userId) {
        console.error('El ID del usuario no está disponible.')
        return
      }*/
      // Verificar si el token está presente
      if (!token) {
        alert('Debe iniciar sesión para completar la venta.')
        return
      }

      // Preparar los datos de la venta
      const ventaData = {
        //idUsuario: userId, // Asegúrate de que es un número
        idCliente: clienteSeleccionado.value.id, // Asegúrate de que es un número
        montoTotal:
          typeof totalCarrito.value === 'string'
            ? parseFloat(totalCarrito.value)
            : totalCarrito.value,
        productos: cartStore.productos.map((producto) => ({
          idProducto: producto.id, // Asegúrate de que es un número
          precioVenta:
            typeof producto.precio === 'string' ? parseFloat(producto.precio) : producto.precio,
          cantidad: producto.cantidad, // Asegúrate de que es un número
          subtotal:
            producto.cantidad *
            (typeof producto.precio === 'string' ? parseFloat(producto.precio) : producto.precio), // Calcular subTotal
        })),
        // Verificar si 'totalCarrito.value' es un string y convertirlo a número
      }
      // Enviar la venta al backend con el token en los encabezados
      http
        .post('/ventas', ventaData, {
          headers: {
            Authorization: `Bearer ${token}`, // Enviar el token aquí
          },
        })
        .then((response) => {
          // Vaciar el carrito después de registrar la venta
          cartStore.vaciarCarrito()

          // Notificar al usuario que la venta fue registrada
          alert('Venta registrada con éxito')
        })
        .catch((error) => {
          console.error('Error al registrar la venta', error)
          alert('Hubo un error al registrar la venta. Intente nuevamente.')
        })
    }

    // Función para formatear la moneda
    function formatCurrency(value: number): string {
      return value.toLocaleString('es-BO', {
        style: 'currency',
        currency: 'BOB',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    }

    // Función para mostrar el formulario en un modal
    function mostrarFormulario() {
      mostrarFormularioCliente.value = true
    }

    // Función para cerrar el formulario del cliente
    function cerrarFormulario() {
      mostrarFormularioCliente.value = false
    }

    function aceptarCliente() {
      if (clienteSeleccionado.value.id) {
        cartStore.seleccionarCliente(clienteSeleccionado.value.id) // Guarda el idCliente en el store
        mostrarFormularioCliente.value = false // Cierra el formulario
      } else {
        alert('Debe seleccionar un cliente')
      }
    }

    return {
      cartStore,
      totalCarrito,
      eliminarProducto,
      vaciarCarrito,
      aumentarCantidad,
      disminuirCantidad,
      registrarVenta,
      clienteSeleccionado,
      formatCurrency,
      mostrarFormulario,
      cerrarFormulario,
      mostrarFormularioCliente,
      clientes,
      searchCI,
      seleccionarClientePorCI,
      aceptarCliente,
    }
  },
}
</script>

<template>
  <div class="carrito-view">
    <h1>Carrito de Compras</h1>

    <div v-if="cartStore.productos.length === 0" class="empty-cart">
      <p>Tu carrito está vacío. ¡Agrega algunos productos!</p>
    </div>

    <div v-else>
      <table class="cart-table">
        <thead>
          <tr>
            <th>N°</th>
            <th>Producto</th>
            <th>Categoría</th>
            <th>Descripción</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th>Subtotal</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(producto, index) in cartStore.productos" :key="producto.id">
            <td>{{ index + 1 }}</td>
            <td>{{ producto.nombre }}</td>
            <td>{{ producto.categoria.nombre }}</td>
            <td>{{ producto.descripcion }}</td>
            <td>
              <div class="cantidad-controls">
                <button
                  @click="disminuirCantidad(producto.id)"
                  :disabled="producto.cantidad === 1"
                  class="cantidad-btn restar"
                >
                  -
                </button>
                <span>{{ producto.cantidad }}</span>
                <button
                  @click="aumentarCantidad(producto.id, producto.cantidadDisponible)"
                  class="cantidad-btn"
                >
                  +
                </button>
              </div>
            </td>
            <td>Bs {{ formatCurrency(producto.precio) }}</td>
            <td>{{ formatCurrency(producto.precio * producto.cantidad) }}</td>
            <td>
              <button @click="eliminarProducto(producto.id)" class="eliminar-btn">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="total">
        <h3>Total: {{ formatCurrency(totalCarrito) }}</h3>
      </div>

      <div class="botones-acciones">
        <button @click="vaciarCarrito">Vaciar carrito</button>
        <button @click="registrarVenta" class="registrar-venta">Registrar venta</button>
      </div>
    </div>

    <button @click="mostrarFormulario" class="seleccionar-cliente">Seleccionar Cliente</button>

    <Dialog
      v-model:visible="mostrarFormularioCliente"
      header="Formulario de Cliente"
      :style="{ width: '700px' }"
      :modal="true"
      :closable="false"
    >
      <div class="formulario-cliente">
        <h3>Buscar Cliente por C.I.</h3>

        <select v-model="searchCI" @change="seleccionarClientePorCI" class="ci-selector">
          <option value="">Seleccionar C.I.</option>
          <option v-for="cliente in clientes" :key="cliente.id" :value="cliente.ci">
            {{ cliente.ci }}
          </option>
        </select>

        <div v-if="clienteSeleccionado.id">
          <!-- Estructura de campos con labels encima -->
          <div class="form-group">
            <label for="ci">C.I:</label>
            <InputText id="ci" v-model="clienteSeleccionado.ci" disabled />
          </div>

          <!-- Nombres, Apellido Paterno y Apellido Materno en la misma fila -->
          <div class="form-group row">
            <div class="col">
              <label for="nombres">Nombres:</label>
              <InputText id="nombres" v-model="clienteSeleccionado.nombre" disabled />
            </div>
            <div class="col">
              <label for="apellidoPaterno">Apellido Paterno:</label>
              <InputText
                id="apellidoPaterno"
                v-model="clienteSeleccionado.apellidoPaterno"
                disabled
              />
            </div>
            <div class="col">
              <label for="apellidoMaterno">Apellido Materno:</label>
              <InputText
                id="apellidoMaterno"
                v-model="clienteSeleccionado.apellidoMaterno"
                disabled
              />
            </div>
          </div>
        </div>

        <!-- Botón Cerrar con estilo actualizado -->
        <div class="form-buttons">
          <Button
            label="Cerrar"
            icon="pi pi-times"
            @click="cerrarFormulario"
            class="cerrar-formulario"
          />
          <Button label="Aceptar" class="aceptar-formulario" @click="aceptarCliente" />
        </div>
      </div>
    </Dialog>
  </div>
</template>

<style scoped>
.carrito-view {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
}

.cart-table th,
.cart-table td {
  background-color: transparent !important;
  padding: 12px 15px;
  text-align: left;
}

.total {
  margin-top: 15px;
  text-align: right;
}

.botones-acciones {
  margin-top: 20px;
  text-align: center;
}

button {
  background-color: #28a745;
  color: white;
  border: 1px solid #000;
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  margin: 5px;
}

button:hover {
  background-color: #218838;
}

.registrar-venta {
  background-color: #007bff;
}

.registrar-venta:hover {
  background-color: #0056b3;
}

.eliminar-btn {
  background-color: #28a745;
  color: white;
  border: none;
}

.eliminar-btn:hover {
  background-color: #fc0019;
}

.cantidad-controls {
  display: flex;
  align-items: center;
  gap: 10px;
}

.cantidad-btn {
  padding: 5px 10px;
  border: 1px solid #000;
}

/* Estilo para mantener la estructura en 3 campos arriba y 2 abajo */
.formulario-cliente {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.ci-selector {
  width: 150%;
  max-width: 150px;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group.row {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.col {
  width: 31%;
  /* Ajuste para que los tres campos quepan en una fila */
}

label {
  margin-bottom: 5px;
  font-weight: bold;
}

.dialog-content {
  max-width: 700px;
}

/* Estilo para el botón cerrar sin cambio de color al pasar el cursor */
.form-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}

.aceptar-formulario {
  background-color: #dc3545;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.aceptar-formulario:hover {
  background-color: #c82333;
}

.cerrar-formulario {
  background-color: #28a745;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: auto;
  max-width: 200px;
}

.cerrar-formulario:hover {
  background-color: #218838;
}
</style>
