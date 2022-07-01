import { wizard } from 'govuk-prototype-rig'

export function teacherRoleWizard (req) {
  const journey = {
    '/report/tasks': {},
    '/report/teacher-role/start-date': {},
    '/report/teacher-role/end-date': {},
    '/report/teacher-role/job-title': {},
    '/report/teacher-role/school': {},
    '/report/teacher-role/check-answers': {
      '/report/tasks': true
    }
  }

  return wizard(journey, req)
}
