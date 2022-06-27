import { wizard } from 'govuk-prototype-rig'

export function referWizard (req) {
  const journey = {
    '/refer/start': {},
    '/refer/name': {},
    '/refer/where': {},
    '/refer/what': {},
    '/refer/check-answers': {},
    '/refer/confirm': {},
    '/': {}
  }

  return wizard(journey, req)
}
