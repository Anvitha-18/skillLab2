const mongoose = require('mongoose');

const parkingRecordSchema = new mongoose.Schema({
    numberPlate: { type: String, required: true },
    slotNumber: { type: Number, required: true },
    entryTime: { type: Date, default: Date.now },
    exitTime: { type: Date },
    durationMinutes: { type: Number },
    status: { type: String, enum: ['IN', 'OUT'], default: 'IN' }
});

module.exports = mongoose.model('ParkingRecord', parkingRecordSchema);