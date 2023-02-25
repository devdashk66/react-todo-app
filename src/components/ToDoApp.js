import React, { useRef, useState } from "react";
import { TiDelete } from "react-icons/ti";
import { BiEdit } from "react-icons/bi";
import "./ToDoApp.css";

//made with out using localstorage
function ToDoApp() {
  const [todo, setTodo] = useState("");
  const [displayTodo, setDisplayTodo] = useState(["hello", "world"]);
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
        return [todo, ...oldListitem];
      });
      setTodo("");
      ref.current.focus();
    }
  };

  // delete single todo into the list
  const deleteTodo = (id) => {
    setDisplayTodo((oldListitem) => {
      return oldListitem.filter((v, i, a) => {
        return id !== i;
      });
    });
  };

  // delete single todo into the list
  const editTodo = (id) => {
    setDisplayTodo((oldListitem) => {
      setTodo(oldListitem[id]);
      return oldListitem.filter((v, i, a) => {
        return id !== i;
      });
    });
    ref.current.focus();
  };

  return (
    <div className="todoWrapper">
      <div className="todoInner">
        <div className="profile">
          <h1>What's up user</h1>
        </div>
        <div className="input">
          <form onSubmit={addTodo}>
            <input
              ref={ref}
              autoFocus
              onChange={getListItem}
              type="text"
              placeholder="Type your todos"
              value={todo}
            />
          </form>
          <button onClick={addTodo}>+</button>
        </div>
        <div className="listItem">
          <ul>
            {displayTodo.map((todo, index) => {
              return (
                <li id={index} key={index}>
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

export default ToDoApp;
