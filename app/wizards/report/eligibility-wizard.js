import { wizard } from 'govuk-prototype-rig'

export function eligibilityWizard (req) {
  const journey = {
    '/report/start': {},
    '/report/who': {},
    '/report/email': {},
    '/report/email-code': {},
    '/report/eligibility/jurisdiction': {
      '/report/eligibility/no-jurisdiction': {
        data: 'report.eligibility.teacher-england',
        value: 'No'
      }
    },
    '/report/eligibility/serious': {
      '/report/eligibility/not-serious-misconduct': {
        data: 'report.eligibility.serious',
        value: 'No'
      }
    },
    '/report/tasks': {}
  }

  return wizard(journey, req)
}
