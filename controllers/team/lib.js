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

async function add(req, res) {
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
