import * as dotenv from "dotenv";
import cors from "cors";
import express from "express";
import { connectToDatabase } from "./database";
import { employeeRouter } from "./employee.routes";
 
// Load environment variables from the .env file, where the ATLAS_URI is configured
dotenv.config();
 
// const { ATLAS_URI } = process.env;
 const ATLAS_URI = 'mongodb+srv://muthupriyashanmugam:O4Z2v0yQC7m276jS@cluster0.yjg6vmm.mongodb.net/?retryWrites=true&w=majority';
if (!ATLAS_URI) {
   console.error("No ATLAS_URI environment variable has been defined in config.env");
   process.exit(1);
}
connectToDatabase(ATLAS_URI)
   .then(() => {
       const app = express();
       app.use(cors());
 
       // start the Express server
       app.listen(5200, () => {
           console.log(`Server running at http://localhost:5200...`);
       });
       app.use("/employees", employeeRouter);
 
   })
   .catch(error => console.error(error));

   