// import { reportWizard } from '../wizards/report-wizard.js'
import { teacherDetailsWizard } from '../wizards/report/teacher-details-wizard.js'
import { eligibilityWizard } from '../wizards/report/eligibility-wizard.js'

export const reportRoutes = router => {
  router.all([
    '/report/teacher',
    '/report/teacher/:view'
  ], (req, res, next) => {
    res.locals.paths = teacherDetailsWizard(req)
    next()
  })

  router.all([
    '/report',
    '/report/eligibility/:view',
    '/report/:view'
  ], (req, res, next) => {
    res.locals.paths = eligibilityWizard(req)
    next()
  })

  router.post([
    '/report/:view',
    '/report/eligibility/:view',
    '/report/teacher/:view'
  ], (req, res) => {
    res.redirect(res.locals.paths.next)
  })
}
