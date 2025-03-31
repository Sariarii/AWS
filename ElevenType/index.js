const { CreateTable } = require('./ElevenCreateDB')
const {PutJson} = require('./PutJsonDB')
const {uploadFiles} = require('./BucketS3')
async function Main(){
    await uploadFiles()
    await CreateTable()
    await PutJson()
}

Main()