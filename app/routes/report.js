import _ from 'lodash'
import { yourDetailsWizard } from '../wizards/report/your-details-wizard.js'
import { yourOrganisationWizard } from '../wizards/report/your-organisation-wizard.js'
import { teacherDetailsWizard } from '../wizards/report/teacher-details-wizard.js'
import { teacherContactDetailsWizard } from '../wizards/report/teacher-contact-details-wizard.js'
import { teacherRoleWizard } from '../wizards/report/teacher-role-wizard.js'
import { allegationWizard } from '../wizards/report/allegation-wizard.js'
import { previousMisconductWizard } from '../wizards/report/previous-misconduct-wizard.js'
import { documentationWizard } from '../wizards/report/documentation-wizard.js'
import { submitWizard } from '../wizards/report/submit-wizard.js'
import { eligibilityWizard } from '../wizards/report/eligibility-wizard.js'

export const reportRoutes = router => {
  router.all('/report/*', (req, res, next) => {
    res.locals.signedIn = true
    res.locals.reportService = true

    res.locals.isPublic = _.get(req.session.data, _.toPath('report.type-of-report')) === 'public'
    res.locals.isEmployer = !res.locals.isPublic

    next()
  })

  router.all('/report/:section/*', (req, res, next) => {
    if (!['eligibility', 'submit'].includes(req.params.section)) {
      res.locals.buttonText = 'Save and continue'
    }
    next()
  })

  router.all([
    '/report/your-details/',
    '/report/your-details/:view'
  ], (req, res, next) => {
    res.locals.paths = yourDetailsWizard(req, res)
    next()
  })

  router.all([
    '/report/your-organisation/',
    '/report/your-organisation/:view'
  ], (req, res, next) => {
    res.locals.paths = yourOrganisationWizard(req)
    next()
  })

  router.all([
    '/report/teacher',
    '/report/teacher/:view'
  ], (req, res, next) => {
    res.locals.paths = teacherDetailsWizard(req, res)
    next()
  })

  router.all([
    '/report/teacher-contact-details/',
    '/report/teacher-contact-details/:view'
  ], (req, res, next) => {
    res.locals.paths = teacherContactDetailsWizard(req, res)
    next()
  })

  router.all([
    '/report/teacher-role/',
    '/report/teacher-role/:view'
  ], (req, res, next) => {
    res.locals.hasLeftJob = _.get(req.session.data, _.toPath('report.teacher-role.still-employed')) === 'No'
    res.locals.paths = teacherRoleWizard(req, res)
    next()
  })

  router.all([
    '/report/allegation/',
    '/report/allegation/:view'
  ], (req, res, next) => {
    res.locals.paths = allegationWizard(req, res)
    next()
  })

  router.all([
    '/report/previous-misconduct/',
    '/report/previous-misconduct/:view'
  ], (req, res, next) => {
    res.locals.paths = previousMisconductWizard(req, res)
    next()
  })

  router.post('/report/documentation/add/', (req, res, next) => {
    const { isEmployer } = res.locals

    if (isEmployer) {
      req.session.data.report.documentation['uploaded-files'] = {
        '001': { filename: 'main-investigation.pdf' },
        '002': { filename: 'police-investigation.docx' },
        '003': { filename: 'signed-witness-statements.pdf' },
        '004': { filename: 'cctv-footage.mp4' }
      }
    } else {
      req.session.data.report.documentation['uploaded-files'] = {
        '001': { filename: 'school-complaint.pdf' },
        '002': { filename: 'emails-from-school.docx' },
        '003': { filename: 'local-authority-email.pdf' }
      }
    }

    next()
  })

  router.all([
    '/report/documentation/',
    '/report/documentation/:view',
    '/report/documentation/type/:id'
  ], (req, res, next) => {
    res.locals.paths = documentationWizard(req)
    next()
  })

  router.get('/report/documentation/type/:id', (req, res) => {
    const file = req.session.data.report.documentation['uploaded-files'][req.params.id]
    res.locals.file = file
    res.locals.fileId = req.params.id
    res.render('report/documentation/type.html')
  })

  router.all([
    '/report/documentation/check-answers',
    '/report/submit/review'
  ], (req, res, next) => {
    const data = req.session.data
    const files = _.get(data, _.toPath('report.documentation.uploaded-files')) || {}
    const fileRows = []

    // file.type ? file.type.join(' ') : 'No type',

    for (const [fileId, file] of Object.entries(files)) {
      let fileTypes = file.type ? file.type.join(', ') : 'No type'
      fileTypes = 'Type:<br />' + fileTypes.replace('Other', `Other: ${file['other-type']}`)

      fileRows.push({
        key: {
          html: `<a href="#">${file.filename}</a>`
        },
        value: {
          html: fileTypes
        },
        actions: {
          items: [
            {
              text: 'Change',
              href: `/report/documentation/edit-file/${fileId}`
            },
            {
              text: 'Delete',
              href: '#'
            }
          ]
        }
      })
    }

    res.locals.fileRows = fileRows
    next()
  })

  router.all([
    '/report/submit/',
    '/report/submit/:view'
  ], (req, res, next) => {
    res.locals.paths = submitWizard(req, res)
    next()
  })

  router.all([
    '/report',
    '/report/eligibility/:view',
    '/report/:view'
  ], (req, res, next) => {
    res.locals.paths = eligibilityWizard(req, res)
    next()
  })

  router.post([
    '/report/:view',
    '/report/eligibility/:view',
    '/report/your-details/:view',
    '/report/your-organisation/:view',
    '/report/teacher-contact-details/:view',
    '/report/teacher-role/:view',
    '/report/allegation/:view',
    '/report/previous-misconduct/:view',
    '/report/documentation/:view',
    '/report/documentation/type/:id',
    '/report/submit/:view',
    '/report/teacher/:view'
  ], (req, res) => {
    res.redirect(res.locals.paths.next)
  })
}
