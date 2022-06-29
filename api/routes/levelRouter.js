const { getAllLevels, addLevel, deleteLevel, updateLevel } = require('../controllers/levelController');

const router = require('express').Router();

router.get('/allLevels',getAllLevels);
router.post('/addLevel',addLevel);
router.delete('/deleteLevel/:id',deleteLevel);
router.post('/updateLevel',updateLevel);

module.exports = router;