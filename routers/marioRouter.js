const express = require('express');
const router = express.Router();
const Mario=require('../models/marioModel')
// fetch all items
router.route('/fetchall').get( async (req, res) => {
    try {
      const characters = await Mario.find();
      res.json(characters);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
//create new items
  router.post('/create', async (req, res) => {
    const { name, weight } = req.body;
    if (!name || !weight) {
      return res.status(400).json({ message: 'either name or weight is missing' });
    }
    try {
      const newCharacter = await Mario.create({ name, weight });
      res.status(201).json(newCharacter);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  // find item using id
  router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const character = await Mario.findById(id);
      if (character) {
        res.json(character);
      } else {
        res.status(400).json({ message: 'Character not found' });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
// to update
  router.patch('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, weight } = req.body;
    try {
      const character = await Mario.findByIdAndUpdate(id, { name, weight }, { new: true });
      if (character) {
        res.json(character);
      } else {
        res.status(400).json({ message: 'Invalid suggested changes or ID not found' });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
 // to delete  
  router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const deletedCharacter = await Mario.findByIdAndDelete(id);
      if (deletedCharacter) {
        res.json({ message: 'Character deleted' });
      } else {
        res.status(400).json({ message: 'ID not found' });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  module.exports=router