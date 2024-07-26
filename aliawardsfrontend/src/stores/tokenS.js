import { ref } from 'vue';

const tokenStore = ref({
  token: localStorage.getItem('token') || null,
});

export const tokenS = () => ({
  get token() {
    return tokenStore.value.token;
  },
  setToken(token) {
    tokenStore.value.token = token;
    localStorage.setItem('token', token);
  },
  clear() {
    tokenStore.value.token = null;
    localStorage.removeItem('token');
  }
});
