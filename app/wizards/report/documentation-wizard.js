import { wizard } from 'govuk-prototype-rig'

export function documentationWizard (req) {
  const journey = {
    '/report/tasks': {},
    '/report/documentation/guidance': {},
    '/report/documentation/add': {},
    '/report/documentation/check-answers': {
      '/report/tasks': true
    }
  }

  return wizard(journey, req)
}
