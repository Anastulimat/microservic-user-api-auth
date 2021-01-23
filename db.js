/**
 * MongoDB connexion settings
 */
const mongoose = require('mongoose');
const mongodb_uri = process.env.MONGODB_URI;

mongoose.connect(mongodb_uri, {
    useNewUrlParser: true,
    useCreateIndex: true ,
    useUnifiedTopology: true})
    .then(() => console.log("MongoDB database connection established successfully !"))
    .catch(() => console.log("MongoDB database has crashed !"));
