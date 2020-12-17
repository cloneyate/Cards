import { createApp } from 'vue'
import './theme.scss'
import App from './App.vue'
import router from './router';
import svgLogo from './components/svgLogo.vue'
import BaseBlock from './components/blocks/BaseBlock.vue'
import ImageBlock from './components/blocks/ImageBlock.vue'
import LogoBlock from './components/blocks/LogoBlock.vue'
import HeaderBlock from './components/blocks/HeaderBlock'
import VueMaterialAdapter from 'vue-material-adapter'
import BalmUI from 'balm-ui';
import 'balm-ui/dist/balm-ui.css';


const app = createApp(App)
  .use(BalmUI)
  .use(VueMaterialAdapter)
  .use(router);
router.isReady().then(() => {
  app.mount('#app');
  app.component('base-block', BaseBlock)
  app.component('image-block', ImageBlock)
  app.component('logo-block', LogoBlock)
  app.component('header-block', HeaderBlock)
  app.component('svg-logo', svgLogo)
});
