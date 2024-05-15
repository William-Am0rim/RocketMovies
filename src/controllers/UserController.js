const knex = require('../database/knex');
const bcrypt = require('bcrypt');
const AppError = require('../utils/AppError');

class UserController {
    async create(req, res) {
        const { name, email, password, avatar } = req.body;

        try {
            const validateUserEmail = await knex('users').where({ email }).first();
            if (validateUserEmail) {
                throw new AppError('User already exists');
            }

            const hashPassword = await bcrypt.hash(password, 8);

            const createUser = await knex('users').insert({
                name,
                email,
                password: hashPassword, // Store the hashed password
                avatar
            });

            res.status(201).json({ name, email, avatar });
        } catch (error) {
            res.status(error.statusCode || 500).json({ error: error.message });
        }
    }

    async showOne(req, res){
        const {id} = req.params

       try{
        const user = await knex('users').where({id}).first()

        if(!user){
            throw new AppError('User is not exitend')
        }

        return res.status(200).json(user)
       }catch(error){
            throw new AppError(error)
       }

    }

    async update(req, res) {
        const { name, email, password, old_password, avatar } = req.body;
        const { id } = req.params;
    
        const user = await knex('users').where({ id }).first();
    
        if (!user) {
            throw new AppError('User does not exist');
        }

        const validatePassword = await bcrypt.compare(old_password, user.password);
    
        if (!validatePassword) {
            throw new AppError('Invalid password');
        }
    
        const existingUser = await knex('users').where({email}).first();
        
    
        if (existingUser) {
            throw new AppError('Email already exists');
        }

        const hashPassword = await bcrypt.hash(password, 8)

        const updateUser = await knex('users').where({ id }).update({
            name,
            email,
            password: hashPassword,
            avatar
        });
    

        return res.status(200).json({name, email, hashPassword, avatar});
    }

    async show(req, res){
     try{
        const usersAll = await knex.select('name', 'email', 'avatar').from('users')

        return res.status(200).json(usersAll)
        
     }catch(error){
        throw new AppError(error)
     }
    }

}

module.exports = UserController;