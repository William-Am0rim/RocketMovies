const knex = require("knex");

exports.up = knex => knex.schema.createTable('tags_notes', table => {
    table.increments('id');
    
    table.integer('user_id').references('id').inTable('users');
    table.integer('movie_id').references('id').inTable('movie_notes').onDelete('CASCADE');
    
    table.text('name');
});

exports.down = knex => knex.schema.dropTable('tags_notes');