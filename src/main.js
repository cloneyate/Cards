import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import svgLogo from './components/svgLogo.vue'
import BaseBlock from './components/blocks/BaseBlock.vue'
import ImageBlock from './components/blocks/ImageBlock.vue'
import LogoBlock from './components/blocks/LogoBlock.vue'
import HeaderBlock from './components/blocks/HeaderBlock'
import BalmUI from 'balm-ui/dist/balm-ui';
import UiSkeleton from 'balm-ui/components/skeleton'
import 'balm-ui/dist/balm-ui.css';
/*
import { useTheme } from 'balm-ui';
const $theme = useTheme();
$theme.colors = {
  "primary": "#78909c",
  "secondary": "#a5d6a7",
  "on-primary": "#000000"
}
*/


const app = createApp(App)
  .use(BalmUI)
  .use(UiSkeleton)
  .use(router);

app.component('base-block', BaseBlock)
app.component('image-block', ImageBlock)
app.component('logo-block', LogoBlock)
app.component('header-block', HeaderBlock)
app.component('svg-logo', svgLogo)
router.isReady().then(() => {
  app.mount('#app');
});
