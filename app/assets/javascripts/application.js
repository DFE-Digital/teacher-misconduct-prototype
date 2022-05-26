// Sass entry point for rollup.js
import '../stylesheets/application.scss'

// Import GOV.UK Frontend
import { initAll as govukFrontend } from 'govuk-frontend'

// Import GOV.UK Prototype Rig
import GOVUKPrototypeComponents from 'govuk-prototype-components'

import { Calendar } from './calendar'

// Initiate scripts on page load
document.addEventListener('DOMContentLoaded', () => {
  govukFrontend()
  GOVUKPrototypeComponents.initAll()
  Calendar()
})
