import { wizard } from 'govuk-prototype-rig'

export function teacherContactDetailsWizard (req) {
  const journey = {
    '/report/tasks': {},
    '/report/teacher-contact-details/email': {},
    '/report/teacher-contact-details/telephone': {},
    '/report/teacher-contact-details/address': {},
    '/report/teacher-contact-details/check-answers': {
      '/report/tasks': true
    }
  }

  return wizard(journey, req)
}
