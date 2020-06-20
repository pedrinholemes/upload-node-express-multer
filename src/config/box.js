var BoxSDK = require('box-node-sdk');

// Initialize the SDK with your app credentials
var sdk = new BoxSDK({
    clientID: 'v4jv9z5jn9v9dtq7f6ahu46ft6ymc92a',
    clientSecret: 'TtWPXcseRy0B82tjjf4t8Rw2OQwSceJt'
});

// Create a basic API client, which does not automatically refresh the access token
var client = sdk.getBasicClient('sUw3mBNCzdEIUbnJG9DSwUTCfU6RBM2p');

// Get your own user object from the Box API
// All client methods return a promise that resolves to the results of the API call,
// or rejects when an error occurs
const box = {}

box.uploadFile = (file) => {
    client.files.uploadFile('uploadFile', file.key, file)
        .then(fileObject => { console.log(fileObject) })
        .catch(error => { console.log(error) });
}
box.tumbFile = (fileId) => {
    client.files.getThumbnail(fileId)
        .then(thumbnailInfo => {
            if (thumbnailInfo.location) {
                console.log(thumbnailInfo.location)
                return thumbnailInfo.location
            } else if (thumbnailInfo.file) {
                console.log(thumbnailInfo.file)
                return thumbnailInfo.file
            } else {
                console.log('THUMBNAIL NOT FOUND')
                return new Error(404)
            }
        });
}

module.exports = box