const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

function find_person(input, client, cb) {
  client.query("SELECT * FROM famous_people where first_name = $1::text", [input], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    cb(result, client);
  });
}

function output(result, client) {
  console.log(`Found ${result.rows.length} person(s) by the name ${input}:`);
  for (i = 0; i < result.rows.length; i++) {
    console.log(`- ${i+1}: ${result.rows[i].first_name} ${result.rows[i].last_name}, born '${(result.rows[i].birthdate).toDateString()}'`);
  }
  client.end();
}

let input = process.argv[2];
console.log("Searching, please wait:");

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  find_person(input, client, output);
});