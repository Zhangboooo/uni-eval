// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import themeDefault from '@/styles/vuetify/theme-default.json'

// Composables
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: 'themeDefault',
    themes: {
      themeDefault
    }
  },

  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi
    }
  }
})
