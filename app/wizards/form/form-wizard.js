import { wizard } from 'govuk-prototype-rig'

export function formWizard (req, res) {
  const { isPublic } = res.locals

  const journey = {
    '/form/start': {
      '/form/what-happens': {}
    },
    '/form/who': {},
    ...isPublic ? {
      '/form/public-other-options': {
        '/form/no-complaint': {
          data: 'report.eligibility.made-complaint',
          value: 'No'
        }
      }
    } : {},
    '/form/jurisdiction': {
      '/form/possible-jurisdiction': {
        data: 'report.eligibility.are-they-teacher',
        excludedValue: 'Yes'
      },
      '/form/england': true
    },
    '/form/possible-jurisdiction': {
      '/form/no-jurisdiction-unsupervised': {
        data: 'report.eligibility.teacher-unsupervised',
        value: 'No'
      }
    },
    '/form/england': {
      '/form/no-jurisdiction-england': {
        data: 'report.eligibility.teacher-in-england',
        value: 'No'
      }
    },
    '/form/serious': {
      '/form/not-serious-misconduct': {
        data: 'report.eligibility.serious',
        value: 'No'
      }
    },
    '/form/you-should-know': {},
    '/form/download-forms': {}
  }

  return wizard(journey, req)
}