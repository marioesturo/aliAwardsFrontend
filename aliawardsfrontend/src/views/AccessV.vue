<template>
  <div>
    <!-- Formulario para enviar el código de acceso -->
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
      <div class="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 class="text-2xl font-semibold mb-6 text-center">Introduce el Código</h2>
        <form @submit.prevent="handleSubmit">
          <div class="mb-4">
            <input
              type="text"
              id="code"
              v-model="code"
              placeholder="Introduce tu código"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div v-if="errorMessage" class="text-red-600 text-sm text-center mb-3">{{ errorMessage }}</div>
          <div class="flex justify-center">
            <button
              type="submit"
              class="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out"
            >
              Entrar
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '../axios';
import { tokenS } from '../stores/tokenS'; 

export default {
  name: 'AccessV',
  data() {
    return {
      code: '',
      errorMessage: ''
    };
  },
  beforeMount() {
    const tokenStore = tokenS();
    tokenStore.clear(); 
  },
  methods: {
    async handleSubmit() {
      this.errorMessage = '';
      try {
        const response = await axios.post('/users/authenticate', null, {
          params: { accessCode: this.code }
        });

        if (response.status === 200 && response.data) {
          const tokenStore = tokenS(); 
          tokenStore.setToken(response.data); 
          this.$router.push({ name: 'HomeV' });
        } else {
          this.errorMessage = 'Hubo un problema con la autenticación. Por favor, inténtelo de nuevo más tarde.';
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          this.errorMessage = 'Código inválido. Por favor, inténtelo de nuevo.';
        } else {
          this.errorMessage = 'Hubo un error al procesar su solicitud. Por favor, inténtelo de nuevo más tarde.';
        }
      }
    }
  }
};
</script>
