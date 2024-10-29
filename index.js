const express = require("express");
const dbConnect = require("./src/config/dbConnect");
const { notFound, handleError } = require("./src/middlewares/errorHandler");
const userRouter = require("./src/routes/userRoutes");
const bodyParser = require("body-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("passport");
const googleRouter = require("./src/routes/googleRoutes");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 5000;
// const passportSetup = require("./src/utils/passpost");
const cors = require("cors");
const tutCatRouter = require("./src/routes/tutCatRoutes");
const tutorialRouter = require("./src/routes/tutorialRoutes");
const newsLetterRouter = require("./src/routes/newsLetterRoutes");
const reviewRouter = require("./src/routes/reviewsRoutes");
const contactRouter = require("./src/routes/contactRoutes");
const videoRouter = require("./src/routes/videoRoutes");
const docRouter = require("./src/routes/docRoutes");
const docCatRouter = require("./src/routes/docCatRoutes");
const blogCatRouter = require("./src/routes/blogCatRoutes");
const blogRouter = require("./src/routes/blogRoutes");
const videoCatRouter = require("./src/routes/videoCatRoutes");
const courseCatRouter = require("./src/routes/courseCatRoutes");
const courseRouter = require("./src/routes/courseRoutes");
const rateLimitter = require("./src/utils/reqLimit");
const workRouter = require("./src/routes/workRoutes");
const projectCatRouter = require("./src/routes/projectCatRoutes");
const projectRouter = require("./src/routes/projectRoutes");
const bookRouter = require("./src/routes/bookRoutes");
const qnaRouter = require("./src/routes/qnaRoutes");

dbConnect();
// app.use(
//   session({
//     resave: false,
//     saveUninitialized: false,
//     secret: "mysecret",
//     store: MongoStore.create({
//       mongoUrl: process.env.MONGODB_URL,
//       ttl: 12 * 60 * 60,
//     }),
//   })
// );

app.use(cors());
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send(`<a href="http://localhost:4000/google">login With Google</a>`);
});
app.set("trust proxy", 1);
/* app.use(
  "/api",
  rateLimitter(60 * 60 * 1000, "Secs", 50, "Only 50 Requests Allowed")
); */
app.use("/api/user", userRouter);
app.use("/", googleRouter);
app.use("/api/tutorial/category", tutCatRouter);
app.use("/api/tutorial", tutorialRouter);
app.use("/api/newsletter", newsLetterRouter);
app.use("/api/review", reviewRouter);
app.use("/api/contact", contactRouter);
app.use("/api/video", videoRouter);
app.use("/api/video-category", videoCatRouter);
app.use("/api/doc", docRouter);
app.use("/api/doc/category", docCatRouter);
app.use("/api/blog/category", blogCatRouter);
app.use("/api/blog", blogRouter);
app.use("/api/course/category", courseCatRouter);
app.use("/api/course", courseRouter);
app.use("/api/work", workRouter);
app.use("/api/project/category", projectCatRouter);
app.use("/api/project", projectRouter);
app.use("/api/book-session", bookRouter);
app.use("/api/qna", qnaRouter);

app.use(notFound);
app.use(handleError);

app.listen(PORT, () => {
  console.log(`Server is Running at http://localhost:${PORT}`);
});
