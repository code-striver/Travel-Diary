import { ObjectId } from "mongodb"
import { getDB } from "../../config/mongodb.js"
export class UserRepository{
    constructor(){
        this.collectionName = 'users'
    }
     async signUp(newUser){
        try{
        const db = getDB()
        const usersCollection = db.collection('users')
        const checkIfEmailExistsAlready = await usersCollection.findOne({email:newUser.email})
        if(checkIfEmailExistsAlready){
            return {message:'User already exists'}
        }
        await usersCollection.insertOne(newUser)
        const result = {message:'Your Account is created', ...newUser}
        return result
        }catch(err){
            console.log(`error in signUp static function of userModel ${err}`)
        }
    }
    async findByEmail(email){
        const db = getDB();
        const usersCollection = db.collection('users')
       const userWithEmail =  await usersCollection.findOne({email:email})
       return userWithEmail;
    }
    async findForSearch(queryArr){
        const db = getDB();
        const usersCollection = db.collection('users')
        const searchResult = await usersCollection.aggregate([
            { $match: { $or: [ { name: { $in: queryArr } }, { last_name: { $in: queryArr } } ] }    }, 
            { $project: { _id: 1, name: 1, last_name:1, email:1} }
        ]).toArray();
        return searchResult
    }
    async getAllUsers(){
        const db = getDB();
        const tripCollection = db.collection(this.collectionName);
        const result = await tripCollection.find().toArray()
        return result;
    }
    async findById(id){
        console.log('id recieved by repository is')
        console.log(id)
        const db = getDB();
        const usersCollection = db.collection(this.collectionName)
        const result = await usersCollection.findOne({_id: new ObjectId(id)})
        console.log(result)
        return result
    }
}

