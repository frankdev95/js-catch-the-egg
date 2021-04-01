require('dotenv').config()
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const PORT = 3000;
const dbPassword = process.env.DB_PW;
const dbUsername = process.env.DB_USERNAME;
const url = `mongodb+srv://${dbUsername}:${dbPassword}@cluster0.fd9sv.mongodb.net/Scores?retryWrites=true&w=majority`;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
    autoIndex: true
}

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
      type: String,
      required: true
    },
    score: {
        default: 0,
        type: Number
    }
});

const User = mongoose.model('User', userSchema);

mongoose.connect(url, options)
    .then(() => console.log('Successfully connected to DB'))
    .catch((err) => console.error(err));

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
app.set('view engine', 'ejs');


app.get('/', (req, res) => {
    res.render('index', {
        message: "",
        show: ""
    });
});

app.get('/highscores', async (req, res) => {
    const users = await User.find({}).sort({score: -1}).limit(10);
    console.log(users);
    res.render('highscores', {
        scores: users
    });
});

app.post('/score', (req, res) => {
    let user = new User({
        username: req.body.name,
        email: req.body.email
    });

    user.save(err => {
        if(err){
            if(err.name === "ValidationError") {
               return  res.render('index', {
                    message: "Please enter a valid name or email address",
                    show: ""
                });
            }
            if(err.code === 11000) {
                if(err.keyPattern['username'] === 1) {
                    return res.render('index',  {
                        message: "Username already registered, please select another.",
                        show: ""
                    });
                }
            }
        }

        res.render('index', {
            message: "",
            show: "false"
        });
    });
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));