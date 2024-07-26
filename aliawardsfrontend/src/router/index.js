import { createRouter, createWebHistory } from 'vue-router';
import { tokenS } from '../stores/tokenS'; // Importa el store correctamente
import HomeV from '../views/HomeV.vue';
import AccessV from '../views/AccessV.vue';

const routes = [
  { path: '/home', name: 'HomeV', component: HomeV },
  { path: '/', name: 'AccessV', component: AccessV },
  // Agrega aquí tus rutas protegidas
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const tokenStore = tokenS(); 
  const token = tokenStore.token;

  if (to.name === 'HomeV' && !token) {
    next({ name: 'AccessV' }); 
  } else {
    next();
  }
});

export default router;
