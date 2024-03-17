const handleDelete = (req, res, db, id) => {
  //   db.select("img")
  //     .from("projects")
  //     .where("ID", "=", id)
  //     .then((data) => {
  //       const dimag = data[0].img;
  //       const filePath = path.join(__dirname, "../public/project_image/", dimag);

  //       // Check if the file exists before attempting to delete
  //       if (fs.existsSync(filePath)) {
  //         // Delete the existing file
  //         fs.unlinkSync(filePath);
  //         return res.status(200).json(`File '${filePath}' delete `);
  //       } else {
  //         return res.status(400).json(`File '${filePath}' does not exist.`);
  //       }
  //     });

  db("projects")
    .where({ ID: id })
    .del()
    .then((project) => {
      res.json(project);
    })
    .catch((err) => {
      console.error(err);
      res
        .status(500)
        .json({ error: "Internal Server Error", details: err.message });
    });
};

module.exports = {
  handleDelete,
};
