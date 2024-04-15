const { getDatabase } = require("firebase-admin/database")  
const { onCall } = require("firebase-functions/v2/https")  
const dbCalls = require("./databaseCalls")  
const { uploadImageAndSaveLink } = require("./uploadImageAndSaveLink")  

exports.updateEducatorProfile = onCall(async (request) => {
  const db = getDatabase()  
  let isSuccess = true  
  let errorMessage = null  
  const uid = request.auth.uid  
  const { aboutMe, avatar, website, youtube, twitter, linkedin } = request.data  
  try {
    const educatorProfile = {}  

    if (aboutMe) {
      educatorProfile.about_me = aboutMe  
    }
    if (avatar) {
      educatorProfile.avatar = avatar  
      const result = await uploadImageAndSaveLink({
        base64Image: avatar,
        uid: uid,
      })  
      if (result?.imageUrl) {
        educatorProfile.avatar = result?.imageUrl  
      }
    }
    if (website) {
      educatorProfile.website = website  
    }
    if (youtube) {
      educatorProfile.youtube = youtube  
    }
    if (twitter) {
      educatorProfile.twitter = twitter
    }
    if (linkedin) {
      educatorProfile.linkedin = linkedin  
    }
    // Update educator profile
    db.ref(`users/${uid}/educator/profile`).update(educatorProfile)  
  } catch (error) {
    dbCalls.logUser("ERROR: Update Educator Profile Step: " + error)  
    isSuccess = false  
    errorMessage = error  
  }
  return { isSuccess: isSuccess, errorMessage: errorMessage }  
})  
