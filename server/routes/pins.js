const Pin = require("../models/Pin");
const router = require("express").Router();

//create a pin
router.post("/", async (req, res) => {
    const newPin = new Pin(req.body)
    try {
        const savedPin = await newPin.save()
        res.status(200).json(savedPin)
    } catch(err) {
        res.status(500).json(err)
    }
})

//update a pin
router.put("/:id", async (req, res) => {
    try {
        const pin = await Pin.findById(req.params.id)
        if (pin.userId === req.body.userId) {
            await pin.updateOne({$set:req.body})
            res.status(200).json("The pin has been updated")
        } else {
            res.status(403).json("You can only update your pin")
        }
    } catch(err) {
        res.status(500).json(err)
    }
})
//delete a pin
router.delete("/:id", async (req, res) => {
    try {
        const pin = await Pin.findById(req.params.id)
        await pin.deleteOne()
    } catch(err) {
        res.status(500).json(err)
    }
})

//get a pin
router.get("/:slug", async (req, res) => {
    try {
        const pin = await Pin.find({username: req.params.slug})
        res.status(200).json(pin)
    } catch (err) {
        res.status(500).json(err)
    }
})





module.exports = router