const axios = require('axios')
const cloudinary = require('cloudinary')

function fileUploadMiddleware(req, res) {
  cloudinary.uploader.upload_stream((result) => {
    console.log(`${req.headers.origin}/api/changeProfilePicture`)
    axios({
      url: `${req.headers.origin}/api/changeProfilePicture`, //API endpoint that needs file URL from CDN
      method: 'post',
      data: {
        url: result.secure_url,
        name: req.body.name,
        description: req.body.description,
      },
    }).then((response) => {
      // you can handle external API response here
      res.status(200).json({ success: true, fileUrl: result.secure_url })
    }).catch((error) => {
      console.log(error)
      res.status(500).json(error.response.data);
    });
  }).end(req.file.buffer);
}

module.exports = fileUploadMiddleware