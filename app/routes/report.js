import { reportWizard } from '../wizards/report-wizard.js'

export const reportRoutes = router => {
  router.all([
    '/report',
    '/report/:view'
  ], (req, res, next) => {
    res.locals.paths = reportWizard(req)
    next()
  })

  router.post('/report/:view', (req, res) => {
    res.redirect(res.locals.paths.next)
  })
}
