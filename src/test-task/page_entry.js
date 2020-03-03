import Vue from 'vue'
import app from './App.vue'
import ElementUI from 'element-ui'
import '../../node_modules/element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/ru-RU'

Vue.use(ElementUI,{ locale })
Vue.config.productionTip = false


new Vue({
  render: h => h(app),
}).$mount('#vue_app')
