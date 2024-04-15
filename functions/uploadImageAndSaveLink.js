const { getStorage } = require('firebase-admin/storage') 
const admin = require('firebase-admin')
const storage = getStorage() 

exports.uploadImageAndSaveLink = async (request) => {
  const { base64Image, uid } = request
  const bucket = storage.bucket()  
  try {
    const userSnapshot = await admin.database().ref(`users/${uid}/account`).once('value') 
    const userData = userSnapshot.val() 
    const lastName = userData?.last_name  
    const fileName = `educators/${Date.now()}__${lastName}.png`
    const imageBuffer = Buffer.from(base64Image, "base64")
    await bucket.file(fileName).save(imageBuffer, {
      metadata: {
        contentType: "image/png",
      },
    })
    const imageUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`
    return { imageUrl }
  } catch (error) {
    console.error("Error uploading image:", error)
  }
}