// const express = require("express");
// const path = require("path");
// const app = express();
// const bodyparser = require("body-parser");
// const mongoose = require('mongoose');

// main().catch(err => console.log(err));

// async function main() {
//   await mongoose.connect('mongodb://localhost/contactDance');

//   // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
// }
// const port = 80;

// // define mongoose schema
// const contactSchema = new mongoose.Schema({
//     firstname: String,
//     secondname: String,
//     phone: String,
//     email: String,
//     address: String,
//     city: String,
//     desc: String,
//   });

// const Contact = mongoose.model('Contact', contactSchema);


// // EXPRESS SPECIFIC STUFF
// app.use('/static', express.static('static')) // For serving static files
// app.use(express.urlencoded())

// // PUG SPECIFIC STUFF
// app.set('view engine', 'pug') // Set the template engine as pug
// app.set('views', path.join(__dirname, 'views')) // Set the views directory

// // ENDPOINTS
// app.get('/', (req, res)=>{
//     const params = { }
//     res.status(200).render('home.pug', params);
// })

// app.get('/contact', (req, res)=>{
//     const params = { }
//     res.status(200).render('contact.pug', params);
// })


// app.post('/contact', (req, res)=>{
//     var myData = new Contact(req.body);
//     myData.save().then(()=>{
//         res.send("This item has been saved to the database")
//     }).catch(()=>{
//         res.status(400).send("Item was not saved to the database")
//     });
//     // const params = { }
//     // res.status(200).render('contact.pug');
// })


// // START THE SERVER
// app.listen(port, ()=>{
//     console.log(`The application started successfully on port ${port}`);
// });



const express = require("express");
const path = require("path");
const app = express();
// const bodyparser = require("body-parser"); // Remove this line
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost/contactDance');
}

const port = 8000;

// define mongoose schema
const contactSchema = new mongoose.Schema({
    firstname: String,
    secondname: String,
    phone: String,
    email: String,
    address: String,
    city: String,
    desc: String
});

const Contact = mongoose.model('Contact', contactSchema);

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')); // For serving static files
app.use(express.urlencoded({ extended: true })); // Correctly use express.urlencoded()

// PUG SPECIFIC STUFF
app.set('view engine', 'pug'); // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')); // Set the views directory

// ENDPOINTS
app.get('/', (req, res) => {
    const params = {};
    res.status(200).render('home.pug', params);
});

app.get('/contact', (req, res) => {
    const params = {};
    res.status(200).render('contact.pug', params);
});

app.post('/contact', (req, res) => {
    var myData = new Contact(req.body);
    myData.save().then(() => {
        res.send("This item has been saved to the database");
    }).catch(() => {
        res.status(400).send("Item was not saved to the database");
    });
});

// START THE SERVER
app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
});
