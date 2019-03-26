const settings = require("./settings"); // settings.json

var knex = require('knex')({
  client: 'pg',
  connection: {
    host : settings.host,
    user : settings.user,
    password : settings.password,
    database : settings.database
  }
});

function insert_person(input, cb) {
  knex('famous_people').insert({first_name: input[0], last_name: input[1], birthdate: input[2]}).asCallback(cb);
}

function output() {
  knex.select().from('famous_people').asCallback(function(err, result) {
    if (err) {
      return console.error("error running query", err);
    }
    for (i = 0; i < result.length; i++) {
      console.log(`- ${i+1}: ${result[i].first_name} ${result[i].last_name}, born '${(result[i].birthdate).toDateString()}'`);
    }
  });
  knex.destroy();
}

let input = process.argv.slice(2);
console.log("Searching, please wait:");
insert_person(input, output);
