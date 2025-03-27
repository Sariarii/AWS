const { CreateTable } = require('./CreateDynamoDB')
const {InsertEleve} = require('./PutDynamoDB')
const {PutJson} = require('./PutJsonDynamoDB')
const {UpdateEleve} = require('./UpdateDynamoDB')
const {GetEleve}= require('./GetElevesDynamoDB')

async function main(){
await CreateTable()
await InsertEleve(1,"Alice",12,"6ème")
await InsertEleve(2,"Bob",13,"5ème")
await PutJson()
await UpdateEleve(1,"Alice",13,"5ème")
await UpdateEleve(3,"Charles",14,"6ème")
await GetEleve(1)
await GetEleve(2)
await GetEleve(3)
await GetEleve(4)
}

main()