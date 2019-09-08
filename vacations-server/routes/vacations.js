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
    const [results, fields] = await pool.execute(`SELECT * FROM vacations`);
        res.send(results);
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
        try {
            const [results, fields] = await pool.execute(`SELECT * FROM vacations WHERE id = ?`, [id]);
            
            if (results.length) {
                res.send(results[0]);
            } else {
                res  
                    .status(404)
                    .send(`Vacation ${id} doesn't exist`);
            }
        } catch (e) {
            res
                .status(500)
                .send('something has gone wrong! :(');
        }
        });

        router.post ('/', async (req, res) => {
            const { Title , description, price, BGImage } = req.body;
            console.log("Title:"+Title);
           if (Title != undefined) {
               res
                .status(200)
                // .send('unexpected Title in request');
           
            const  [results] = await pool.execute(`INSERT INTO vacations ( Title, description, price, BGImage ) VALUES (?, ?, ?, ?)`, [Title, description, price, BGImage]);

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
// ______ Edit Vacation ________________
        router.post ('/:id', async (req, res) => {
            const { id } = req.params;
            const { Title , description, price, BGImage } = req.body;
            console.log("Edit started:", id);
           
            const  [results] = await pool.execute(
                `UPDATE vacations.vacations SET Title = ?, description = ?, price = ?, BGImage = ? WHERE (id = ?)`,[Title, description, price, BGImage, id]) ;
                if (results.affectedRows) {
                    res.status(200).send({ success: true });
                } else {
                        res.status(404).send({ success: false });
                }
            
        });

        

        // ____________________________________________________________________

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
