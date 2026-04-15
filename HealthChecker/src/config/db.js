const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Purani local link ko hatao aur Atlas wali link dalo
        // <password> ki jagah apna asali password aur cluster code check kar lena
        await mongoose.connect('mongodb+srv://priyanshu:Priyanshu123@cluster0.ul4rw6n.mongodb.net/?appName=Cluster0');
        
        console.log('✅ MongoDB Cloud Connected Successfully!');
    } catch (err) {
        console.error('❌ MongoDB Connection Error:', err.message);
    }
};

module.exports = connectDB;