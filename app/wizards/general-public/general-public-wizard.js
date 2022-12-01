import { wizard } from 'govuk-prototype-rig'

export function publicWizard (req, res) {
  const { isPublic } = res.locals

  const journey = {
    '/general-public/start': {
      '/general-public/what-happens': {}
    },
    '/general-public/email': {},
    '/general-public/email-code': {},
    '/general-public/who': {},
    ...isPublic ? {
      '/general-public/public-other-options': {
        '/general-public/no-complaint': {
          data: 'report.eligibility.made-complaint',
          value: 'No'
        }
      }
    } : {},
    '/general-public/jurisdiction': {
      '/general-public/possible-jurisdiction': {
        data: 'report.eligibility.are-they-teacher',
        excludedValue: 'Yes'
      },
      '/general-public/england': true
    },
    '/general-public/possible-jurisdiction': {
      '/general-public/no-jurisdiction-unsupervised': {
        data: 'report.eligibility.teacher-unsupervised',
        value: 'No'
      }
    },
    '/general-public/england': {
      '/general-public/no-jurisdiction-england': {
        data: 'report.eligibility.teacher-in-england',
        value: 'No'
      }
    },
    '/general-public/serious': {
      '/general-public/not-serious-misconduct': {
        data: 'report.eligibility.serious',
        value: 'No'
      }
    },
    '/general-public/you-should-know': {},
    '/general-public/save-as-you-go': {},
    '/general-public/dont-worry': {},
    '/general-public/name': {},
    '/general-public/telephone': {},
    '/general-public/teacher-name': {},
    '/general-public/job-title': {},
    '/general-public/allegation': {},
    '/general-public/already-considered': {},
    '/general-public/anything-to-upload': {
      '/general-public/check-answers': {
        data: 'report.documentation.anything-to-upload',
        value: 'No'
      }
    },
    '/general-public/add': {},
    '/general-public/uploaded': {},
    '/general-public/type': {},
    '/general-public/check-answers': {},
    '/general-public/review': {},
    '/general-public/declaration': {},
    '/general-public/confirmation': {}
  }

  return wizard(journey, req)
}

//     ...uploadedFilePaths(req),
