const handleDisplay = (req, res, db, id) => {
  if (id) {
    db.select("*")
      .from("projects")
      .where("ID", "=", id)
      .then((project) => {
        if (project.length) {
          res.json(project);
        } else {
          res.status(404).json("No data");
        }
      })

      .catch((err) => res.status(400).json("Error"));
  } else {
    db.select("*")
      .from("projects")

      .then((project) => {
        if (project.length) {
          res.json(project);
        } else {
          res.status(404).json("No data");
        }
      })

      .catch((err) => res.status(400).json("Error"));
  }
};

module.exports = {
  handleDisplay,
};
