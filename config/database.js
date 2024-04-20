const mongoose = require("mongoose");

const connectDatabase = ( )=>{
    mongoose.connect(process.env.DB_URI).then((data) => {
        console.log(`Database Connected`);
    }).catch((err) => console.log(`no connection`));  
}
// mongoose.connect(process.env.DB_URI).then(() => { 
//     console.log(`connection successfull`);
// }).catch((err) => console.log(`no connection`));


module.exports = connectDatabase;