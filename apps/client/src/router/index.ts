import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import { getBaseUrl } from '@/util/env';

const Homepage = () => import('@/pages/Homepage.vue');
const ChineseVerbs = () => import('@/pages/ChineseVerbs.vue');
const ChineseVideos = () => import('@/pages/ChineseVideos.vue');
const ChineseVocabulary = () => import('@/pages/ChineseVocabulary.vue');
const ChineseYoutubeVideoViewer = () => import('@/pages/ChineseYoutubeVideoViewer.vue');
const CaptionsMerger = () => import('@/pages/CaptionsMerger.vue');
const CaptionsDownloader = () => import('@/pages/CaptionsDownloader.vue');
const CaptionsVttToJson = () => import('@/pages/CaptionsVttToJson.vue');
const CaptionsVtt = () => import('@/pages/CaptionsVtt.vue');

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Homepage',
        component: Homepage,
        meta: {
            title: 'Sophire | Languages learning',
        },
    },
    {
        path: '/chinese/videos',
        name: 'ChineseVideos',
        component: ChineseVideos,
    },
    {
        path: '/chinese/verbs',
        name: 'ChineseVerbs',
        component: ChineseVerbs,
    },
    {
        path: '/chinese/vocabulary',
        name: 'ChineseVocabulary',
        component: ChineseVocabulary,
    },
    {
        path: '/chinese/videos/youtube/:videoId',
        name: 'ChineseYoutubeVideoViewer',
        component: ChineseYoutubeVideoViewer,
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
    {
        path: '/captions-vtt-to-json',
        name: 'CaptionsVttToJson',
        component: CaptionsVttToJson,
    },
    {
        path: '/captions-vtt',
        name: 'CaptionsVtt',
        component: CaptionsVtt,
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
