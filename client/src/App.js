import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [data, setData] = useState([]);
  const getData = async () => {
    try {
      const data = await axios.get('http://localhost:8000/user', {
        headers: { apikey: 'key123' },
      });
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <button onClick={getData}>取得</button>
      {data.map((user) => {
        return (
          <div key={user.email}>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
            <ul>
              {user.skills.map((skill) => {
                return <li key={skill}>{skill}</li>;
              })}
            </ul>
          </div>
        );
      })}
    </>
  );
};
export default App;
