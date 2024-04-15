const {setGlobalOptions} = require("firebase-functions/v2")
const { initializeApp } = require('firebase-admin/app')

initializeApp()

setGlobalOptions({maxInstances: 10})

const setupAccount = require('./setupAccount')
exports.createaccount = setupAccount.setupAccount

const updateAccountInfo = require('./updateAccountInfo')
exports.updateaccount = updateAccountInfo.updateAccountInfo

const updateExperienceStep = require('./updateExperienceStep')
exports.updateexperiencestep = updateExperienceStep.updateExperienceStep

const updateReachStep = require('./updateReachStep')
exports.updatereachstep = updateReachStep.updateReachStep

const updateEducatorProfile = require('./updateEducatorProfile')
exports.updateeducatorprofile = updateEducatorProfile.updateEducatorProfile