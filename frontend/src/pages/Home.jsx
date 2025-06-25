import React, { useEffect, useState } from 'react';
import '../styles/Home.css';

function Home({ token, onLogout }) {
const [tasks, setTasks] = useState([]); 
  const [newTask, setNewTask] = useState('');
  const [loading, setLoading] = useState(false);

const fetchTasks = async () => {
  try {
    const res = await fetch('http://localhost:5000/api/tasks', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();

         console.log('Fetched tasks response:', data); 

    // 🛡️ Safeguard: only accept array
    if (Array.isArray(data)) {
      setTasks(data);
    } else {
      console.error('Invalid tasks response:', data);
      setTasks([]); // fallback to prevent crash
    }
  } catch (err) {
    console.error('Error fetching tasks:', err);
    setTasks([]); // fallback to prevent crash
  }
};



const addTask = async () => {
  if (!newTask.trim()) return;

  try {
    const res = await fetch('http://localhost:5000/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, 
      },
      body: JSON.stringify({ title: newTask }),
    });

    const data = await res.json();
    console.log('Add Task Response:', data); 

    if (res.ok) {
      setTasks((prev) => [...prev, data]);
      setNewTask('');
    } else {
      alert(data.msg || 'Failed to add task');
    }
  } catch (err) {
    alert('Request error while adding task.');
  }
};




  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="home-container fade-in">
      <header>
        <h1>Task Manager</h1>
        <button className="logout-btn" onClick={onLogout}>Logout</button>
      </header>

      <div className="task-input">
        <input
          placeholder="New task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={addTask} disabled={loading}>
          {loading ? 'Adding...' : 'Add'}
        </button>
      </div>

    <ul className="task-list">
  {Array.isArray(tasks) ? (
    tasks.map(task => (
      <li key={task._id} className={task.completed ? 'completed' : ''}>
        {task.title}
      </li>
    ))
  ) : (
    <li>Error loading tasks.</li>
  )}
</ul>


    </div>
  );
}

export default Home;
