import { wizard } from 'govuk-prototype-rig'

export function exampleWizard (req) {
  const journey = {
    '/refer/start': {},
    '/refer/name': {},
    '/refer/check-answers': {},
    '/refer/confirm': {},
    '/': {}
  }

  return wizard(journey, req)
}
