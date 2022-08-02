import { wizard } from 'govuk-prototype-rig'

export function allegationWizard (req, res) {
  const { isEmployer, isPublic } = res.locals
  const journey = {
    '/report/tasks': {},
    ...isPublic ? {
      '/report/allegation/already-considered': {}
    } : {},
    '/report/allegation/allegation-summary': {},
    '/report/allegation/allegation': {},
    ...isEmployer ? {
      '/report/allegation/dbs': {}
    } : {},
    '/report/allegation/check-answers': {
      '/report/tasks': true
    }
  }

  return wizard(journey, req)
}
