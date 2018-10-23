// Absolute imports.
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'v-autocomplete/dist/v-autocomplete.css';

// Relative imports.
import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import Autocomplete from 'v-autocomplete';
import App from './App.vue';

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(Autocomplete);

new Vue({
  render: h => h(App),
}).$mount('#app');
