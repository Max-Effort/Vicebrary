   const mongoose = require('mongoose');
   require('dotenv').config();

   mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/vicebrary', {
       useNewUrlParser: true,
       useUnifiedTopology: true,
       //    useCreateIndex: true,
       //    useFindAndModify: false,
   });
   console.log(mongoose.connection)
   module.exports = mongoose.connection;