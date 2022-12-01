import { wizard } from 'govuk-prototype-rig'

export function previousMisconductWizard (req) {
  const journey = {
    '/report/tasks': {},
    '/report/previous-misconduct/any-previous': {
      '/report/previous-misconduct/check-answers': {
        data: 'report.previous-misconduct.any-previous',
        excludedValue: 'Yes'
      }
    },
    '/report/previous-misconduct/previous-misconduct': {},
    '/report/previous-misconduct/check-answers': {
      '/report/tasks': true
    }
  }

  return wizard(journey, req)
}
