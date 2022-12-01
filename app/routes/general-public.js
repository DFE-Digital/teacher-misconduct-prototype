import _ from 'lodash'
import { publicWizard } from '../wizards/general-public/general-public-wizard.js'

export const publicRoutes = router => {
  router.all('/general-public/*', (req, res, next) => {
    res.locals.signedIn = true
    res.locals.reportService = true

    res.locals.isPublic = _.get(req.session.data, _.toPath('report.type-of-report')) === 'public'
    res.locals.isEmployer = !res.locals.isPublic

    next()
  })

  router.all([
    '/general-public/',
    '/general-public/:view'
  ], (req, res, next) => {
    res.locals.paths = publicWizard(req, res)
    next()
  })

  router.post([
    '/general-public/:view'
  ], (req, res) => {
    res.redirect(res.locals.paths.next)
  })
}