import React, { useState, useEffect, useLayoutEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Joke.scss";

const MainButtons = ({ onNext, onLike, onSave, loading }) => {
  useLayoutEffect(() => {
    const forceStyles = () => {
      const buttons = document.querySelectorAll(".main-btn");
      buttons.forEach((button) => {
        button.style.setProperty("color", "rgb(106, 163, 137)", "important");
        button.style.setProperty("opacity", "1", "important");
        button.style.setProperty("visibility", "visible", "important");
        button.style.setProperty("display", "flex", "important");
        button.style.setProperty("justify-content", "center", "important");
        button.style.setProperty("align-items", "center", "important");
      });
    };

    forceStyles();
    setTimeout(forceStyles, 10);
    setTimeout(forceStyles, 100);
  }, []);

  return (
    <div className="main-buttons-container">
      <button className="main-btn next-btn" onClick={onNext} disabled={loading}>
        {loading ? "Wait..." : "Next"}
      </button>
      <button className="main-btn like-btn" onClick={onLike} disabled={loading}>
        Like
      </button>
      <button className="main-btn save-btn" onClick={onSave} disabled={loading}>
        Save
      </button>
    </div>
  );
};

const Joke = () => {
  const [joke, setJoke] = useState({ id: null, setup: "", punchline: "" });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const location = useLocation();

  useEffect(() => {
    const applyStyles = () => {
      const buttons = document.querySelectorAll(".main-btn");
      buttons.forEach((button) => {
        button.style.setProperty("color", "rgb(106, 163, 137)", "important");
        button.style.setProperty("opacity", "1", "important");
        button.style.setProperty("visibility", "visible", "important");
      });
    };

    applyStyles();
    const timeout1 = setTimeout(applyStyles, 50);
    const timeout2 = setTimeout(applyStyles, 200);
    const timeout3 = setTimeout(applyStyles, 500);

    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
      clearTimeout(timeout3);
    };
  }, [location.key]);

  const getLikedJokes = () =>
    JSON.parse(localStorage.getItem("likedJokes")) || [];
  const getSavedJokes = () =>
    JSON.parse(localStorage.getItem("savedJokes")) || [];
  const getCurrentJoke = () =>
    JSON.parse(localStorage.getItem("currentJoke")) || null;

  const saveCurrentJoke = (currentJoke) => {
    localStorage.setItem("currentJoke", JSON.stringify(currentJoke));
  };

  const randomJoke = () => {
    setLoading(true);
    fetch("https://official-joke-api.appspot.com/random_joke")
      .then((res) => res.json())
      .then((data) => {
        const newJoke = {
          id: data.id,
          setup: data.setup,
          punchline: data.punchline,
        };
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
    if (likedJokes.some((likedJoke) => likedJoke.id === joke.id)) {
      showMessage("U've already liked this joke");
      return;
    }
    localStorage.setItem("likedJokes", JSON.stringify([...likedJokes, joke]));
    showMessage("U liked this joke 👍");
  };

  const savedJoke = () => {
    if (!joke.id) return;
    const savedJokes = getSavedJokes();
    if (savedJokes.some((savedJoke) => savedJoke.id === joke.id)) {
      showMessage("U've already saved this joke");
      return;
    }
    localStorage.setItem("savedJokes", JSON.stringify([...savedJokes, joke]));
    showMessage("U saved this joke 💾");
  };

  return (
    <div className="joke_app">
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

        <MainButtons
          onNext={randomJoke}
          onLike={likeJoke}
          onSave={savedJoke}
          loading={loading}
        />
      </div>

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
