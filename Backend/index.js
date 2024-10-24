require("dotenv").config();

const express = require("express");
const passport = require("passport");
const session = require("express-session");
const { default: mongoose } = require("mongoose");
const homeRouter = require("./routes/githubAuth");
const registerRouter = require("./routes/register");
const filterRouter = require("./routes/filteredUser");
const GithubStrategy = require("passport-github2").Strategy;
const cors = require('cors')

try{
    mongoose.connect('mongodb+srv://adnanali11875:helloworld@cluster0.caghz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(()=>{
        console.log("Connected to db")
    })
}catch(e){
    console.log(e.message);
}
const app = express();
app.use(express.json());
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(cors())
app.use('/',homeRouter);
app.use('/',registerRouter);
app.use('/',filterRouter);

app.listen(3000, () => {
    console.log(`Server is running at port 3000`);
})