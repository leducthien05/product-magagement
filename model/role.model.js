const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
    title: String,
    description: String,
    permission: {
        type: Array,
        default: []
    },
    deleted: {
        type: Boolean,
        default: false
    },
    deletedAt: Date
},
{
    timestamps: true
});
   

const Role = mongoose.model('Role', roleSchema, "roles");
//kết nối ra bên ngoài
module.exports = Role;