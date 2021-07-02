const mysql = require("mysql2");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
})

exports.register = (req, res) => {
    console.log("A post req has been made on /auth/register")
    // console.log(req.body.username);

    const {username, password} = req.body;

    db.query("SELECT username FROM jiratech_users WHERE username = ?", [username], async (err, result) => {
        if (err) {
            console.log(err);
        } else {
            if (result.length > 0) {
                // console.log("made it here");
                res.send("The user " + username + " already exists");
            } else {
                let hashedPassword = await bcrypt.hash(password, 8);
                // console.log(hashedPassword.length);
                // console.log("The hashed password for user: " + username + ", password: " + password + " is =====> " + hashedPassword);
                // res.send(username + "; " + password + " ====> " + hashedPassword);

                db.query("INSERT INTO jiratech_users SET ?", {username: username, password: hashedPassword}, (error, results) => {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log(results);
                        res.send("User " + username + " created with password: " + hashedPassword);
                    }
                });
            }
        }
    })

    // res.send("A registration has been made");
}

exports.login = async (req, res) => {
    console.log("A post req has been made on /auth/login")
    try {
        const {username, password} = req.body;
        // console.log(username);


        if (!username || !password) {
            console.log("Both a password and a username are required!");
            res.send("Both a password and a username are required!");
        } else {
        // console.log(username);
        // console.log(password);
            db.query("SELECT * FROM jiratech_users WHERE username = ?", [username], async (err, result) => {
                // console.log(result);
                if (result.length == 0) {
                    console.log("User " + username + " does not exist");
                    res.send("User " + username + " does not exist");
                } else {
                    // console.log(await bcrypt.hash(password, 8));
                    // console.log(result[0].password);
                    if ( !(await bcrypt.compare(password, result[0].password))) {
                        console.log("Incorrect username/password combination");
                        res.send("Incorrect username/password combination");
                    } else {
                        console.log("Logged in user " + username);
                        
                        const id = result[0].id;
                        const token = jwt.sign({id: id}, process.env.JWT_SECRET, {
                            expiresIn: process.env.JWT_EXPRIES_IN
                        });

                        console.log("The token is: " + token);
                        
                        const cookieOptions = {
                            expires: new Date(
                                Date.now() + process.env.JWT_COOKIE_EXPRIES * 24 * 60 * 60 * 1000 
                            ),
                            httpOnly: true
                        };

                        res.cookie('jwt', token, cookieOptions);
                        res.status(200).send("E al meu!");

                        // res.send("Logged in user " + username);
                    }
                }
            })
        }
    } catch (error) {
        console.log(error);
    }
}