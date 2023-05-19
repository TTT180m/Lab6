import React, { useState, useEffect } from "react";

const UserInitial = [
  { username: "tudor", password: "parola" },
  { username: "tudor", password: "late" },
  { username: "pahomea", password: "sa&nd2w" },
];

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLogged, setIsLogged] = useState(false);
  const [users, setUsers] = useState(UserInitial);

  useEffect(() => {
    const storedUsers = localStorage.getItem("users");
    if (storedUsers) {
      setUsers([...users, ...JSON.parse(storedUsers)]);
    }
  }, [users]);

  const handleLogin = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    const foundUser = users.find(
      (user) => user.username === username && user.password === password
    );
    if (foundUser) {
      setIsLogged(true);
      localStorage.setItem("isLogged", "true");
      localStorage.setItem("user", JSON.stringify(foundUser));
      alert("Autentificare reușită");
    } else {
      alert("Autentificare eșuată");
    }
  };

  const handleLogout = () => {
    setIsLogged(false);
    localStorage.setItem("isLogged", "false");
    alert("Deconectare cu succes");
  };

  const renderLoginForm = () => {
    return (
      <form onSubmit={handleLogin}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        <br />
        <button type="submit" style={{ backgroundColor: "blue", color: "white", padding: "8px 16px", border: "none", borderRadius: "4px", cursor: "pointer" }}>Autentificare</button>
      </form>
    );
  };

  const renderLogoutButton = () => {
    const storedUser = localStorage.getItem("user");
    const loggedInUser = storedUser ? JSON.parse(storedUser) : null;
    return (
      <div>
        {loggedInUser && <p>Bun venit, {loggedInUser.username}!</p>}
        <button onClick={handleLogout} style={{ backgroundColor: "red", color: "white", padding: "8px 16px", border: "none", borderRadius: "4px", cursor: "pointer" }}>Deconectare</button>
      </div>
    );
  };

  return <div>{isLogged ? renderLogoutButton() : renderLoginForm()}</div>;
};

export default App;
