import mongoose from "mongoose";

const connectToDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB is connected at: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connection to mongodb: ${error.message}`);
    process.exit();
  }
};

export default connectToDB;
