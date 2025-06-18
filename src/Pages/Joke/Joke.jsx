// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import "./Joke.scss";

// const Joke = () => {
//   const [joke, setJoke] = useState({ setup: "", punchline: "" });
//   const [loading, setLoading] = useState(true);
//   const [message, setMessage] = useState("");

//   const randomJoke = () => {
//     setLoading(true);
//     fetch("https://official-joke-api.appspot.com/random_joke")
//       .then((res) => res.json())
//       .then((data) => {
//         setJoke({ setup: data.setup, punchline: data.punchline });
//       })
//       .catch((err) => console.error(err))
//       .finally(() => setLoading(false));
//   };

//   useEffect(() => {
//     randomJoke();
//   }, []);

//   const likeJoke = () => {
//     fetch("http://localhost:3001/likedJokes", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(joke),
//     })
//       .then((res) => res.json())
//       .then(() => {
//         setMessage("u liked this joke");
//         setTimeout(() => {
//           setMessage("");
//         }, 1500);
//       });
//   };

//   const savedJoke = () => {
//     fetch("http://localhost:3001/savedJokes", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(joke),
//     })
//       .then((res) => res.json())
//       .then(() => {
//         setMessage("u saved this joke");
//         setTimeout(() => {
//           setMessage("");
//         }, 1500);
//       });
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
//           <button className="big-button" onClick={likeJoke}>
//             Like
//           </button>
//           <button className="big-button" onClick={savedJoke}>
//             Save
//           </button>
//         </div>
//       </div>
//       <div className="liked_saved">
//         <button><Link to={'/liked'}>Liked</Link></button>
//         <button><Link to={'/saved'}>Saved</Link></button>
//       </div>
//     </div>
//   );
// };

// export default Joke;
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Joke.scss";

const Joke = () => {
  // Добавляем ID в состояние для надежной проверки на дубликаты
  const [joke, setJoke] = useState({ id: null, setup: "", punchline: "" });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const randomJoke = () => {
    setLoading(true);
    fetch("https://official-joke-api.appspot.com/random_joke")
      .then((res) => res.json())
      .then((data) => {
        // Сохраняем все данные, включая id
        setJoke({ id: data.id, setup: data.setup, punchline: data.punchline });
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    randomJoke();
  }, []);

  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => {
      setMessage("");
    }, 2000);
  };

  // Переписываем на async/await для чистоты
  const likeJoke = async () => {
    if (!joke.id) return; // Не сохраняем, если шутка еще не загружена

    // 1. Сначала получаем все лайкнутые шутки
    const response = await fetch("http://localhost:3001/likedJokes");
    const likedJokes = await response.json();

    // 2. Проверяем, есть ли уже шутка с таким ID
    const isDuplicate = likedJokes.some((likedJoke) => likedJoke.id === joke.id);

    if (isDuplicate) {
      showMessage("U've already liked this joke");
      return;
    }

    // 3. Если дубликата нет, отправляем POST запрос
    await fetch("http://localhost:3001/likedJokes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(joke),
    });
    
    showMessage("U liked this joke 👍");
  };

  // Аналогичная логика для сохранения
  const savedJoke = async () => {
    if (!joke.id) return;

    // 1. Получаем сохраненные шутки
    const response = await fetch("http://localhost:3001/savedJokes");
    const savedJokes = await response.json();

    // 2. Проверяем на дубликаты
    const isDuplicate = savedJokes.some((savedJoke) => savedJoke.id === joke.id);

    if (isDuplicate) {
      showMessage("U've already saved this joke");
      return;
    }
    
    // 3. Сохраняем, если не дубликат
    await fetch("http://localhost:3001/savedJokes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(joke),
    });
    
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
        <button><Link to={'/liked'}>Liked</Link></button>
        <button><Link to={'/saved'}>Saved</Link></button>
      </div>
    </div>
  );
};

export default Joke;