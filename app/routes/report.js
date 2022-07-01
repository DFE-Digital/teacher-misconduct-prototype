// import { reportWizard } from '../wizards/report-wizard.js'
import { yourDetailsWizard } from '../wizards/report/your-details-wizard.js'
import { teacherDetailsWizard } from '../wizards/report/teacher-details-wizard.js'
import { teacherContactDetailsWizard } from '../wizards/report/teacher-contact-details-wizard.js'
import { eligibilityWizard } from '../wizards/report/eligibility-wizard.js'

export const reportRoutes = router => {
  router.all([
    '/report/your-details/',
    '/report/your-details/:view'
  ], (req, res, next) => {
    res.locals.paths = yourDetailsWizard(req)
    next()
  })

  router.all([
    '/report/teacher',
    '/report/teacher/:view'
  ], (req, res, next) => {
    res.locals.paths = teacherDetailsWizard(req)
    next()
  })

  router.all([
    '/report/teacher-contact-details/',
    '/report/teacher-contact-details/:view'
  ], (req, res, next) => {
    res.locals.paths = teacherContactDetailsWizard(req)
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
    '/report/your-details/:view',
    '/report/teacher-contact-details/:view',
    '/report/teacher/:view'
  ], (req, res) => {
    res.redirect(res.locals.paths.next)
  })
}
