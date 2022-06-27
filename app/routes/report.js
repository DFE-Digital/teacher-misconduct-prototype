// import { reportWizard } from '../wizards/report-wizard.js'
import { teacherDetailsWizard } from '../wizards/report/teacher-details-wizard.js'

export const reportRoutes = router => {
  // router.all([
  //   '/report',
  //   '/report/:view'
  // ], (req, res, next) => {
  //   res.locals.paths = reportWizard(req)
  //   next()
  // })

  router.all([
    '/report/teacher',
    '/report/teacher/:view'
  ], (req, res, next) => {
    res.locals.paths = teacherDetailsWizard(req)
    next()
  })

  router.post([
    '/report/:view',
    '/report/teacher/:view'
  ], (req, res) => {
    res.redirect(res.locals.paths.next)
  })
}
