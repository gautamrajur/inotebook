const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

//ROUTE 1 : Get all the notes : GET "/api/notes/fetchallnotes".Login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server error occured");
  }
});

//ROUTE 2 : Add a new note using : POST "/api/notes/addnote".Login required
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid title with more than 3 characters").isLength({
      min: 3,
    }),
    // password must be at least 5 chars long
    body(
      "description",
      "Description needs to be atleast 5 characters"
    ).isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    // If there are errors in the request, return Bad request and the errors
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { title, description, tag } = req.body;

    try {
      // Creating a new note
      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();
      //saving a new note and sending it as a response
      res.send(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server error occured");
    }
  }
);

//ROUTE 3 : Update an existing note using : PUT "/api/notes/updatenote".Login required
router.put(
  "/updatenote/:id",
  fetchuser,

  async (req, res) => {
    const { title, description, tag } = req.body;
    //Create a newNote object for updating data in an existing note
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }
    try {
      //Find the note to be updated
      let note = await Notes.findById(req.params.id);

      if (!note) {
        res.status(404).send("Not found");
      }
      // note basically contains a property called user which corresponds to userID in Notes Model
      if (note.user.toString() !== req.user.id)
        return res.status(401).send("Access denied");

      note = await Notes.findByIdAndUpdate(
        req.params.id,
        { $set: newNote },
        { new: true }
      );
      res.json(note);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server error occured");
    }
  }
);

//ROUTE 4 : Delete an existing note using : DELETE "/api/notes/deletenote".Login required
router.delete(
  "/deletenote/:id",
  fetchuser,

  async (req, res) => {
    const { title, description, tag } = req.body;
    //Create a newNote object for updating data in an existing note

    try {
      //Find the note to be deleted
      let note = await Notes.findById(req.params.id);
      if (!note) {
        res.status(404).send("Not found");
      }
      //Allow deletion if the requesting user is the owner of the note
      if (note.user.toString() !== req.user.id)
        return res.status(401).send("Access denied");

      note = await Notes.findByIdAndDelete(req.params.id);
      res.json({ Sucess: " Note has been deleted", note: note });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server error occured");
    }
  }
);

module.exports = router;
