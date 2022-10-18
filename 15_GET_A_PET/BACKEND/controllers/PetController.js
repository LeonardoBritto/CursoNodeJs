const Pet = require('../models/Pet')

const getToken = require('../helpers/get-token')
const getUserByToken = require('../helpers/get-user-by-token')
const ObjectId = require('mongoose').Types.ObjectId

module.exports = class PetController{
    static async create(req, res){
        const { name, age, weight ,color } = req.body

        const images = req.files

        const available = true

        //validations
        if(!name){
            res.status(422).json({message: 'Nome Obrigatório'})  
            return     
        }

        if(!age){
            res.status(422).json({message: 'Idade Obrigatória'})  
            return     
        }

        if(!weight){
            res.status(422).json({message: 'Peso Obrigatório'})  
            return     
        }

        if(!color){
            res.status(422).json({message: 'Cor Obrigatória'})  
            return     
        }

        if(images.length === 0){
            res.status(422).json({message: 'Imagen(s) Obrigatória(s)'})  
            return      
        }

        const token = getToken(req)
        const user = await getUserByToken(token)

        const pet = new Pet({
            name,
            age,
            weight,
            color,
            available,
            images: [],
            user: {
                _id: user._id,
                name: user.name,
                image: user.image,
                phone: user.phone, 
            }
        })

        images.map((image) => {
            pet.images.push(image.filename)
        })

        try {
            const newPet = await pet.save()
            res.status(201).json({message: 'Pet cadastrado com sucesso', newPet})
        } catch (error) {
            res.status(500).json({message: error})
        }
    }

    static async getAll(req, res){
        const pets = await Pet.find().sort('-createdAt')

        res.status(200).json({pets: pets})
    }

    static async getAllUserPet(req, res){
        const token = getToken(req)
        const user = await getUserByToken(token)

        const pets = await Pet.find({'user._id': user._id}).sort('-createdAt')

        res.status(200).json({pets: pets})
    }

    static async getAllUserAdoptions(req, res){
        const token = getToken(req)
        const user = await getUserByToken(token)

        const pets = await Pet.find({'adopter._id': user._id}).sort('-createdAt')

        res.status(200).json({pets: pets})    
    }

    static async getPetById(req, res){
        const id = req.params.id
        
        if(!ObjectId.isValid(id)){
            res.status(422).jason({message: 'ID inválido!'})
            return
        }

        const pet = await Pet.findOne({_id: id})

        if(!pet){
            res.status(404).json({message: 'Pet não encontrado'})
            return
        }

        res.status(200).json({pet: pet})
    }

    static async removePetById(req, res){
        const id = req.params.id
        
        if(!ObjectId.isValid(id)){
            res.status(422).jason({message: 'ID inválido!'})
            return
        }

        const pet = await Pet.findOne({_id: id})

        if(!pet){
            res.status(404).json({message: 'Pet não encontrado'})
            return
        }  

        if(!pet){
            res.status(404).json({message: 'Pet não encontrado'})
            return
        }

        const token = getToken(req)
        const user = await getUserByToken(token)

        if(pet.user._id.toString() !== user._id.toString()){
            res.status(422).json({message: 'Usuário sem permissão para excluir este Pet!'})
            return    
        }

        await Pet.findByIdAndRemove(id)

        res.status(200).json({message: 'Pet Removido com sucesso'})
    }

    static async updatePet(req, res){
        const id = req.params.id

        const { name, age, weight ,color, available } = req.body

        const images = req.files

        const updateData = {}

        const pet = await Pet.findOne({_id: id})

        if(!pet){
            res.status(404).json({message: 'Pet não encontrado'})
            return
        }  

        const token = getToken(req)
        const user = await getUserByToken(token)

        if(pet.user._id.toString() !== user._id.toString()){
            res.status(422).json({message: 'Usuário sem permissão para excluir este Pet!'})
            return    
        }

        if(!name){
            res.status(422).json({message: 'Nome Obrigatório'})  
            return     
        }

        updateData.name = name

        if(!age){
            res.status(422).json({message: 'Idade Obrigatória'})  
            return     
        }

        updateData.age = age

        if(!weight){
            res.status(422).json({message: 'Peso Obrigatório'})  
            return     
        }

        updateData.weight = weight

        if(!color){
            res.status(422).json({message: 'Cor Obrigatória'})  
            return     
        }

        updateData.color = color

        if(images.length === 0){
            res.status(422).json({message: 'Imagen(s) Obrigatória(s)'})  
            return      
        }

        updateData.images = []
        images.map((image) => {
            updateData.images.push(image.filename)
        })

        await Pet.findByIdAndUpdate(id, updateData)

        res.status(200).json({message: 'Pet atualizado com sucesso'})
    }

    static async schedole(req, res){
        const id = req.params.id

        const pet = await Pet.findOne({_id: id})

        if(!pet){
            res.status(404).json({message: 'Pet não encontrado'})
            return 
        }

        const token = getToken(req)
        const user = await getUserByToken(token)

        if(pet.user._id.equals(user._id)){
            res.status(422).json({message: 'Você não pode agendar uma visita com o próprio Pet!'})
            return    
        }

        if(pet.adopter){
            if(pet.adopter._id.equals(user.id)){
                res.status(422).json({message: 'Você ja agendou uma visita a este Pet!'})
                return     
            }
        }

        pet.adopter = {
            _id: user._id,
            name: user.name,
            image: user.image
        }

        await Pet.findByIdAndUpdate(id, pet)

        res.status(200).json({message: `Visita agendada com sucesso, entre em contato com ${pet.user.name}, pelo telefone ${pet.user.phone}`})
    }

    static async concludeAdoption(req, res){
        const id = req.params.id

        const pet = await Pet.findOne({_id: id})

        if(!pet){
            res.status(404).json({message: 'Pet não encontrado'})
            return 
        }

        const token = getToken(req)
        const user = await getUserByToken(token)

        if(pet.user._id.toString() !== user._id.toString()){
            res.status(422).json({message: 'Usuário sem permissão para excluir este Pet!'})
            return    
        }

        pet.available = false

        await Pet.findByIdAndUpdate(id, pet)

        res.status(200).json({message: 'Adoção Concluida'})
    }
}