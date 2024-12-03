const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const ArticlesRoutes = require('./routes/ArticleRoutes');
const CatRoutes=require('./routes/CatRoutes');
const CommandeRoutes=require('./routes/CommandeRoutes'); 
const FournisseurRoutes=require('./routes/FournisseurRoutes');
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use('/categories',CatRoutes);
app.use('/', userRoutes);  
app.use('/articles', ArticlesRoutes);
app.use('/commandes',CommandeRoutes);
app.use('/fournisseur',FournisseurRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => console.log('MongoDB connection error:', error));
