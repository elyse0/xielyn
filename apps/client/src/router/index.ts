import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import { getBaseUrl } from '@/util/env';

const Homepage = () => import('@/pages/Homepage.vue');
const Verbs = () => import('@/pages/Verbs.vue');
const Videos = () => import('@/pages/Videos.vue');
const Vocabulary = () => import('@/pages/Vocabulary.vue');
const YoutubeVideoViewer = () => import('@/pages/YoutubeVideoViewer.vue');
const CaptionsMerger = () => import('@/pages/CaptionsMerger.vue');
const CaptionsDownloader = () => import('@/pages/CaptionsDownloader.vue');

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Homepage',
    component: Homepage,
    meta: {
      title: 'Xielyng | Mandaring learning',
    },
  },
  {
    path: '/videos',
    name: 'Videos',
    component: Videos,
  },
  {
    path: '/verbs',
    name: 'Verbs',
    component: Verbs,
  },
  {
    path: '/vocabulary',
    name: 'Vocabulary',
    component: Vocabulary,
  },
  {
    path: '/videos/youtube/:videoId',
    name: 'YoutubeVideoViewer',
    component: YoutubeVideoViewer,
  },
  {
    path: '/captions-merger',
    name: 'CaptionsMerger',
    component: CaptionsMerger,
  },
  {
    path: '/captions-downloader',
    name: 'CaptionsDownloader',
    component: CaptionsDownloader,
  },
];

const router = createRouter({
  history: createWebHistory(getBaseUrl()),
  routes,
});

router.beforeEach((to, from, next) => {
  const nearestWithTitle = to.matched.slice().reverse().find((r) => r.meta && r.meta.title);

  if (nearestWithTitle) {
    document.title = nearestWithTitle.meta.title as string;
  }

  next();
});

export default router;
