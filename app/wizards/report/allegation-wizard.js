import { wizard } from 'govuk-prototype-rig'

export function allegationWizard (req, res) {
  const { isEmployer } = res.locals
  const journey = {
    '/report/tasks': {},
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
