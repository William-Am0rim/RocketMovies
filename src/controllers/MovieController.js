const knex = require('../database/knex');
const AppError = require('../utils/AppError');

class MovieController {
    async create(req, res) {
        const { title, description, rating, tags } = req.body;
        const {user_id} = req.params

        try {
            const validateMovie = await knex('movie_notes').where({ user_id, title }).first();
            if (validateMovie) {
                throw new AppError('Movie already exists');
            }


            const [movie_id] = await knex('movie_notes').insert({
                title, 
                description, 
                rating,
                user_id
            });


            const tagsInsert = tags.map(name =>{
                return{
                    movie_id,
                    name,
                    user_id 
                }
            })

            await knex('tags_notes').insert(tagsInsert);


            res.status(201).json();
        } catch (error) {
            res.status(error.statusCode || 500).json({ error: error.message });
        }
    }

    async show(req, res){
        const {id} = req.params

        const movie = await knex('movie_notes').where({id}).first()
        const tags = await knex('tags_notes').where({movie_id : id}).orderBy('name')

        return res.status(200).json({...movie, tags})
    }

    async delete(req, res){
    const {id} = req.params

    try{
        const validateExistendMovie = await knex('movie_notes').where({id}).first();

        if(!validateExistendMovie){
            throw new AppError('Movie is not existend')
        }

        const deleteMovie = await knex('movie_notes').where({id}).delete()
        
        return res.status(200).json()
    }catch(error){
            throw new AppError(error)
        }
    }

    
}

module.exports = MovieController;