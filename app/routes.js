import express from 'express'
import { exampleWizardRoutes } from './routes/example-wizard.js'
import { referRoutes } from './routes/refer.js'
import { calendarRoutes } from './routes/calendar.js'

const router = express.Router()
exampleWizardRoutes(router)
referRoutes(router)
calendarRoutes(router)

export default router
