import _ from 'lodash'
import { formWizard } from '../wizards/form/form-wizard.js'

export const formRoutes = router => {
  router.all('/form/*', (req, res, next) => {
    res.locals.signedIn = true
    res.locals.reportService = true

    res.locals.isPublic = _.get(req.session.data, _.toPath('report.type-of-report')) === 'public'
    res.locals.isEmployer = !res.locals.isPublic

    next()
  })

  router.all([
    '/form/',
    '/form/:view'
  ], (req, res, next) => {
    res.locals.paths = formWizard(req, res)
    next()
  })

  router.post([
    '/form/:view'
  ], (req, res) => {
    res.redirect(res.locals.paths.next)
  })
}