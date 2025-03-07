import mongoose, { connect } from "mongoose";

const connectDB = async () => {
    mongoose.connect(process.env.MONGO_URI, {
        dbName: process.env.DB_NAME
    }).then(() => {
        console.log("Database connected");
    }).catch((err) => {
        console.log("Error connecting to Database", err);
    });
};

export default connectDB;