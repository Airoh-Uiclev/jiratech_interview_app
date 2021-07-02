var express = require('express');
// var mysql = require('mysql')
var mysql = require('mysql2')
var cors = require('cors')

// var router = express.Router();

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// module.exports = router;


const app = express();
app.use(express.json());
app.use(cors());
//router = express.Router();
//app.use(app.router);
//routes.initialize(app);

const db = mysql.createConnection({
  // user: "root",
  user: "jiratech_user",
  host: "mysql-database", //"localhost",
  // password: "root_jiratech_password",
  password: "jiratech_password",
  database: "jiratech_users_db",
  port: "3307"
});

app.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  console.log('Register request received');
  // console.log(db);

  db.query(
    "INSERT INTO users (username, password) VALUES (?, ?)",
    [username, password], 
    (err, res) => {
      console.log(err)
    }
  )
})

app.listen(9000, () => {
  console.log("running server");
})

module.exports = app;