<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/index'

const usuario = ref('')
const clave = ref('')
const error = ref(false)

function onSubmit() {
  const authStore = useAuthStore()
  authStore.login(usuario.value, clave.value).catch(() => (error.value = true))
}
</script>

<template>
  <div class="login-container">
    <form class="form" @submit.prevent="onSubmit">
      <label class="form-label">Usuario:</label>
      <input v-model="usuario" type="text" class="form-input" placeholder="Usuario" autofocus />
      <label class="form-label">Contraseña:</label>
      <input v-model="clave" type="password" class="form-input" placeholder="Contraseña" />
      <p v-if="error" class="error-message">Usuario y/o contraseña incorrectos</p>
      <input type="submit" class="form-submit" value="Ingresar" />
    </form>
  </div>
</template>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: #2c3e50;
  /* Fondo gris oscuro */
}

.form {
  margin: 1.5rem auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 25%;
  min-width: 350px;
  max-width: 100%;
  background: #1e2a33;
  /* Fondo del formulario cambiado a un gris más oscuro */
  border-radius: 8px;
  padding: 40px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.form-label {
  margin-top: 1.5rem;
  color: #ecf0f1;
  /* Color claro para los textos */
  margin-bottom: 0.5rem;
  font-size: 1rem;
  font-weight: 600;
}

.form-input {
  padding: 12px 16px;
  background: #34495e;
  /* Gris más suave para los inputs */
  border: 1px solid #7f8c8d;
  /* Gris oscuro con borde más claro */
  border-radius: 6px;
  color: #ecf0f1;
  /* Texto claro */
  font-size: 1rem;
  margin-bottom: 1rem;
  transition: border 0.3s ease;
}

.form-input:focus {
  border-color: #27ae60;
  /* Verde brillante al hacer foco */
  outline: none;
}

.error-message {
  color: #e74c3c;
  font-size: 0.875rem;
  text-align: center;
  margin-top: 0.5rem;
}

.form-submit {
  background: #27ae60;
  /* Verde fuerte para el botón */
  border: none;
  border-radius: 30px;
  color: white;
  margin-top: 2rem;
  padding: 12px 0;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: background 0.3s ease;
}

.form-submit:hover {
  background: #1e7e45;
  /* Verde más oscuro al hacer hover */
}
</style>