const express = require('express');
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/myLoginRegisterDB')
    .then(() => console.log('connection successful....'))
    .catch((err) => console.log(err));



const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,

});


const User = new mongoose.model("User", UserSchema);



//Routes

app.get('/', (req, res) => {
    res.send({
        test: 'helloo'
    })
})

app.post('/login', (req, res) => {

    const { email, password } = req.body
    User.findOne({ email: email }, (err, user) => {
        if (user) {
            if (password === user.password) {
                res.send({ message: "Successfully Login..", user: user })
            } else {
                res.send({ message: "password didn't match!" })
            }
        } else {
            res.send({message:"user not registered"})
        }
    })
})

app.post('/register', (req, res) => {
    const { name, email, password } = req.body
    User.findOne({ email: email }, (err, user) => {
        if (user) {
            res.send({ message: "User already registerd" })
        } else {
            const user = new User({
                name,
                email,
                password
            })
            user.save(err => {
                if (err) {
                    res.send(err)
                } else {
                    res.send({ message: "Successfully Registered, Please login now." })
                }
            })
        }
    })

})


const PORT = 4000
app.listen(PORT, () => {
    console.log(`listening to port ${PORT}`);
})