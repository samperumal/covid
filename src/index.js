import 'promise-polyfill/src/polyfill'
import 'es6-object-assign/dist/object-assign-auto'

import Vue from 'vue'

import router from './router'

Vue.use(router)

const moment = require("moment");

import Buefy from "buefy";
Vue.use(Buefy, {
  defaultDateFormatter: (date) => moment(date).format("ddd, DD MMMM YYYY"),
  defaultIconPack: 'fas',
});
Vue.config.productionTip = false;

import App from './App';

new Vue({
  el: '#app',
  data() {
    return {
      
    }
  },
  router,
  render: function (h) { return h(App, { props: { currentStage: this.currentStage } }); },
  mounted: function () { 
  }
});