import { createApp } from 'vue'

import App from './App.vue'
import { setupI18n } from './providers/i18n'
import './assets/main.css'

(async () => {
  const i18n = await setupI18n()

  createApp(App)
    .use(i18n)
    .mount('#app')
})()
