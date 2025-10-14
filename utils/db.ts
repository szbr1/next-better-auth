import {MongoClient} from "mongodb"


const client = new MongoClient(process.env.DB_URI as string)
const db = client.db();



export default db