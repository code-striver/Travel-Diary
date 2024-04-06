import UserModel from "./user.model.js";
import { UserRepository } from "./user.repository.js";
import jwt from 'jsonwebtoken'
export default class UserController{
    constructor(){
        this.userRepository = new UserRepository()
    }
    async signUp(req, res){
        const {name, lastName, email, password} = req.body;
        const user = UserModel.signUp(name, lastName, email, password)
        const response = await this.userRepository.signUp(user)
        res.status(201).send(response)
    }
    async loginUser(req, res){
        const {email, password} = req.body;
        const verifiedByEmail = await this.userRepository.findByEmail(email);
        if(!verifiedByEmail){
            res.status(400).send({result:'Incorrect Email'})
        }else{
            const verificationBoolean = (verifiedByEmail.password == password)
                //creating JWT for successful login
            if(verificationBoolean){
                const token = jwt.sign({UserID:verifiedByEmail._id, 
                    email:verifiedByEmail.email}, 'gAmhmrCfWSl9CdRuFZ6SIS1zYXohdmjHFFuUcck', {
                        algorithm:'HS256',
                        expiresIn: '10h'
                    })
                return res.cookie('jwt', token).status(200).send({name:verifiedByEmail.name, result:"you are in",token}) 
            }else{
                return res.status(400).send({result:'Incorrect password'})
            } 
        }
    }
    
    signOut(req, res){
        if(req.cookies){
            res.clearCookie('jwt').send('you have been logged out')
        }else{
            res.send('you are not logged in')
        }
    }
    async searchUsers(req, res){
        try {
        const searchedString = req.body.search;
        const searchedWords = searchedString.split(' ')
        console.log('reached searchUsers')
        console.log(searchedWords[0]);
       const result = await this.userRepository.findForSearch(searchedWords)
       return res.status(200).send(result)
        } catch (error) {
            console.log(`error in search controller ${error}`)
        }
    }
    async getAll(req, res){
        const result = await this.userRepository.getAllUsers();
        return res.send(result)
    }
    async sendUserProfile(req, res){
        const result = await this.userRepository.findById(req.userID);
        return res.send(result)
        
    }

}
