import {ObjectId} from 'mongodb'
import { getDB } from "../../config/mongodb.js";
export default class TripRepository{
    constructor(){
        this.collectionName = 'trips'
    }
    async addTrip(newTrip){
        const db = getDB();
        const tripCollection = db.collection(this.collectionName);
       const result = await tripCollection.insertOne(newTrip)
       return result
    }
    async getUserTripsById(id){
        console.log('id recieved in getUserTripsById in repository is')
        console.log(id)
        const db = getDB();
        const tripCollection = db.collection(this.collectionName);
        const result = await tripCollection.find({userID:id}).toArray()
        return result 
    }
    async deleteTrip(id){
        const db = getDB();
        const tripCollection = db.collection(this.collectionName);
        await tripCollection.deleteOne({_id: new ObjectId(id)})
    }
    async updateTripById(id, updatedTrip){
        const db = getDB();
        const tripCollection = db.collection(this.collectionName);
        const result =await tripCollection.updateOne({_id:new ObjectId(id)}, { $set: updatedTrip })
        return result
    }
    
}