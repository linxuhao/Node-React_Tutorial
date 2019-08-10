const Organization = require("../../schema/schemaOrganization.js");

//get all
async function get(req, res) {
  // get all users from the data base
  var orgas;
  try {
    const find = await Organization.find({},function (err, docs) {
      orgas = docs
    });
  } catch (error) {
    return res.status(500).json(error);
  }
  try {
    return res.status(200).json({
      organizations : orgas
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
  const orga = {
    name
  };
  // On check en base si obet existe déjà
  try {
    const find = await Organization.findOne({
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
    const data = new Organization(orga);
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
    const find = await Organization.findOneAndRemove({name});
    return res.status(200).json({
      text: "Succès"
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
}

async function update(req, res) {
  const { name, subOrganizations } = req.body;
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
    orga_array = [];

    //only update if exist
    for(const name of subOrganizations)
    {
      const find = await Organization.findOne({name}, function (err, doc) {
        orga_array.push(name);
      });
    }
    const update = {
      name,
      subOrganizations: orga_array
    };
    const find = await Organization.findOneAndUpdate(filter, update);
    if (find) {
      return res.status(200).json({
      text: "Succès"
      });
    }else{
      return res.status(400).json({
        text: "L'Organization n'existe pas"
      });
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
}

//On exporte nos deux fonctions

exports.get = get;
exports.add = add;
exports.remove = remove;
exports.update = update;

