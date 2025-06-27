import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faEye, faEyeSlash, faTrash, faPen, faPlus, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

const app = createApp(App)

library.add(faEye, faEyeSlash, faTrash, faPen, faPlus, faEnvelope)

app.component('font-awesome-icon', FontAwesomeIcon)
app.use(router)

app.mount('#app')
