
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import ElementUI from 'element-ui'
import router from './router'
import store from './store/index.js'
import './assets/lib/flexible.js'
import 'element-ui/lib/theme-default/index.css'
import './assets/css/animate.css'
import ReturnTop from './assets/lib/ReturnTop'

Vue.config.productionTip = false;
Vue.prototype.$http = axios;
Vue.use(ElementUI);
Vue.use(ReturnTop);

new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
});
