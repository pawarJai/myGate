const Visitor = require('../models/Visitor');

// Add a new visitor
const addVisitor = async (req, res) => {
  const { name, contact, purpose, residentId } = req.body;

  try {
    const newVisitor = new Visitor({
      name,
      contact,
      purpose,
      resident: residentId,
    });
    await newVisitor.save();
    res.status(201).json(newVisitor);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get all visitors
const getAllVisitors = async (req, res) => {
  try {
    const visitors = await Visitor.find().populate('resident', 'name email');
    res.status(200).json(visitors);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get Visitors by id
const getVisitorById = async (req, res) => {
  try {
    const visitor = await Visitor.findById(req.params.id).populate(
      'resident',
      'name email'
    );
    if (!visitor) {
      return res.status(404).send('Visitor not found');
    }
    res.status(200).json(visitor);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

module.exports = { addVisitor, getAllVisitors, getVisitorById };
