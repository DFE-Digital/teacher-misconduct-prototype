import { wizard } from 'govuk-prototype-rig'
import _ from 'lodash'

function uploadedFilePaths (req) {
  const data = req.session.data
  const files = _.get(data, _.toPath('report.adam.uploaded-files')) || {}
  const paths = Object.keys(files).map(fileId => {
    return { [`/report/adam/type/${fileId}`]: {} }
  })
  return Object.assign({}, ...paths)
}

export function eligibilityWizard (req, res) {
  const { isPublic } = res.locals

  const journey = {
    '/report/start': {},
    '/report/email': {},
    '/report/email-code': {},
    '/report/who': {},
    ...isPublic ? {
      '/report/eligibility/public-other-options': {
        '/report/eligibility/no-complaint': {
          data: 'report.eligibility.made-complaint',
          value: 'No'
        }
      }
    } : {},
    '/report/eligibility/jurisdiction': {
      '/report/eligibility/possible-jurisdiction': {
        data: 'report.eligibility.are-they-teacher',
        excludedValue: 'Yes'
      },
      '/report/eligibility/england': true
    },
    '/report/eligibility/possible-jurisdiction': {
      '/report/eligibility/no-jurisdiction-unsupervised': {
        data: 'report.eligibility.teacher-unsupervised',
        value: 'No'
      }
    },
    '/report/eligibility/england': {
      '/report/eligibility/no-jurisdiction-england': {
        data: 'report.eligibility.teacher-in-england',
        value: 'No'
      }
    },
    '/report/eligibility/serious': {
      '/report/eligibility/not-serious-misconduct': {
        data: 'report.eligibility.serious',
        value: 'No'
      }
    },
    '/report/eligibility/you-should-know': {},
    ...isPublic ? {
      '/report/adam/test': {
      },
      '/report/adam/anything-to-upload': {
        '/report/adam/wheevers': {
          data: 'report.adam.anything-to-upload',
          value: 'No'
        }
      },
      '/report/adam/add': {},
      '/report/adam/uploaded': {},
      ...uploadedFilePaths(req),
      '/report/adam/check-answers': {}
    } : {
      '/report/eligibility/save-as-you-go': {},
      '/report/tasks': {},
      '/report/submit/review': {}
    }
  }

  return wizard(journey, req)
}
