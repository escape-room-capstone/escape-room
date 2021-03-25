const router = require('express').Router()
const { models: { DynamicGame, Level, DynamicRoom, Image } } = require('../db/models/DynamicGameModels')

// DynamicGame GET routes
router.get('/game:id', async (req, res, next) => {
    try {
        res.send(await DynamicGame.findOne({
            where: {
                id: req.params.id
            },
            include: {
                all: true
            }
        }));
    } catch (err) {
        next(err)
    }
})


router.get('/game:gid/room:rid', async (req, res, next) => {
    try {
        res.send(await DynamicRoom.findOne({
            where: {
                id: req.params.rid
            },
            include: {
                all: true
            }
        }));
    } catch (err) {
        next(err)
    }
})

module.exports = router;