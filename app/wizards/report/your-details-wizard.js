import { wizard } from 'govuk-prototype-rig'

export function yourDetailsWizard (req, res) {
  const { isPublic } = res.locals

  const journey = {
    '/report/tasks': {},
    '/report/your-details/name': {},
    ...isPublic ? {
      '/report/your-details/relationship-to': {}
    } : {
      '/report/your-details/job-title': {}
    },
    '/report/your-details/telephone': {},
    '/report/your-details/check-answers': {
      '/report/tasks': true
    }
  }

  return wizard(journey, req)
}
