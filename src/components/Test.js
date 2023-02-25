import React, { useRef, useState } from "react";
import { TiDelete } from "react-icons/ti";
import { BiEdit } from "react-icons/bi";
import "./ToDoApp.css";
import UserName from "./UserName";

//made with using localstorage
function Test() {
  const storeTodo = JSON.parse(localStorage.getItem("todos"));
  const inpoutUserName = JSON.parse(localStorage.getItem("userName"));

  (function () {
    if (!storeTodo) {
      localStorage.setItem(
        "todos",
        JSON.stringify([
          "Everything start from scratch",
          "Reduce bottlenecks and busywork",
        ])
      );
    }
  })();

  (function () {
    if (!inpoutUserName) {
      localStorage.setItem("userName", JSON.stringify("User"));
    }
  })();

  const [todo, setTodo] = useState("");
  const [color, setColor] = useState(false);
  const [displayTodo, setDisplayTodo] = useState(storeTodo);
  const [displayUserName, setDisplayUserName] = useState(inpoutUserName);
  const ref = useRef(null);

  // add input value into the todo state
  const getListItem = (e) => {
    setTodo(e.target.value);
  };

  // add a single todo into the displayTodo array
  const addTodo = (e) => {
    e.preventDefault();
    if (todo === "") {
      setDisplayTodo((oldListitem) => {
        return [...oldListitem];
      });
    } else {
      setDisplayTodo((oldListitem) => {
        localStorage.setItem("todos", JSON.stringify([todo, ...oldListitem]));
        return [todo, ...oldListitem];
      });
      setTodo("");
      ref.current.focus();
    }
  };

  // delete single todo into the list
  const deleteTodo = (id) => {
    localStorage.setItem(
      "todos",
      JSON.stringify(
        displayTodo.filter((v, i) => {
          return id !== i;
        })
      )
    );
    setDisplayTodo(JSON.parse(localStorage.getItem("todos")));
  };

  ////////////////////////////////////////
  const editTodo = (id) => {
    setTodo(displayTodo[id]);
    localStorage.setItem(
      "todos",
      JSON.stringify(
        displayTodo.filter((v, i) => {
          return id !== i;
        })
      )
    );
    setDisplayTodo(JSON.parse(localStorage.getItem("todos")));
    ref.current.focus();
  };

  const changeColor = () => {
    setColor(!color);
  };
  ///////////////////////////////////////////////////////////////
  return (
    <div className="todoWrapper">
      <div className="todoInner">
        <UserName setName={setDisplayUserName} />
        <div className="profile">
          <span>Wellcame</span>
          <h2>{displayUserName}</h2>
        </div>
        <div className="input">
          <form onSubmit={addTodo}>
            <input
              ref={ref}
              autoFocus
              onChange={getListItem}
              type="text"
              placeholder="Enter your task"
              value={todo}
            />
          </form>
          <button onClick={addTodo}>+</button>
        </div>
        <div className="listItem">
          <ul>
            {displayTodo.map((todo, index) => {
              return (
                <li onClick={changeColor} id={index} key={index}>
                  <TiDelete
                    onClick={() => {
                      deleteTodo(index);
                    }}
                  />
                  <BiEdit
                    onClick={() => {
                      editTodo(index);
                    }}
                  />
                  {/* style={{ color: color ? "red" : "blue" }} */}
                  <span>{todo}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Test;
