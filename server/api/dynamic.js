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
        console.log(req.params);
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



// // Images GET routes
// router.get('/', async (req, res, next) => {
//     try {
//         res.send(await Image.findAll());
//     } catch (err) {
//         next(err)
//     }
// });

// router.get('/:id', async (req, res, next) => {
//     try {
//         res.send(await Image.findByPk(req.params.id));
//     }
//     catch (err) {
//         next(err)
//     }
// })


// // Levels GET routes
// router.get('/', async (req, res, next) => {
//     try {
//         res.send(await Level.findAll());
//     } catch (err) {
//         next(err)
//     }
// });

// router.get('/:id', async (req, res, next) => {
//     try {
//         res.send(await Level.findByPk(req.params.id));
//     }
//     catch (err) {
//         next(err)
//     }
// })

// // Rooms GET routes
// router.get('/', async (req, res, next) => {
//     try {
//         res.send(await Room.findAll());
//     } catch (err) {
//         next(err)
//     }
// });

// router.get('/:id', async (req, res, next) => {
//     try {
//         res.send(await Room.findByPk(req.params.id));
//     }
//     catch (err) {
//         next(err)
//     }
// })

module.exports = router;