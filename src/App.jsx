import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import { nanoid } from "nanoid";

function App() {
  const [todos, setTodos] = useState("");
  const [inputValue, setInputValue] = useState("");
  const headers = {
    "Content-Type": "text/plain",
  };

  async function getData() {
    await axios.get(`http://localhost:5000/posts/`).then((res) => {
      const data = res.data;
      setTodos(data);
    });
  }

  function handleInputValue(e) {
    setInputValue(e.target.value);
  }

  async function handleClick() {
    await axios
      .post(`http://localhost:5000/posts/`, { action: inputValue }, { headers })
      .then(() => {
        getData();
      })
      .catch((error) => {
        console.log(error);
      });
  }
  async function handleRemove(id) {
    await axios
      .delete(`http://localhost:5000/posts/${id}/`, { headers })
      .then(() => {
        console.log(id);
      })
      .then(() => {
        getData();
      })
      .catch((error) => {
        console.log(error);
      });
  }
  async function handleComplete(id) {
    await axios
      .patch(`http://localhost:5000/posts/${id}/`, { headers })
      .then(() => {
        console.log(id);
      })
      .then(() => {
        getData();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getData();
  }, []);

  if (todos === "") {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Loading...</h1>
        </header>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="Input-style">
          <input type="text" onChange={handleInputValue} />
          <button onClick={handleClick}>Add</button>
        </div>
        <ul>
          {todos.Todos.map((todo) => (
            <div className="Map-style">
              {todo.complete ? (
                <h4 style={{ textDecoration: "line-through" }}>
                  {todo.action}
                </h4>
              ) : (
                <h4>{todo.action}</h4>
              )}
              <button
                onClick={() => {
                  handleRemove(todo.id);
                }}
              >
                ❌
              </button>
              <button
                onClick={() => {
                  handleComplete(todo.id);
                }}
              >
                ✅
              </button>
            </div>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
