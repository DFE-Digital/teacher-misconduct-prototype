import { wizard } from 'govuk-prototype-rig'

export function teacherDetailsWizard (req) {
  const journey = {
    '/report/tasks': {},
    '/report/teacher/name': {},
    '/report/teacher/age': {},
    '/report/teacher/nino': {},
    '/report/teacher/trn': {},
    '/report/teacher/qts': {},
    '/report/teacher/check-answers': {
      '/report/tasks': true
    }
  }

  return wizard(journey, req)
}
