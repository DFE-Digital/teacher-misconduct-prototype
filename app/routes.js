import express from 'express'
import { exampleWizardRoutes } from './routes/example-wizard.js'
import { reportRoutes } from './routes/report.js'
import { calendarRoutes } from './routes/calendar.js'

const router = express.Router()
exampleWizardRoutes(router)
reportRoutes(router)
calendarRoutes(router)

export default router
