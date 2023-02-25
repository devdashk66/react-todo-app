import React, { useEffect, useState } from "react";

function UserName(dev) {
  //   console.log(dev.setName);
  const [userName, setUserName] = useState("");
  const [hidePop, setHidePop] = useState({});
  const inpoutUserName = JSON.parse(localStorage.getItem("userName"));

  const checkUsername = () => {
    if (!!inpoutUserName && !(inpoutUserName === "User")) {
      setHidePop({ display: "none" });
    }
  };

  //   console.log(dev.showAgain);

  useEffect(() => {
    checkUsername();
  }, []);

  const getUserName = (e) => {
    setUserName(e.target.value);
  };

  const sotreUserNameToLocaStorage = () => {
    if (userName) {
      localStorage.setItem("userName", JSON.stringify([userName]));
      setHidePop({ top: "-100rem", left: "-45rem", borderRadius: "50%" });
      dev.setName(userName);
    }
  };
  return (
    <div style={hidePop} className="userName">
      <input
        onChange={getUserName}
        placeholder="Write your name !!!"
        type="text"
      />
      <button onClick={sotreUserNameToLocaStorage}>Set Name</button>
    </div>
  );
}

export default UserName;
