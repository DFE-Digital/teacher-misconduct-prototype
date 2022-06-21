import { wizard } from '../wizards/refer-wizard.js'

export const referRoutes = router => {
  router.all([
    '/refer',
    '/refer/:view'
  ], (req, res, next) => {
    res.locals.paths = wizard(req)
    next()
  })

  router.post('/refer/:view', (req, res) => {
    res.redirect(res.locals.paths.next)
  })
}
