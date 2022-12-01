import express from 'express'
import { reportRoutes } from './routes/report.js'
import { formRoutes } from './routes/form.js'
import { publicRoutes } from './routes/public.js'
import { calendarRoutes } from './routes/calendar.js'

const router = express.Router()
reportRoutes(router)
formRoutes(router)
publicRoutes(router)
calendarRoutes(router)

export default router
