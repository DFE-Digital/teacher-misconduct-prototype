import { wizard } from 'govuk-prototype-rig'

export function reportWizard (req) {
  const journey = {
    '/report/start': {},
    '/report/name': {},
    '/report/where': {},
    '/report/what': {},
    '/report/check-answers': {},
    '/report/confirm': {},
    '/': {}
  }

  return wizard(journey, req)
}
