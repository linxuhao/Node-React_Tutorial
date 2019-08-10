const Team = require("../../schema/schemaTeam.js");
const User = require("../../schema/schemaUser.js");

//get all
async function get(req, res) {
  // get all users from the data base
  var teams;
  try {
    const find = await Team.find({},function (err, docs) {
      teams = docs
    });
  } catch (error) {
    return res.status(500).json(error);
  }
  try {
    return res.status(200).json({
      teams : teams
    });
  } catch (error) {
    return res.status(500).json(error);
  }
}

async function add(req, res) {
  const { name } = req.body;
  if (!name ) {
    //Le cas où tous les champs nécessaires ne serait pas soumit ou nul
    return res.status(400).json({
      text: "Requête invalide"
    });
  }
  // Création d'un new objet
  const team = {
    name
  };
  // On check en base si obet existe déjà
  try {
    const find = await Team.findOne({
      name
    });
    if (find) {
      return res.status(400).json({
        text: "Team existe déjà"
      });
    }
  } catch (error) {
    console.debug("1");
    console.error(error);
    return res.status(500).json({ error });
  }
  try {
    // Sauvegarde de l'utilisateur en base
    const data = new Team(team);
    const object = await data.save();
    return res.status(200).json({
      text: "Succès"
    });
  } catch (error) {
    console.debug("2");
    console.error(error);
    return res.status(500).json({ error });
  }
}

async function remove(req, res) {
  const { name } = req.body;
  if (!name ) {
    //Le cas où tous les champs nécessaires ne serait pas soumit ou nul
    return res.status(400).json({
      text: "Requête invalide"
    });
  }
  // On check en base si obet existe déjà
  try {
    const find = await Team.findOneAndRemove({name});
    return res.status(200).json({
      text: "Succès"
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
}

async function update(req, res) {
  const { name, users } = req.body;
  if (!name ) {
    //Le cas où tous les champs nécessaires ne serait pas soumit ou nul
    return res.status(400).json({
      text: "Requête invalide"
    });
  }
  const filter = {
    name
  };
  // On check en base si obet existe déjà
  try {
    array = [];
    //only update if the sub organization
    for(const email of users)
    {
      const find = await User.findOne({email}, function (err, doc) {
        array.push(doc);
      });
    }
    const update = {
      name,
      users: array
    };
    const find = await Team.findOneAndUpdate(filter, update);
    if (find) {
      return res.status(200).json({
      text: "Succès"
      });
    }else{
      return res.status(400).json({
        text: "Team n'existe pas"
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error });
  }
}

//On exporte nos deux fonctions

exports.get = get;
exports.add = add;
exports.remove = remove;
exports.update = update;

