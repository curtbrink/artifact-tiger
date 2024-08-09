// Composables
import browserStorageService from '@/services/browser-storage.service';
import { useEncyclopedia } from '@/store/encyclopedia';
import AuthView from '@/views/Auth.vue';
import CharacterControlView from '@/views/CharacterControl.vue';
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
  {
    path: '/control',
    component: CharacterControlView,
    meta: {
      requiresAuth: true,
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
      await useEncyclopedia().loadAllGameData();
    }
  }
});

export default router;
