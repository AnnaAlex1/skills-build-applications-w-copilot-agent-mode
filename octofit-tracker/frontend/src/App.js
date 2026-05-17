import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

function ActivitiesTable({ activities }) {
  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover data-table table-fixed">
        <thead className="table-light">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Activity</th>
            <th scope="col">Duration</th>
            <th scope="col">Calories</th>
            <th scope="col">Date</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((a, i) => (
            <tr key={i}>
              <th scope="row">{i + 1}</th>
              <td>{a.name}</td>
              <td>{a.duration}</td>
              <td>{a.calories}</td>
              <td>{a.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ActivityForm({ onAdd }) {
  const [name, setName] = useState('Run');
  const [duration, setDuration] = useState('30m');

  function handleSubmit(e) {
    e.preventDefault();
    onAdd({ name, duration, calories: Math.floor(Math.random() * 400) + 50, date: new Date().toLocaleDateString() });
    setName('');
    setDuration('');
  }

  return (
    <form onSubmit={handleSubmit} className="needs-validation" noValidate>
      <div className="mb-3">
        <label className="form-label">Activity</label>
        <input className="form-control" value={name} onChange={e => setName(e.target.value)} placeholder="e.g., Run" required />
      </div>
      <div className="mb-3">
        <label className="form-label">Duration</label>
        <input className="form-control" value={duration} onChange={e => setDuration(e.target.value)} placeholder="e.g., 30m" required />
      </div>
      <div className="d-flex gap-2">
        <button type="submit" className="btn btn-primary">Add Activity</button>
        <button type="button" className="btn btn-outline-secondary">Clear</button>
      </div>
    </form>
  );
}

function Home() {
  const [activities, setActivities] = useState([
    { name: 'Run', duration: '30m', calories: 300, date: '2026-05-10' },
    { name: 'Swim', duration: '45m', calories: 400, date: '2026-05-11' },
    { name: 'Cycle', duration: '60m', calories: 550, date: '2026-05-12' },
  ]);
  const [showModal, setShowModal] = useState(false);

  function addActivity(a) {
    setActivities(prev => [a, ...prev]);
  }

  return (
    <div className="container py-5">
      <div className="app-header mb-4">
        <h1 className="h3">OctoFit Tracker</h1>
        <p className="lead">Track your workouts, join teams, and climb the leaderboard.</p>
      </div>

      <div className="row g-4">
        <div className="col-lg-8">
          <div className="card card-custom">
            <div className="card-body">
              <h2 className="h5 card-title">Recent Activities</h2>
              <ActivitiesTable activities={activities} />
              <div className="mt-3 d-flex justify-content-end gap-2">
                <button className="btn btn-sm btn-outline-primary">Export CSV</button>
                <button className="btn btn-sm btn-primary" onClick={() => setShowModal(true)}>Add Quick</button>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card card-custom">
            <div className="card-body">
              <h3 className="h6 card-title">Log Activity</h3>
              <ActivityForm onAdd={addActivity} />
            </div>
          </div>
          <div className="mt-3">
            <div className="card card-custom">
              <div className="card-body">
                <h3 className="h6">Resources</h3>
                <ul className="list-unstyled mb-0">
                  <li><a className="link-primary" href="#">Getting started</a></li>
                  <li><a className="link-primary" href="#">Teams & Challenges</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <>
          <div className="modal-backdrop-custom" onClick={() => setShowModal(false)} />
          <div className="modal modal-custom d-block" tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Quick Add Activity</h5>
                  <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowModal(false)}></button>
                </div>
                <div className="modal-body">
                  <p>Use the Log Activity form to quickly add an activity.</p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
                  <button type="button" className="btn btn-primary" onClick={() => setShowModal(false)}>Got it</button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function About() {
  return (
    <div className="container py-5">
      <h1 className="h3">About</h1>
      <p>This app helps fitness enthusiasts log activities and compete with friends.</p>
    </div>
  );
}

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <img src="/octofitapp-small.svg" alt="OctoFit" className="me-2 logo-sm" />
            <span>OctoFit</span>
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navmenu" aria-controls="navmenu" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navmenu">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">About</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
