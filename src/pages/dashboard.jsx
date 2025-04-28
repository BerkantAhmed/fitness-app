import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const [newWorkout, setNewWorkout] = useState({
  title: '',
  description: '',
  exercises: ''
});


const handleInputChange = (e) => {
  setNewWorkout({ ...newWorkout, [e.target.name]: e.target.value });
};


const handleCreate = async (e) => {
  e.preventDefault();
  const exercisesArray = newWorkout.exercises.split(',').map(e => e.trim());

  const workoutData = {
    title: newWorkout.title,
    description: newWorkout.description,
    exercises: exercisesArray
  };
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/workouts/${id}`);
      setWorkouts(workouts.filter(workout => workout.id !== id));
    } catch (error) {
      alert('Грешка при изтриване на тренировка');
    }
  };
  

  try {
    const res = await axios.post('http://localhost:3001/workouts', workoutData);
    setWorkouts([...workouts, res.data]); 
    setNewWorkout({ title: '', description: '', exercises: '' }); 
  } catch (error) {
    alert('Грешка при създаване на тренировка');
  }
};

export default function Dashboard() {
  const [workouts, setWorkouts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    axios.get('http://localhost:3001/workouts')
      .then(res => setWorkouts(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>🏋️‍♂️ Workout Programs</h2>
      <form onSubmit={handleCreate} style={{ marginBottom: '20px' }}>
  <h3>➕ Add New Workout</h3>
  <input
    type="text"
    name="title"
    placeholder="Title"
    value={newWorkout.title}
    onChange={handleInputChange}
    required
  />
  <br />
  <input
    type="text"
    name="description"
    placeholder="Description"
    value={newWorkout.description}
    onChange={handleInputChange}
    required
  />
  <br />
  <input
    type="text"
    name="exercises"
    placeholder="Exercises (comma separated)"
    value={newWorkout.exercises}
    onChange={handleInputChange}
    required
  />
  <br />
  <button type="submit">Add Workout</button>
</form>

      {workouts.length === 0 ? (
        <p>Loading workouts...</p>
      ) : (
        workouts.map(w => (
          <div key={w.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
            <h3>{w.title}</h3>
            <p>{w.description}</p>
            <ul>
              {w.exercises.map((ex, idx) => (
                <li key={idx}>{ex}</li>
              ))}
            </ul>
            <button onClick={() => handleDelete(w.id)} style={{ background: 'red', color: 'white' }}>
      Delete
    </button>
          </div>
        ))
      )}
    </div>
  );
}
