import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Joke.scss";

const Joke = () => {
  const [joke, setJoke] = useState({ id: null, setup: "", punchline: "" });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // Принудительное применение стилей при каждом рендере
  useEffect(() => {
    const forceButtonStyles = () => {
      const buttons = document.querySelectorAll('.big-button');
      buttons.forEach(button => {
        button.style.color = 'rgb(106, 163, 137)';
        button.style.opacity = '1';
        button.style.visibility = 'visible';
      });
    };

    forceButtonStyles();
    setTimeout(forceButtonStyles, 100);
    setTimeout(forceButtonStyles, 500);
  });

  const getLikedJokes = () => JSON.parse(localStorage.getItem("likedJokes")) || [];
  const getSavedJokes = () => JSON.parse(localStorage.getItem("savedJokes")) || [];
  const getCurrentJoke = () => JSON.parse(localStorage.getItem("currentJoke")) || null;

  const saveCurrentJoke = (currentJoke) => {
    localStorage.setItem("currentJoke", JSON.stringify(currentJoke));
  };

  const randomJoke = () => {
    setLoading(true);
    fetch("https://official-joke-api.appspot.com/random_joke")
      .then((res) => res.json())
      .then((data) => {
        const newJoke = { id: data.id, setup: data.setup, punchline: data.punchline };
        setJoke(newJoke);
        saveCurrentJoke(newJoke);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    const savedJoke = getCurrentJoke();
    if (savedJoke && savedJoke.id) {
      setJoke(savedJoke);
      setLoading(false);
    } else {
      randomJoke();
    }
  }, []);

  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 2000);
  };

  const likeJoke = () => {
    if (!joke.id) return;
    const likedJokes = getLikedJokes();
    if (likedJokes.some(likedJoke => likedJoke.id === joke.id)) {
      showMessage("U've already liked this joke");
      return;
    }
    localStorage.setItem("likedJokes", JSON.stringify([...likedJokes, joke]));
    showMessage("U liked this joke 👍");
  };

  const savedJoke = () => {
    if (!joke.id) return;
    const savedJokes = getSavedJokes();
    if (savedJokes.some(savedJoke => savedJoke.id === joke.id)) {
      showMessage("U've already saved this joke");
      return;
    }
    localStorage.setItem("savedJokes", JSON.stringify([...savedJokes, joke]));
    showMessage("U saved this joke 💾");
  };

  return (
    <div className="joke_app">
      {/* ТЕСТОВАЯ МЕТКА */}
      <div style={{
        position: 'fixed', 
        top: 10, 
        left: 10, 
        background: 'blue', 
        color: 'white', 
        padding: '5px 10px',
        fontSize: '12px',
        zIndex: 9999
      }}>
        FIXED LAYOUT: {new Date().toLocaleTimeString()}
      </div>
      
      <div className={`message ${message ? "active" : ""}`}>
        {message && <p>{message}</p>}
      </div>
      
      <div className="joke_app_container">
        <div className="joke_app_title">
          {loading ? (
            <p className="loading-text">Loading a masterpiece... ⏳</p>
          ) : (
            <>
              <h3>{joke.setup}</h3>
              <p className="punchline">{joke.punchline}</p>
            </>
          )}
        </div>
        
        {/* ОСНОВНЫЕ КНОПКИ - БЕЗ SPAN, ПРОСТО ТЕКСТ */}
        <div className="btn_navigation">
          <button className="big-button" onClick={randomJoke} disabled={loading}>
            {loading ? "Wait..." : "Next"}
          </button>
          <button className="big-button" onClick={likeJoke} disabled={loading}>
            Like
          </button>
          <button className="big-button" onClick={savedJoke} disabled={loading}>
            Save
          </button>
        </div>
      </div>
      
      {/* КНОПКИ НАВИГАЦИИ */}
      <div className="liked_saved">
        <button className="nav-button">
          <Link to={"/liked"}>Liked</Link>
        </button>
        <button className="nav-button">
          <Link to={"/saved"}>Saved</Link>
        </button>
      </div>
    </div>
  );
};

export default Joke;