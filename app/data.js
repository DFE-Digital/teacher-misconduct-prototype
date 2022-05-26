import { Info } from 'luxon'

/**
 * Default values for user session data
 *
 * These are automatically added via the `autoStoreData` middleware. A values
 * will only be added to the session if it doesn't already exist. This may be
 * useful for testing journeys where users are returning or logging in to an
 * existing application.
 */
export default {
  // Set feature flags using the `features` key
  features: {
    exampleFeature: {
      on: false,
      name: 'Example',
      description: 'Example'
    }
  },
  weekdays: {
    long: Info.weekdays(),
    short: Info.weekdays('short')
  },
  months: Info.months(),
  calendar: {},
  bankHolidays: [],
  unavailability: [
    '2022-01-20',
    '2022-01-21',
    '2022-01-22',
    '2022-02-20',
    '2022-03-21',
    '2022-05-22'
  ]
}
