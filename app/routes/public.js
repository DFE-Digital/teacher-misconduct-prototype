import _ from 'lodash'
import { publicWizard } from '../wizards/public/public-wizard.js'

export const publicRoutes = router => {
  router.all('/public/*', (req, res, next) => {
    res.locals.signedIn = true
    res.locals.reportService = true

    res.locals.isPublic = _.get(req.session.data, _.toPath('report.type-of-report')) === 'public'
    res.locals.isEmployer = !res.locals.isPublic

    next()
  })

  router.all([
    '/public/',
    '/public/:view'
  ], (req, res, next) => {
    res.locals.paths = publicWizard(req, res)
    next()
  })

  router.post([
    '/public/:view'
  ], (req, res) => {
    res.redirect(res.locals.paths.next)
  })
}