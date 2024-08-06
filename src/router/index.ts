// Composables
import browserStorageService from '@/services/browser-storage.service';
import { useAgentStore } from '@/store/agent';
import { useContractStore } from '@/store/contract';
import { useShipStore } from '@/store/ship';
import AuthView from '@/views/Auth.vue';
import HomeView from '@/views/Home.vue';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: HomeView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/auth',
    component: AuthView,
    meta: {
      requiresAuth: false,
    },
    beforeEnter: () => {
      browserStorageService.clearAuthToken();
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from) => {
  if (to.meta.requiresAuth) {
    if (!browserStorageService.hasAuthToken()) {
      // bye
      await router.push({ path: '/auth', replace: true });
    } else {
      // ensure various stores are loaded
    }
  }
});

export default router;
