<script setup lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Cliente } from '@/models/cliente'
import http from '@/plugins/axios'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import { computed, ref, watch } from 'vue'

const ENDPOINT = 'clientes'
const props = defineProps({
  mostrar: Boolean,
  cliente: {
    type: Object as () => Cliente,
    default: () => ({}) as Cliente,
  },
  modoEdicion: Boolean,
})
const emit = defineEmits(['guardar', 'close'])

const dialogVisible = computed({
  get: () => props.mostrar,
  set: (value) => {
    if (!value) emit('close')
  },
})

const cliente = ref<Cliente>({ ...props.cliente })
watch(
  () => props.cliente,
  (newVal) => {
    cliente.value = { ...newVal }
  },
)

async function handleSave() {
  try {
    const body = {
      ci: cliente.value.ci,
      nombreCompleto: cliente.value.nombreCompleto,
      celular: cliente.value.celular,
    }
    if (props.modoEdicion) {
      await http.patch(`${ENDPOINT}/${cliente.value.id}`, body)
    } else {
      await http.post(ENDPOINT, body)
    }
    emit('guardar')
    cliente.value = {} as Cliente
    dialogVisible.value = false
  } catch (error: any) {
    alert(error?.response?.data?.message)
  }
}
</script>

<template>
  <div class="card flex justify-center">
    <Dialog v-model:visible="dialogVisible" :header="props.modoEdicion ? 'Editar' : 'Crear'" style="width: 25rem">
      <div class="form-group">
        <label for="ci" class="form-label">CI</label>
        <InputText id="ci" v-model="cliente.ci" class="form-input" autocomplete="off" autofocus />
      </div>
      <div class="form-group">
        <label for="nombreCompleto" class="form-label">Nombre Completo</label>
        <InputText id="nombreCompleto" v-model="cliente.nombreCompleto" class="form-input" autocomplete="off"
          autofocus />
      </div>
      <div class="form-group">
        <label for="celular" class="form-label">Teléfono</label>
        <InputText id="celular" v-model="cliente.celular" class="form-input" autocomplete="off" autofocus />
      </div>
      <div class="flex justify-end gap-2">
        <Button type="button" label="Cancelar" icon="pi pi-times" severity="secondary"
          @click="dialogVisible = false"></Button>
        <Button type="button" label="Guardar" icon="pi pi-save" @click="handleSave"></Button>
      </div>
    </Dialog>
  </div>
</template>

<style scoped>
.form-group {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.form-label {
  flex: 1;
  /* Las etiquetas ocupan el mismo ancho */
  text-align: right;
  /* Alinea el texto a la derecha */
  font-weight: bold;
}

.form-input {
  flex: 2;
  /* Los campos de entrada ocupan el doble de ancho que las etiquetas */
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.form-input:focus {
  border-color: #007bff;
  outline: none;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
}

/* Estilo para los inputs (campos de formulario) */
.custom-input {
  background-color: rgb(0, 0, 0) !important;
  /* Fondo amarillo para los campos */
  border: 1px solid #ccc;
  /* Borde gris para los campos */
  color: rgb(255, 252, 252);
  /* Color del texto en los inputs */
  padding: 0.5rem;
}

.custom-input:focus {
  border-color: #ff9f00;
  /* Color de borde azul cuando el campo está en foco */
  outline: none;
  /* Quitar el borde de enfoque predeterminado */
}
</style>
