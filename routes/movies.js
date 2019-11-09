const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({ success: true, msg: 'Show all movies' });
});

router.get('/:id', (req, res) => {
  res.status(200).json({ success: true, msg: `Show movie ${req.params.id}` });
});

router.post('/', (req, res) => {
  res.status(200).json({ success: true, msg: 'Create new movie' });
});

router.put('/:id', (req, res) => {
  res.status(200).json({ success: true, msg: `Update movie ${req.params.id}` });
});

router.delete('/:id', (req, res) => {
  res.status(200).json({ success: true, msg: `Delete movie ${req.params.id}` });
});

module.exports = router;
