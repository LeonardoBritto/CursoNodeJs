const Tought = require('../models/Tought')
const User = require('../models/User')

const { Op } = require('sequelize')

module.exports = class ToughtController{
    static async showToughts(req, res){
        let search = ''

        if(req.query.search){
            search = req.query.search
        }

        let order = 'DESC'

        if(req.query.order === 'old'){
            order = 'ASC'
        } else {
            order = 'DESC'
        }

        const toughtsData = await Tought.findAll({include: User, where: {title: {[Op.like]: `%${search}%`}}
                                                                ,order: [['createdAt', order]],})

        const toughts = toughtsData.map((result) => result.get({plain: true}))

        let toughtsQty = toughts.length

        if(toughtsQty === 0){
            toughtsQty = false
        }
        console.log(toughts)
        res.render('toughts/home', {toughts, search, toughtsQty})
    }

    static async dashboard(req, res){
        const userId = req.session.userId

        const user = await User.findOne({where: {id : userId}, include: Tought, plain: true})

        if(!user){
            res.redirect('/login')
        }

        const toughts = user.Toughts.map((result) => result.dataValues)

        let emptyToughts = false

        if(toughts.length === 0){
            emptyToughts = true
        }

        res.render('toughts/dashboard', {toughts, emptyToughts}) 
    }

    static async removeTought(req, res){
        const id = req.body.id
        const UserId = req.session.userId

        try {
            await Tought.destroy({where: {id: id, UserId: UserId}})

            req.flash('message', 'Pensamento excluido com sucesso')

            req.session.save(() => {
            res.redirect('/toughts/dashboard')
            })    
        } catch (error) {
            console.log(error)
        }
    }

    static async createTought(req, res){
        res.render('toughts/create')
    }

    static async createToughtPost(req, res){
        const tougth = {
            title: req.body.title,
            UserId: req.session.userId
        }

        try {
            await Tought.create(tougth)

            req.flash('message', 'Pensamento criado com sucesso')

            req.session.save(() => {
            res.redirect('/toughts/dashboard')
            })    
        } catch (error) {
            console.log(error)
        }    
    }

    static async updateTought(req, res){
        const id = req.params.id

        const toughts = await Tought.findOne({where: {id: id}, raw: true})

        res.render('toughts/edit', {toughts})
    }

    static async updateToughtPost(req, res){
        const id = req.body.id
        
        const tought = {
            title: req.body.title
        }   
        
        try {
            await Tought.update(tought, {where: {id: id}})

            req.flash('message', 'Pensamento atualizado com sucesso')

            req.session.save(() => {
            res.redirect('/toughts/dashboard')
            })    
        } catch (error) {
            console.log(error)
        }    
    }
}