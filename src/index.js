import 'promise-polyfill/src/polyfill'
import 'es6-object-assign/dist/object-assign-auto'

import Vue from 'vue'

Vue.use(router)

const moment = require("moment");

import Buefy from "buefy";
Vue.use(Buefy, {
  defaultDateFormatter: (date) => moment(date).format("ddd, DD MMMM YYYY"),
  defaultIconPack: 'fas',
});
Vue.config.productionTip = false;

import router from './router'
import store from './store/store'

import App from './App';

new Vue({
  el: '#app',
  data() {
    return {
      
    }
  },
  router,
  store,
  render: function (h) { return h(App, { props: { currentStage: this.currentStage } }); },
  mounted: function () { 
  }
});