const cors = require("cors");
const express = require("express");
const path = require('path');
const session = require("express-session");
const MongoStore = require("connect-mongo");

const usersRouter = require("./routes/userRoute");

require('dotenv').config();

    
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(session({
//     secret: process.env.SECRET,
//     resave: false,
//     saveUninitialized: true,
//     store: MongoStore.create({
//         mongoUrl: process.env.MONGODB_URI,
//         collection: "sessions",
//     }),
//     cookie: {
//         maxAge: 1000* 60 * 60 * 24
//     }
// }));

// app.use("/api/users/sign-up", usersRouter);

app.post("/api/users/sign-up", (req, res, next) => {
    usersRouter.sign_up_post;
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on ${PORT}`));