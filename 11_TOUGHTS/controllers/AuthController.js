const User = require('../models/User')
const bcrypt = require('bcryptjs')

module.exports = class AuthController {
    static login(req, res){
        res.render('auth/login')
    }

    static async loginPost(req, res){
        const {email, password} = req.body

        const user = await User.findOne({where: {email: email}}) 
        
        if(!user){
            req.flash('message', 'Usuário não encontrado!')
            res.render('auth/login')
            return    
        }

        const passwordMatch = bcrypt.compareSync(password, user.password)

        if(!passwordMatch){
            req.flash('message', 'Senha incorreta!')
            res.render('auth/login')
            return
        }

        req.session.userId = user.id

        req.flash('message', 'Login realizado com sucesso!')

        req.session.save(() => {
            res.redirect('/')
        })          
    }

    static register(req, res){
        res.render('auth/register')
    }

    static async registerPost(req, res){
        const {name, email, password, confirmpassword} = req.body

        //VALIDANDO SENHA
        if(password != confirmpassword){
            req.flash('message', 'Senhas não conferem, tente novamente!')
            res.render('auth/register')
            return
        }

        //VALIDANDO SE USUARIO JÁ EXISTE, PELO E-MAIL
        const checkIfUserExist = await User.findOne({where: {email: email}})

        if(checkIfUserExist){
            req.flash('message', 'E-mail ja esta en uso!')
            res.render('auth/register')
            return     
        }

        //CRIANDO SENHA
        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(password, salt)

        const user = {
            name,
            email,
            password: hashedPassword
        }

        try {
            const createdUser = await User.create(user) 

            req.session.userId = createdUser.id

            req.flash('message', 'Cadastro realizado, com sucesso!')

            req.session.save(() => {
                res.redirect('/')
            })               
        } catch (error) {
            console.log(error)    
        }        
    }

    static logout(req, res) {
        req.session.destroy()
        res.redirect('/login')
    }
}