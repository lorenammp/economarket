import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const UserContext = createContext([]);

export const UserProvider = ({ children }) => {
  const base_URL = "https://ecomarketapi.herokuapp.com";

  const [user, setUser] = useState({});
  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id");

  useEffect(() => {
    if (token === null) {
      return;
    }
    axios
      .get(`${base_URL}/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => setUser(response.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
