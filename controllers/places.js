const router = require("express").Router();
const db = require("../models");

//INDEX
router.get("/", (req, res) => {
  db.Place.find()
    .then((places) => {
      res.render("places/index", { places });
    })
    .catch((err) => {
      console.log(err);
      res.render("error404");
    });
});

//CREATE
router.post("/", (req, res) => {
  db.Place.create(req.body)
    .then(() => {
      res.redirect("/places");
    })
    .catch((err) => {
      console.log("err", err);
      res.render("error404");
    });
});

router.get("/new", (req, res) => {
  res.render("places/new");
});

//UPDATE
router.get("/:id", (req, res) => {
  db.Place.findById(req.params.id)
    .then((place) => {
      res.render("places/show", { place });
    })
    .catch((err) => {
      console.log("err", err);
      res.render("error404");
    });
});

router.put("/:id", (req, res) => {
  console.log(req.params.id);
  db.Place.findByIdAndUpdate(req.params.id, req.body, { new: true })
  .then(
    () => {
      res.redirect(`/places/${req.params.id}`);
    })
    .catch((err) => {
      console.log("err", err);
      res.render("error404");
    });
});

//edit
router
  .get("/:id/edit", (req, res) => {
    db.Place.findById(req.params.id)
    .then((place) => {
      res.render("places/edit", { place });
    })
    .catch((err) => {
      console.log("err", err);
      res.render("error404");
    });
});
    //res.send('GET edit form stub')

  //DELETE
  router
  .delete("/:id", (req, res) => {
    db.Place.
      findByIdAndDelete(req.params.id)
      .then(() => {
        res.redirect("/places");
      })
      .catch((err) => {
        console.log("err", err);
        res.render("error404");
      });
  });

//RANTS

// router.post('/:id/rant', (req, res) => {
//   res.send('GET /places/:id/rant stub')
// })

// router.delete('/:id/rant/:rantId', (req, res) => {
//     res.send('GET /places/:id/rant/:rantId stub')
// })

module.exports = router;
