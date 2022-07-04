import _ from 'lodash'
import { yourDetailsWizard } from '../wizards/report/your-details-wizard.js'
import { yourOrganisationWizard } from '../wizards/report/your-organisation-wizard.js'
import { teacherDetailsWizard } from '../wizards/report/teacher-details-wizard.js'
import { teacherContactDetailsWizard } from '../wizards/report/teacher-contact-details-wizard.js'
import { teacherRoleWizard } from '../wizards/report/teacher-role-wizard.js'
import { allegationWizard } from '../wizards/report/allegation-wizard.js'
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
    '/report/your-organisation/',
    '/report/your-organisation/:view'
  ], (req, res, next) => {
    res.locals.paths = yourOrganisationWizard(req)
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
    '/report/teacher-role/',
    '/report/teacher-role/:view'
  ], (req, res, next) => {
    res.locals.hasLeftJob = _.get(req.session.data, _.toPath('report.teacher-role.has-left-job')) === 'Yes'
    res.locals.paths = teacherRoleWizard(req)
    next()
  })

  router.all([
    '/report/allegation/',
    '/report/allegation/:view'
  ], (req, res, next) => {
    res.locals.paths = allegationWizard(req)
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
    '/report/your-organisation/:view',
    '/report/teacher-contact-details/:view',
    '/report/teacher-role/:view',
    '/report/allegation/:view',
    '/report/teacher/:view'
  ], (req, res) => {
    res.redirect(res.locals.paths.next)
  })
}
