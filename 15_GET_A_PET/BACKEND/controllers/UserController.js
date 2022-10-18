const User = require('../models/User')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//Helpers
const createUserToken = require('../helpers/create-user-token')
const getToken = require('../helpers/get-token')
const getUserByToken = require('../helpers/get-user-by-token')

module.exports = class UserController {
    static async register(req, res){
        const {name, email, phone, password, confirmpassword} = req.body
        
        //validações
        if(!name){
            res.status(422).json({message: 'Nome Obrigatório'})  
            return      
        }

        if(!email){
            res.status(422).json({message: 'E-mail Obrigatório'})  
            return      
        }

        if(!phone){
            res.status(422).json({message: 'Telefone Obrigatório'})  
            return      
        }

        if(!password){
            res.status(422).json({message: 'Senha Obrigatória'})  
            return      
        }

        if(!confirmpassword){
            res.status(422).json({message: 'Confirmação de senha Obrigatória'})  
            return      
        }

        if(password != confirmpassword){
            res.status(422).json({message: 'Senhas não conferem'})  
            return   
        }

        const userExist = await User.findOne({email: email})

        if(userExist){
            res.status(422).json({message: 'Email já cadastrado'})  
            return     
        }

        //criando senha criptografada
        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(password, salt)

        //create user
        const user = new User({
            name,
            email,
            phone,
            password: passwordHash
        })

        try {
            const newUser = await user.save()
            await createUserToken(newUser, req, res) 
        } catch (error) {
            res.status(500).json({message: error})
        }
    }

    static async login(req, res){
        const {email, password} = req.body

        //Validations
        if(!email){
            res.status(422).json({message: 'E-mail Obrigatório'})  
            return      
        }

        if(!password){
            res.status(422).json({message: 'Senha Obrigatória'})  
            return      
        }

        //check user exist
        const user = await User.findOne({email: email})

        if(!user){
            res.status(422).json({message: 'Não ha usuario cadastrado com esse email!'})
            return
        }

        //check password
        const checkPassword = await bcrypt.compare(password, user.password)

        if(!checkPassword){
            res.status(422).json({message: 'Senha incorreta!'})
            return   
        }

        await createUserToken(user, req, res) 
    }

    static async checkUser(req, res){
        let currentUser

        if(req.headers.authorization) {
            const token = getToken(req)
            const decoded = jwt.verify(token, "nossosecret")

            currentUser = await User.findById(decoded.id)

            currentUser.password = undefined
        } else {
         currentUser = null
        }

       res.status(200).send(currentUser)
    }

    static async getUserById(req, res){
        const id = req.params.id

        const user = await User.findById(id).select("-password")

        if(!user){
            res.status(422).json({message: 'Usuário não encontrado'})
            return    
        }

        res.status(200).json({user})
    }

    static async editUser(req, res){
        const id = req.params.id

        const token = getToken(req)
        
        const user = await getUserByToken(token)

        if(!user){
            res.status(422).json({message: 'Usuário não encontrado'})
            return       
        }

        const {name, email, phone, password, confirmpassword} = req.body

        if(req.file){
            user.image = req.file.filename
        }

        //Validations
        if(!name){
            res.status(422).json({message: 'Nome Obrigatório'})  
            return      
        }

        user.name = name

        if(!email){
            res.status(422).json({message: 'E-mail Obrigatório'})  
            return      
        }

        const userExist = await User.findOne({email: email})

        if (user.email !== email && userExist) {
            res.status(422).json({ message: 'Por favor, utilize outro e-mail!' })
            return
        }

        user.email = email

        if(!phone){
            res.status(422).json({message: 'Telefone Obrigatório'})  
            return      
        }

        user.phone = phone

        if(!password){
            res.status(422).json({message: 'Senha Obrigatória'})  
            return      
        }

        if(!confirmpassword){
            res.status(422).json({message: 'Confirmação de senha Obrigatória'})  
            return      
        }

        if(password != confirmpassword){
            res.status(422).json({message: 'Senhas não conferem'})  
            return   
        } else if(password === confirmpassword && password != null){
            const salt = await bcrypt.genSalt(12)
            const passwordHash = await bcrypt.hash(password, salt)
            
            user.password = passwordHash
        }
     
        try {
            const updateUser = await User.findOneAndUpdate({_id: user.id}, {$set: user}, {new: true})

            res.status(200).json({message : 'Usuario atualizado com sucesso!', data: updateUser})
        } catch (error) {
            res.status(500).json({message: error})
        }

    }
}
