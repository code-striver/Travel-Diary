

import { MongoClient } from "mongodb";

const url = 'mongodb://127.0.0.1:27017/travel_planner'
let client;
export const connectToMongoDB = ()=>{
    MongoClient.connect(url)
    .then((clientInstacne)=>{
        client = clientInstacne
        console.log('connected to mongoDB server')
    }).catch((err)=>{
        console.log(`the error occured during connecting to MongoDB server is ${err}`)
    })
}
export const  getDB = ()=>{
    const db = client.db()
    return db
}


