const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password:"root",
    database:"mm_crud",
});

app.use(cors());
app.use(express.json());

app.get('/', (req,res) => {
    let SQL = "SELECT * FROM users";
    db.query(SQL, (err, result) =>{
        if(err) console.log(err);
        else res.send(result);
    })
});
app.delete('/delete/:id',(req,res) => {
    const { id } = req.params;
    let SQL = "DELETE FROM users WHERE id_users = ?";

    db.query(SQL, [id], (err, result) =>{
        if(err) console.log(err);
        else res.send(result);
    })
});

app.put('/edit', (req,res) => {
    const { id } = req.body;
    const { name } = req.body;
    const { email } = req.body;
    const { phone } = req.body;
    const { role } = req.body;

    let SQL = "UPDATE users SET name = ?, email = ?, phone = ?, role = ? WHERE id_users = ?";

    db.query(SQL, [name, email, phone, role, id], (err, result) =>{
        if(err) console.log(err);
        else res.send(result);
    });
});

app.post('/register', (req,res) => {
    const { name } = req.body;
    const { email } = req.body;
    const { phone } = req.body;
    const { role } = req.body;

    let SQL = "INSERT INTO users (name, email, phone, role) VALUES ( ?, ?, ?, ?)";
    
    
    db.query(SQL,[name, email, phone, role], (err, result) => {
        res.send(result);
    });
});



app.listen(3001);