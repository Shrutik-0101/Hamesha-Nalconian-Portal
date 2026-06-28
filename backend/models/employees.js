import mongoose from 'mongoose';
const empSchema = new mongoose.Schema({
    employeeId: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    position: {
        type: String,
        required: true,
    },
    dob: {
        type: Date,
        required: true,
    },
    photo: {
        type: String,
        required: true,
    },
    emergencyContact: {
        type: String,
        default: false,
    },
    status: {
        type: String,
        default: 'Retired',
    },
    retirementDate: {
        type: Date,
    }
}, { timestamps: true });

export default mongoose.model('Employees', empSchema);