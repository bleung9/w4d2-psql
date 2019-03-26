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

function find_person(input, cb) {
  knex.select().where({first_name: input}).from('famous_people').asCallback(function(err, result) {
    if (err) {
      return console.error("error running query", err);
    }
    cb(result);
    knex.destroy();
  });
}

function output(result) {
  console.log(`Found ${result.length} person(s) by the name ${input}:`);
  for (i = 0; i < result.length; i++) {
    console.log(`- ${i+1}: ${result[i].first_name} ${result[i].last_name}, born '${(result[i].birthdate).toDateString()}'`);
  }
}

let input = process.argv[2];
console.log("Searching, please wait:");
find_person(input, output);
