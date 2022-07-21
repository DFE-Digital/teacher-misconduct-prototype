import { wizard } from 'govuk-prototype-rig'
import _ from 'lodash'

function uploadedFilePaths (req) {
  const data = req.session.data
  const files = _.get(data, _.toPath('report.documentation.uploaded-files')) || {}
  const paths = Object.keys(files).map(fileId => {
    return { [`/report/documentation/type/${fileId}`]: {} }
  })
  return Object.assign({}, ...paths)
}

export function documentationWizard (req) {
  const journey = {
    '/report/tasks': {},
    '/report/documentation/anything-to-upload': {
      '/report/documentation/check-answers': {
        data: 'report.documentation.anything-to-upload',
        value: 'No'
      }
    },
    '/report/documentation/add': {},
    '/report/documentation/uploaded': {},
    ...uploadedFilePaths(req),
    '/report/documentation/check-answers': {
      '/report/tasks': true
    }
  }

  return wizard(journey, req)
}
