import { wizard } from 'govuk-prototype-rig'

export function teacherRoleWizard (req, res) {
  const { isEmployer, isPublic } = res.locals

  const journey = {
    '/report/tasks': {},
    ...isEmployer ? {
      '/report/teacher-role/start-date': {},
      '/report/teacher-role/end-date': {}
    } : {},
    '/report/teacher-role/job-title': {},
    '/report/teacher-role/school': {},
    '/report/teacher-role/duties': {
      '/report/teacher-role/check-answers': {
        data: 'report.teacher-role.still-employed',
        excludedValue: 'No'
      }
    },
    '/report/teacher-role/teaching-somewhere-else': {
      '/report/teacher-role/check-answers': {
        data: 'report.teacher-role.teaching-elsewhere',
        excludedValue: 'Yes'
      }
    },
    '/report/teacher-role/teaching-where-now': {},
    '/report/teacher-role/check-answers': {
      '/report/tasks': true
    }
  }

  return wizard(journey, req)
}
