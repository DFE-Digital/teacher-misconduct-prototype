import { wizard } from 'govuk-prototype-rig'

export function yourDetailsWizard (req) {
  const journey = {
    '/report/tasks': {},
    '/report/your-details/name': {},
    '/report/your-details/job-title': {},
    '/report/your-details/telephone': {},
    '/report/your-details/check-answers': {
      '/report/tasks': true
    }
  }

  return wizard(journey, req)
}
