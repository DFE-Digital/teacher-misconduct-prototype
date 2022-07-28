import { wizard } from 'govuk-prototype-rig'

export function teacherDetailsWizard (req, res) {
  const { isEmployer } = res.locals
  const journey = {
    '/report/tasks': {},
    '/report/teacher/name': {},
    '/report/teacher/age': {},
    ...isEmployer ? {
      '/report/teacher/nino': {},
      '/report/teacher/trn': {},
      '/report/teacher/qts': {}
    } : {},
    '/report/teacher/check-answers': {
      '/report/tasks': true
    }
  }

  return wizard(journey, req)
}
