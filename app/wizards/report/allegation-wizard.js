import { wizard } from 'govuk-prototype-rig'

export function allegationWizard (req) {
  const journey = {
    '/report/tasks': {},
    '/report/allegation/allegation': {},
    '/report/allegation/check-answers': {
      '/report/tasks': true
    }
  }

  return wizard(journey, req)
}
