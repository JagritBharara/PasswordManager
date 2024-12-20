const express = require('express')
const app = express();
const mysql = require('mysql');
const PORT = 3001;
const cors = require('cors');
const {encrypt,decrypt} = require('./EncryptionHandler.js');
const userRoutes = require('./routes/user.routes.js');
const dotenv = require('dotenv');
dotenv.config();
const cookieParser = require('cookie-parser');

const connectToDb = require('./db/db.js');
connectToDb();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: '',
    database: 'PasswordManager'
});

app.get('/',(req,res)=>{
    res.send("Yes");
})

app.use('/users',userRoutes);

app.post('/addPassword',(req,res)=>{
    const {password,title} = req.body;
    const hashedPass = encrypt(password)
    db.query("INSERT INTO passwords (password,title,iv) VALUES(?,?,?)",[hashedPass.password,title,hashedPass.iv],
        (err,result)=>{
            if(err){
                console.log(err);
            }else{
                res.send("Success");
            }
        }
    )
});

app.post('/decryptPassword',(req,res)=>{
    res.send(decrypt(req.body));
})

app.get('/showPasswords',(req,res)=>{
    db.query('Select * from passwords;',(err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });
});

app.listen(PORT,()=>{
    console.log("server is running on",PORT);
})