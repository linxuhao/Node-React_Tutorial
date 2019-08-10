const Organization = require("../../schema/schemaOrganization.js");

//get all
async function get(req, res) {
  // get all users from the data base
  try {
    const find = await Organization.find();
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
//TODO
async function add(req, res) {
  const { password, email, name } = req.body;
  if (!email || !password || !name) {
    //Le cas où tous les champs nécessaires ne serait pas soumit ou nul
    return res.status(400).json({
      text: "Requête invalide"
    });
  }
  // Création d'un objet user, dans lequel on hash le mot de passe
  const user = {
    email,
    name,
    password: passwordHash.generate(password)
  };
  // On check en base si l'utilisateur existe déjà
  try {
    const findUser = await User.findOne({
      email
    });
    if (findUser) {
      return res.status(400).json({
        text: "L'utilisateur existe déjà"
      });
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
  try {
    // Sauvegarde de l'utilisateur en base
    const userData = new User(user);
    const userObject = await userData.save();
    return res.status(200).json({
      text: "Succès",
      token: userObject.getToken()
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
}

async function remove(req, res) {
  // get all users from the data base
  try {
    const find = await Organization.find();
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

async function update(req, res) {
  // get all users from the data base
  try {
    const find = await Organization.find();
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

//On exporte nos deux fonctions

exports.get = get;
exports.add = add;
exports.remove = remove;
exports.update = update;
