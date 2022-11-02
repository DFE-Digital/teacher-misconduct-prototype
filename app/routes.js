import express from 'express'
import { reportRoutes } from './routes/report.js'
import { formRoutes } from './routes/form.js'
import { calendarRoutes } from './routes/calendar.js'

const router = express.Router()
reportRoutes(router)
formRoutes(router)
calendarRoutes(router)

export default router
