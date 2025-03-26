<template>
    <nav class="navbar">
      <h1>Maria & Andres</h1>
      <ul>
        <li><router-link to="/">Dashboard</router-link></li>
        <li><router-link to="/login">Login</router-link></li>
        <li><router-link to="/register">Register</router-link></li>
      </ul>
    </nav>
  </template>
  
  <style scoped>
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #111;
    color: #fff;
    padding: 1rem 2rem;
    font-family: 'Georgia', serif;
  }
  
  .navbar h1 {
    font-size: 1.5rem;
  }
  
  .navbar ul {
    list-style: none;
    display: flex;
    gap: 1rem;
  }
  
  .navbar a {
    color: #fff;
    text-decoration: none;
  }
  
  .navbar a:hover {
    text-decoration: underline;
  }
  </style>
  