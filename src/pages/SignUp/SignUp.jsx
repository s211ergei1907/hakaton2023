import React, { useState } from "react";
import { axiosInstance } from "../../axios";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleRegistration = async () => {
    if (username !== "" && password !== "" && email !== "") {
      try {
        const response = await axiosInstance.post("/registration", {
          username,
          password,
          email,
        });
        console.log("Успешная регистрация", response.data);
        navigate("/auth");
      } catch (error) {
        console.error("Ошибка регистрации", error.response.data);
      }
    } else {
      alert("Введите все поля");
    }
  };

  return (
    <div>
      <h2>Регистрация</h2>
      <br />
      <form>
        <label>
          <input
            style={{ width: "500px" }}
            placeholder="Имя пользователя:"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <br />
        <label>
          <input
            style={{ width: "500px" }}
            placeholder="Пароль"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <br />
        <label>
          <input
            style={{ width: "500px" }}
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <br />
        <br />
        <button type="button" onClick={handleRegistration}>
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
};

export default Registration;
