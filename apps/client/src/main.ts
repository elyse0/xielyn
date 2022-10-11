import { createApp } from 'vue';

import Oruga from '@oruga-ui/oruga-next';

// @ts-ignore
import { bulmaConfig } from '@oruga-ui/theme-bulma';

// @ts-ignore
import VuePlyr from 'vue-plyr';
import 'vue-plyr/dist/vue-plyr.css';

import VueLazyloadNext from 'vue-lazyload-next';

import App from './App.vue';
import router from './router';

import './css-customization/css/custom.css';

createApp(App)
  .use(router)
  .use(Oruga, bulmaConfig)
  .use(VuePlyr, { plyr: {} })
  .use(VueLazyloadNext)
  .mount('#app');
