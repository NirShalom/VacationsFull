const mysql = require('mysql2/promise');
var express = require('express');
var router = express.Router();


let pool;
(async function initializePool() {
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

router.get('/', async (req, res) => {
    const [results, fields] = await pool.execute(`SELECT * FROM favorites`);
    res.send(results);
});

router.get('/users/:id', async (req, res) => {
    const { id } = req.params;
    console.log("user:"+id);
    try {
        // const [results, fields] = await pool.execute(`select * from vacations.vacations where id in (select vacationsn
        // from vacations.favorites
        // where clientid=?)`, [id]);

        const [results] = await pool.execute(`SELECT vacationsn from favorites
        WHERE clientid=?`, [id]);

        if (results.length) {
            // let reaults = objArray.map( a => a.vacationSN);
            // console.log(reaults);
            res.send(results);
        } else {
            res
                .status(404)
                .send(`User ID ${id} doesn't follow any vacation`);
        }
    } catch (e) {
        res
            .status(500)
            .send('something has gone wrong! :(');
    }
});
router.get('/stats', async (req, res) => {
    try {
        const [results] = await pool.execute(`select vacations.vacations.title ,vacations.favorites.vacationsn,count(vacations.favorites.vacationsn) as TOTAL_FOLLOWERS
        from vacations.favorites inner join vacations.vacations on vacations.favorites.vacationsn = vacations.vacations.id
        group by vacations.vacations.id`);

        if (results.length) {
            // let reaults = objArray.map( a => a.vacationSN);
            // console.log(reaults);
            res.send(results);
        } else {
            res
                .status(404)
                .send(`User ID ${id} doesn't follow any vacation`);
        }
    } catch (e) {
        res
            .status(500)
            .send('something has gone wrong! :(');
    }
});
router.post('/', async (req, res) => {
    console.log("test");
    const { clientID, vacationSN } = req.body;
    console.log("client ID + SN:" + clientID, vacationSN);
    if (clientID != undefined) {


        //const  [results] = await pool.execute(`INSERT INTO vacations ( Title, description, price, BGImage ) VALUES (?, ?, ?, ?)`, [Title, description, price, BGImage]);
        const [results] = await pool.execute(`INSERT INTO vacations.favorites (ClientID,VacationSN) VALUES(?,?);`, [clientID, vacationSN]);

        if (results.insertId) {
            res.send({ id: results.insertId });
        }
        res
            .status(200)
            .send('success');
    } else {
        res
            .status(500)
            .send('Somthing went wrong')
    }
    res.status(200);
});

router.delete('/delete/:id', async (req, res) => {
    console.log("DELETE STARTED");
    const { clientID, vacationSN } = req.body;
    //var sqlQuery
    const [results] = await pool.execute(`DELETE FROM vacations.favorites WHERE clientid = ?  and VacationSN = ?`, [clientID, vacationSN]);
    //res.status(200).send(`${id} has been deleted`);
    if (results.affectedRows) {
        res.status(200).send({ success: true });
    } else {
        res.status(404).send({ success: false });
    }
});

module.exports = router;
