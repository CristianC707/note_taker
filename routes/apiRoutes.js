const router = require('express').Router();
const db = require('../db/db.json');
const { uuid } = require('uuidv4');
const fs = require('fs');
//Something wrong with the module.exports. Maybe use express router rather than module.exports app
//Add a route to getnotes and deletenotes



router.get('/api/notes', (req, res) => {
    fs.readFile('db/db.json', 'utf8', (err, data) => {
        if (err) throw err;
        console.log(data)
        res.json(JSON.parse(data));
    });

});
router.post('/api/notes', (req, res) => {
    console.log('route hit');
    let noteId = uuid();
    console.log(noteId)
    let note = {
        id: noteId,
        title: req.body.title,
        text: req.body.text
    }
    fs.readFile('db/db.json', 'utf8', (err, data) => {
        if (err) throw err;
        let jsonNotes = JSON.parse(data);
        jsonNotes.push(note);
        fs.writeFile('db/db.json', JSON.stringify(jsonNotes, null, 2), err => {
            if (err) throw err;
            res.json(jsonNotes);
            console.log('New Note Created!');
        })
    })
})
router.delete('/api/notes/:id', (req, res) => {
    let noteId = req.params.id;
    fs.readFile('db/db.json', 'utf8', (err, data) => {
        if (err) throw err;
        let jsonNotes = JSON.parse(data);
        let newNotes = jsonNotes.filter(note => note.id !== noteId);
        fs.writeFile('db/db.json', JSON.stringify(newNotes, null, 2), err => {
            if (err) throw err;
            res.json(newNotes);
            console.log('Note Deleted!');
        })
    })
})

module.exports = router
