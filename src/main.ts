import {createApp} from 'vue'
import './style.css'
import App from './App.vue'
import Popper from 'vue3-popper';
import Toast, {PluginOptions, POSITION} from "vue-toastification";
import "vue-toastification/dist/index.css";
import {router} from "./router";

const app = createApp(App)

app.component('Popper', Popper);


const options: PluginOptions = {
    position: POSITION.TOP_CENTER,
    timeout: false,
    maxToasts: 1,
};
app.use(Toast, options);
app.use(router)
app.mount('#app');