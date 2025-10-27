// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import "./Joke.scss";

// const Joke = () => {
//   const [joke, setJoke] = useState({ id: null, setup: "", punchline: "" });
//   const [loading, setLoading] = useState(true);
//   const [message, setMessage] = useState("");

//   const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth <= 768);
//     };

//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const randomJoke = () => {
//     setLoading(true);
//     fetch("https://official-joke-api.appspot.com/random_joke")
//       .then((res) => res.json())
//       .then((data) => {
//         setJoke({ id: data.id, setup: data.setup, punchline: data.punchline });
//       })
//       .catch((err) => console.error(err))
//       .finally(() => setLoading(false));
//   };

//   useEffect(() => {
//     randomJoke();
//   }, []);

//   const showMessage = (msg) => {
//     setMessage(msg);
//     setTimeout(() => {
//       setMessage("");
//     }, 2000);
//   };

//   const likeJoke = async () => {
//     if (!joke.id) return;

//     const response = await fetch("http://localhost:3001/likedJokes");
//     const likedJokes = await response.json();

//     const isDuplicate = likedJokes.some(
//       (likedJoke) => likedJoke.id === joke.id
//     );

//     if (isDuplicate) {
//       showMessage("U've already liked this joke");
//       return;
//     }

//     await fetch("http://localhost:3001/likedJokes", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(joke),
//     });

//     showMessage("U liked this joke 👍");
//   };

//   const savedJoke = async () => {
//     if (!joke.id) return;

//     const response = await fetch("http://localhost:3001/savedJokes");
//     const savedJokes = await response.json();

//     const isDuplicate = savedJokes.some(
//       (savedJoke) => savedJoke.id === joke.id
//     );

//     if (isDuplicate) {
//       showMessage("U've already saved this joke");
//       return;
//     }

//     await fetch("http://localhost:3001/savedJokes", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(joke),
//     });

//     showMessage("U saved this joke 💾");
//   };

//   return (
//     <div className="joke_app">
//       <div className={`message ${message ? "active" : ""}`}>
//         {message && <p>{message}</p>}
//       </div>
//       <div className="joke_app_container">
//         <div className="joke_app_title">
//           {loading ? (
//             <p className="loading-text">Loading a masterpiece... ⏳</p>
//           ) : (
//             <>
//               <h3>{joke.setup}</h3>
//               <p className="punchline">{joke.punchline}</p>
//             </>
//           )}
//         </div>
//         <div className="btn_navigation">
//           <button
//             className="big-button"
//             onClick={randomJoke}
//             disabled={loading}
//           >
//             {loading ? "Wait..." : "Next"}
//           </button>
//           <button className="big-button" onClick={likeJoke} disabled={loading}>
//             Like
//           </button>
//           <button className="big-button" onClick={savedJoke} disabled={loading}>
//             Save
//           </button>
//         </div>
//       </div>
//       <div className="liked_saved">
//         <button>
//           <Link to={"/liked"}>{isMobile ? "❤️" : "Liked"}</Link>
//         </button>
//         <button>
//           <Link to={"/saved"}>{isMobile ? "📁" : "Saved"}</Link>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Joke;

// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import "./Joke.scss";

// const Joke = () => {
//   const [joke, setJoke] = useState({ id: null, setup: "", punchline: "" });
//   const [loading, setLoading] = useState(true);
//   const [message, setMessage] = useState("");
//   const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

//   // Загрузка из localStorage
//   const getLikedJokes = () => {
//     return JSON.parse(localStorage.getItem("likedJokes")) || [];
//   };

//   const getSavedJokes = () => {
//     return JSON.parse(localStorage.getItem("savedJokes")) || [];
//   };

//   const randomJoke = () => {
//     setLoading(true);
//     fetch("https://official-joke-api.appspot.com/random_joke")
//       .then((res) => res.json())
//       .then((data) => {
//         setJoke({ id: data.id, setup: data.setup, punchline: data.punchline });
//       })
//       .catch((err) => console.error(err))
//       .finally(() => setLoading(false));
//   };

//   useEffect(() => {
//     randomJoke();
//   }, []);

//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth <= 768);
//     };
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const showMessage = (msg) => {
//     setMessage(msg);
//     setTimeout(() => {
//       setMessage("");
//     }, 2000);
//   };

//   const likeJoke = () => {
//     if (!joke.id) return;

//     const likedJokes = getLikedJokes();
//     const isDuplicate = likedJokes.some(likedJoke => likedJoke.id === joke.id);

//     if (isDuplicate) {
//       showMessage("U've already liked this joke");
//       return;
//     }

//     const updatedLikedJokes = [...likedJokes, joke];
//     localStorage.setItem("likedJokes", JSON.stringify(updatedLikedJokes));
//     showMessage("U liked this joke 👍");
//   };

//   const savedJoke = () => {
//     if (!joke.id) return;

//     const savedJokes = getSavedJokes();
//     const isDuplicate = savedJokes.some(savedJoke => savedJoke.id === joke.id);

//     if (isDuplicate) {
//       showMessage("U've already saved this joke");
//       return;
//     }

//     const updatedSavedJokes = [...savedJokes, joke];
//     localStorage.setItem("savedJokes", JSON.stringify(updatedSavedJokes));
//     showMessage("U saved this joke 💾");
//   };

//   return (
//     <div className="joke_app">
//       <div className={`message ${message ? "active" : ""}`}>
//         {message && <p>{message}</p>}
//       </div>
//       <div className="joke_app_container">
//         <div className="joke_app_title">
//           {loading ? (
//             <p className="loading-text">Loading a masterpiece... ⏳</p>
//           ) : (
//             <>
//               <h3>{joke.setup}</h3>
//               <p className="punchline">{joke.punchline}</p>
//             </>
//           )}
//         </div>
//         <div className="btn_navigation">
//           <button
//             className="big-button"
//             onClick={randomJoke}
//             disabled={loading}
//           >
//             {loading ? "Wait..." : "Next"}
//           </button>
//           <button className="big-button" onClick={likeJoke} disabled={loading}>
//             Like
//           </button>
//           <button className="big-button" onClick={savedJoke} disabled={loading}>
//             Save
//           </button>
//         </div>
//       </div>
//       <div className="liked_saved">
//         <button>
//           <Link to={"/liked"}>
//             {isMobile ? "❤️" : "Liked"}
//           </Link>
//         </button>
//         <button>
//           <Link to={"/saved"}>
//             {isMobile ? "📁" : "Saved"}
//           </Link>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Joke;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Joke.scss";

const Joke = () => {
  const [joke, setJoke] = useState({ id: null, setup: "", punchline: "" });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Загрузка из localStorage
  const getLikedJokes = () => {
    return JSON.parse(localStorage.getItem("likedJokes")) || [];
  };

  const getSavedJokes = () => {
    return JSON.parse(localStorage.getItem("savedJokes")) || [];
  };

  // Загружаем текущую шутку из localStorage
  const getCurrentJoke = () => {
    return JSON.parse(localStorage.getItem("currentJoke")) || null;
  };

  // Сохраняем текущую шутку в localStorage
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
        saveCurrentJoke(newJoke); // Сохраняем в localStorage
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    // Пытаемся загрузить сохраненную шутку
    const savedJoke = getCurrentJoke();
    
    if (savedJoke && savedJoke.id) {
      // Если есть сохраненная шутка - используем её
      setJoke(savedJoke);
      setLoading(false);
    } else {
      // Если нет сохраненной шутки - загружаем новую
      randomJoke();
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => {
      setMessage("");
    }, 2000);
  };

  const likeJoke = () => {
    if (!joke.id) return;

    const likedJokes = getLikedJokes();
    const isDuplicate = likedJokes.some(likedJoke => likedJoke.id === joke.id);

    if (isDuplicate) {
      showMessage("U've already liked this joke");
      return;
    }

    const updatedLikedJokes = [...likedJokes, joke];
    localStorage.setItem("likedJokes", JSON.stringify(updatedLikedJokes));
    showMessage("U liked this joke 👍");
  };

  const savedJoke = () => {
    if (!joke.id) return;

    const savedJokes = getSavedJokes();
    const isDuplicate = savedJokes.some(savedJoke => savedJoke.id === joke.id);

    if (isDuplicate) {
      showMessage("U've already saved this joke");
      return;
    }

    const updatedSavedJokes = [...savedJokes, joke];
    localStorage.setItem("savedJokes", JSON.stringify(updatedSavedJokes));
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
        <div className="btn_navigation">
          <button
            className="big-button"
            onClick={randomJoke}
            disabled={loading}
          >
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
      <div className="liked_saved">
        <button>
          <Link to={"/liked"}>
            {isMobile ? "❤️" : "Liked"}
          </Link>
        </button>
        <button>
          <Link to={"/saved"}>
            {isMobile ? "📁" : "Saved"}
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Joke;