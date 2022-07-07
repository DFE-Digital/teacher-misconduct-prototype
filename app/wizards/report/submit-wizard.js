import { wizard } from 'govuk-prototype-rig'

export function submitWizard (req) {
  const journey = {
    '/report/tasks': {},
    '/report/submit/review': {},
    '/report/submit/declaration': {},
    '/report/submit/confirmation': {}
  }

  return wizard(journey, req)
}
