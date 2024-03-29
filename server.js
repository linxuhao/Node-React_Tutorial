//Définition des modules
const express = require("express"); 
const mongoose = require("mongoose"); 
const bodyParser = require('body-parser');

//Connexion à la base de donnée
mongoose
  .connect("mongodb://localhost/db", { 
    useNewUrlParser: true,
    useFindAndModify: false
   })
  .then(() => {
    console.log("Connected to mongoDB");
  })
  .catch((e) => {
    console.log("Error while DB connecting");
    console.log(e);
  });

//On définit notre objet express nommé app
const app = express();

//Body Parser
const urlencodedParser = bodyParser.urlencoded({
    extended: true
});
app.use(urlencodedParser);
app.use(bodyParser.json());

//Définition des CORS
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

//On définit les routers
const userRouter = express.Router();
app.use("/user", userRouter);
require(__dirname + "/controllers/userController")(userRouter);

const organizationRouter = express.Router();
app.use("/organization", organizationRouter);
require(__dirname + "/controllers/organizationController")(organizationRouter);

const teamRouter = express.Router();
app.use("/team", teamRouter);
require(__dirname + "/controllers/teamController")(teamRouter);

//Définition et mise en place du port d'écoute
const port = 8800;
app.listen(port, () => console.log(`Listening on port ${port}`));