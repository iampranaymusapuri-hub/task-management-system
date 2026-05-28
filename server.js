console.log("Starting Server...");

const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use(express.static(__dirname));

/* MYSQL CONNECTION */

const db = mysql.createConnection({

    /* host: "localhost",
    user: "root",
    password: "123456789",
    database: "taskdb" */
    host:"sql12.freesqldatabase.com",

    user:"sql12828515",

    password:"9zNFQ8RbY8",

    database:"sql12828515",

    port:"3306"


});

/* CONNECT DATABASE */

db.connect((err) => {

    if(err){

        console.log(err);

    }
    else{

        console.log("Database Connected");

    }

});

/* ===========================
   ADD TASK
=========================== */

app.post("/addTask", (req, res) => {

    const {

        task_name,
        assigned_to,
        status,
        progress,
        description

    } = req.body;

    const sql =

    `INSERT INTO tasks
    (task_name, assigned_to, status, progress, description)
    VALUES (?, ?, ?, ?, ?)`;

    db.query(

        sql,

        [
            task_name,
            assigned_to,
            status,
            progress,
            description
        ],

        (err, result) => {

            if(err){

                console.log(err);

                res.send({
                    success:false
                });

            }
            else{

                res.send({
                    success:true,
                    message:"Task Added Successfully"
                });

            }

        }

    );

});

/* ===========================
   VIEW TASKS
=========================== */

app.get("/tasks", (req, res) => {

    const sql = "SELECT * FROM tasks";

    db.query(sql, (err, result) => {

        if(err){

            console.log(err);

        }
        else{

            res.send(result);

        }

    });

});

/* ===========================
   MODIFY TASK
=========================== */

app.put("/updateTask/:id", (req, res) => {

    const id = req.params.id;

    const {

        task_name,
        assigned_to,
        status,
        progress,
        description

    } = req.body;

    const sql =

    `UPDATE tasks
    SET
    task_name=?,
    assigned_to=?,
    status=?,
    progress=?,
    description=?
    WHERE task_id=?`;

    db.query(

        sql,

        [
            task_name,
            assigned_to,
            status,
            progress,
            description,
            id
        ],

        (err, result) => {

            if(err){

                console.log(err);

                res.send({
                    success:false
                });

            }
            else{

                res.send({
                    success:true,
                    message:"Task Updated Successfully"
                });

            }

        }

    );

});

/* ===========================
   DELETE TASK
=========================== */

app.delete("/deleteTask/:id", (req, res) => {

    const id = req.params.id;

    const sql =
    "DELETE FROM tasks WHERE task_id=?";

    db.query(sql, [id], (err, result) => {

        if(err){

            console.log(err);

            res.send({
                success:false
            });

        }
        else{

            res.send({
                success:true,
                message:"Task Deleted Successfully"
            });

        }

    });

});

/* SERVER */

app.listen(3000, () => {

    console.log("Server Running on Port 3000");

});