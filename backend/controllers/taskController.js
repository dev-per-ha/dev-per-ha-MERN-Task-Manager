import Task from '../models/Task.js';

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.userId });
    res.status(200).json(tasks); 
  } catch (err) {
    res.status(500).json({ msg: 'Error fetching tasks' });
  }
};


export const createTask = async (req, res) => {
  try {
    const { title } = req.body;
    const userId = req.user.id; // Make sure this is available from auth middleware

    console.log("User ID:", userId); // debugging

    const task = await Task.create({
      title,
      userId,
    });

    res.status(201).json(task);
  } catch (error) {
    console.error("Error:", error);
    res.status(400).json({ message: error.message });
  }
};





export const updateTask = async (req, res) => {
  try {
    const updatedTask = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      req.body,
      { new: true }
    );
    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ msg: 'Server error updating task' });
  }
};

export const deleteTask = async (req, res) => {
  try {
    await Task.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    res.json({ msg: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error deleting task' });
  }
};
