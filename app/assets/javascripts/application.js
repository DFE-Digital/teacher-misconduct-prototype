// Sass entry point for rollup.js
import '../stylesheets/application.scss'

// Import GOV.UK Frontend
import { initAll as govukFrontend } from 'govuk-frontend'

// Import GOV.UK Prototype Rig
import GOVUKPrototypeComponents from 'govuk-prototype-components'

import { Calendar } from './calendar'
import WarnOnUnsavedChanges from './warn-on-unsaved-changes'

// Initiate scripts on page load
document.addEventListener('DOMContentLoaded', () => {
  govukFrontend()

  GOVUKPrototypeComponents.WarnOnUnsavedChanges = WarnOnUnsavedChanges
  GOVUKPrototypeComponents.initAll()

  Calendar()
})
