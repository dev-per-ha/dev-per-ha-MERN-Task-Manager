import React from 'react';
import '../styles/TaskItem.css';

const TaskItem = ({ task, onDelete, onToggle }) => {
  return (
    <div className={`task-item ${task.completed ? 'done' : ''}`}>
      <span onClick={() => onToggle(task._id)}>{task.title}</span>
      <button onClick={() => onDelete(task._id)}>Delete</button>
    </div>
  );
};

export default TaskItem;
