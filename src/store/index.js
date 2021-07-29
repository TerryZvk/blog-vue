import Vue from 'vue'
import Vuex from 'vuex'
import { camelCase } from '@/utils/tools'
Vue.use(Vuex)

// https://webpack.js.org/guides/dependency-management/#requirecontext
const modulesFiles = require.context('./modules', true, /\.js$/)

// it will auto require all vuex module from modules file
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './xx.js' => 'xx'
  const moduleName = camelCase(modulePath.replace(/^\.\/(.*)\.\w+$/, '$1'))
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

export default new Vuex.Store({
  modules
})