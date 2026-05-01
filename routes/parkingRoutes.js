const express = require('express');
const router = express.Router();
const Slot = require('../models/slot');
const ParkingRecord = require('../models/ParkingRecord');

// 1. Initialize Parking Lot
router.post('/init', async (req, res) => {
    try {
        const { count } = req.body;
        await Slot.deleteMany({});
        await ParkingRecord.deleteMany({});
        
        const slots = [];
        for (let i = 1; i <= count; i++) {
            slots.push({ slotNumber: i, isOccupied: false });
        }
        await Slot.insertMany(slots);
        res.status(201).json({ message: `Initialized with ${count} slots.` });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 2. Vehicle Entry
router.post('/entry', async (req, res) => {
    try {
        const { numberPlate } = req.body;
        const existing = await ParkingRecord.findOne({ numberPlate, status: 'IN' });
        if (existing) return res.status(400).json({ message: "Vehicle already parked." });

        const slot = await Slot.findOne({ isOccupied: false }).sort({ slotNumber: 1 });
        if (!slot) return res.status(400).json({ message: "Parking full!" });

        slot.isOccupied = true;
        slot.currentVehicle = numberPlate;
        await slot.save();

        const record = await ParkingRecord.create({ numberPlate, slotNumber: slot.slotNumber });
        res.status(200).json({ message: "Entry success", slot: slot.slotNumber, record });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 3. Vehicle Exit
router.post('/exit', async (req, res) => {
    try {
        const { numberPlate } = req.body;
        const record = await ParkingRecord.findOne({ numberPlate, status: 'IN' });
        if (!record) return res.status(404).json({ message: "Vehicle not found." });

        await Slot.findOneAndUpdate({ slotNumber: record.slotNumber }, { isOccupied: false, currentVehicle: null });

        record.exitTime = new Date();
        record.status = 'OUT';
        record.durationMinutes = Math.round((record.exitTime - record.entryTime) / 60000);
        await record.save();

        res.status(200).json({ message: "Exit success", duration: record.durationMinutes });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 4. View Slots
router.get('/slots', async (req, res) => {
    const slots = await Slot.find().sort({ slotNumber: 1 });
    res.json(slots);
});

module.exports = router;