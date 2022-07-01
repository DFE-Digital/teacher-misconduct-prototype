import { wizard } from 'govuk-prototype-rig'

export function yourOrganisationWizard (req) {
  const journey = {
    '/report/tasks': {},
    '/report/your-organisation/name': {},
    '/report/your-organisation/address': {},
    '/report/your-organisation/check-answers': {
      '/report/tasks': true
    }
  }

  return wizard(journey, req)
}
