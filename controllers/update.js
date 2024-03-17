const multer = require("multer"); //image upload
const path = require("path"); //image upload
const fs = require("fs");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/project_image");
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + "_" + file.fieldname + ext);
  },
});

const upload = multer({ storage: storage });

const handleUpdate = (req, res, db, id) => {
  upload.single("image")(req, res, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Error uploading Image" });
    }

    const { name, link, description } = req.body;

    const image = req.file;

    db.select("img")
      .from("projects")
      .where("ID", "=", id)
      .then((data) => {
        const dimag = data[0].img;
        const filePath = path.join(
          __dirname,
          "../public/project_image/",
          dimag
        );

        // Check if the file exists before attempting to delete
        if (fs.existsSync(filePath)) {
          // Delete the existing file
          fs.unlinkSync(filePath);
          return res.status(200).json(`File '${filePath}' delete `);
        } else {
          return res.status(400).json(`File '${filePath}' does not exist.`);
        }
      });

    if (!name || !link || !description || !image) {
      return res.status(400).json("incorrect form submission");
    } else {
      db("projects")
        .where({ ID: id })
        .update({
          project_name: name,
          link: link,
          description: description,
          img: image.filename,
        })

        .then((project) => {
          console.log("Inserted Project:", project);
          res.json(project[0]);
        })
        .catch((err) => {
          console.error(err);
          res
            .status(500)
            .json({ error: "Internal Server Error", details: err.message });
        });
    }
  });
};
module.exports = {
  handleUpdate,
};
