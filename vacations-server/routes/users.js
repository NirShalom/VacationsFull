const mysql = require('mysql2/promise');
var express = require('express');
var router = express.Router();


let pool;
(async function initializePool(){
    pool = await mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: 'Nir5330201',
        database: 'vacations',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
});
})();

router.get('/', async (req,res) => {
    const [results, fields] = await pool.execute(`SELECT * FROM clients`);
        res.send(results);
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    console.log(username);
    console.log(password);
        try {
            const [results] = await pool.execute(`SELECT * FROM vacations.clients WHERE username = ? AND password = ?`, [username, password]);

            if (results.length) {
                res.send(results[0]);   
            } else {
                res  
                    .status(404)
                    .send(`The user name or password is incorrect. Try again`);
            }
        } catch (e) {
            res
                .status(500)
                .send('something has gone wrong! :(');
        }
        });

router.post ('/', async (req, res) => {
    const { username , email, password } = req.body;
    console.log("body:",req.body);
    console.log("username:"+username +" email:"+email+" password:"+password);

            
    if (username!=undefined && email!=undefined && password!=undefined) {

        // try {
        //     const [results] = await pool.execute(`SELECT * FROM vacations.clients WHERE email = ?`, [ email ]);
        //         if (!results.length) {
        //             console.log("YYYYYYYY",results.length);
        //             res  
        //             .status(404)
        //             .send(`WWWHHHAAATTT`);
        //             console.log("This email adress is already being used");

        const  [results] = await pool.execute(`INSERT INTO clients ( username, email, password, role ) VALUES (?, ?, ?, ?)`, [username,email,password, 'client']);
       
      
       
        if (results.insertId) {
            res.send({ id: results.insertId});
        }
    } else {
        res
            .status(500)
            .send('Somthing went wrong')
    }
    res.status(200);
});

router.delete('/:id', async (req, res) => {
    console.log("DELETE STARTED");
    const { id } = req.params;
    const [results] = await pool.execute(`DELETE FROM vacations WHERE id = ?`, [id]);
    //res.status(200).send(`${id} has been deleted`);
    if (results.affectedRows) {
        res.status(200).send({ success: true });
    } else {
        res.status(404).send({ success: false });
    }
});
        
module.exports = router;
