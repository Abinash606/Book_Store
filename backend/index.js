import express from "express";
import { PORT ,mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import booksRoute from "./routes/bookRoute.js";
import cors from "cors";

const app = express();

// Middleware for parsing request body
app.use(express.json());
// Middleware for CORS
app.use(cors());


app.get('/',(request , response) => {
        console.log(request);
        return response.status(200).send("Welcome to MERN PROJECT")
});

app.use('/book',booksRoute);


mongoose.connect(mongoDBURL).then(() => {
    console.log("App Connected to database");
    app.listen(PORT, () => {
        console.log(`App is listing to port : ${PORT}`);
    });
})
.catch((error) => {
    console.log(error)
});
