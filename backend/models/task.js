const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title:String,
  discription: String,
  startdate:Date,
  enddate: Date,
  assign:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"employee"
  },
  status: {
    type: String,
    enum: ['Pending', 'InProgress', 'Completed'],
    default: 'Pending', // Set a default value if needed
  },
});

const task = mongoose.model('Task', taskSchema);

module.exports = task;