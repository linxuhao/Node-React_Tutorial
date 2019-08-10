const Team = require("../../schema/schemaTeam.js");

//get all
async function get(req, res) {
  // get all users from the data base
  try {
    const find = await Team.find();
  } catch (error) {
    return res.status(500).json({ error });
  }
  try {
    return res.status(200).json({
      organizations : find
    });
  } catch (error) {
    return res.status(500).json({ error });
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
        text: "L'Organization existe déjà"
      });
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
  try {
    // Sauvegarde de l'utilisateur en base
    const data = new Team(name);
    const object = await data.save();
    return res.status(200).json({
      text: "Succès"
    });
  } catch (error) {
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
    Team.findOneAndRemove({name})
  } catch (error) {
    return res.status(500).json({ error });
  }
}

//On exporte nos deux fonctions

exports.get = get;
exports.add = add;
exports.remove = remove;
