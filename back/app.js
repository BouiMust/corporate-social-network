// Express
const express = require('express');
const app = express();

// Json
app.use(express.json());

// Importe dotenv
require('dotenv').config({ path: './.env' });

// CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// Helmet
const helmet = require('helmet');
app.use(helmet({ crossOriginResourcePolicy: { policy: "same-site" } }));

// // Mongoose
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGODB_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch((error) => console.log(error));
//

/* *************************************************** */

// Accède au chemin du serveur (pour les fichiers images stockées)
const path = require('path');

// Gère la ressource image de manière statique à chaque fois qu'elle reçoit une requête vers la route /images
app.use('/images', express.static(path.join(__dirname, 'images')));

// Importe les routes
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');

// // Utilisation des routes
app.use('/api/auth', userRoutes);
app.use('/api/posts', postRoutes);


/*************************************************** */

// Exporte l'app pour le serveur
module.exports = app;