import React, { useEffect, useState } from "react";
import axios from "axios";
import io from "socket.io-client";
const socket = io.connect("http://localhost:8080");

const App = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const response = await axios
      .get("http://localhost:8080/api")
      .then(({ data }) => setData(data));
  };

  return (
    <div className="flex flex-col min-w-full min-h-screen items-center justify-center bg-third relative">
      <button
        onClick={() => {
          fetchData();
          socket.emit("browse");
        }}
        className="text-white bg-primary px-14 py-2 mb-20 font-extralight text-2xl rounded-full shadow-gray-800 hover:bg-quattro, hover:scale-105 shadow-lg  active:bg-secondary active:scale-95 duration-150  "
      >
        Fetch data
      </button>

      <h1 className="text-white text-7xl font-extrabold">
        Vite + React + <span className="font-thin">Express.js</span>
      </h1>
      <div className="mt-10 flex flex-col items-center ">
        {data.length === 0 ? (
          <p className="text-white  text-xl font-extralight tracking-wider">
            Click the button to fetch the data.
          </p>
        ) : (
          data.map((user, i) => (
            <p
              key={i}
              className="text-white capitalize text-xl font-extralight tracking-wider my-2"
            >
              {user.name}
            </p>
          ))
        )}
      </div>
    </div>
  );
};

export default App;
