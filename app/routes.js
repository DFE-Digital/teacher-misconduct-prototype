import express from 'express'
import { exampleWizardRoutes } from './routes/example-wizard.js'
import { calendarRoutes } from './routes/calendar.js'

const router = express.Router()
exampleWizardRoutes(router)
calendarRoutes(router)

export default router
