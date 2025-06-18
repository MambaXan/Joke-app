import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Liked.scss';

const Liked = () => {
    const [likedJokes, setLikedJokes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:3001/likedJokes")
            .then(res => res.json())
            .then(data => {
                setLikedJokes(data);
            })
            .catch(err => console.error("Failed to fetch liked jokes:", err))
            .finally(() => setLoading(false));
    }, []);

    // 1. Функция для удаления шутки
    const handleDeleteJoke = async (idToDelete) => {
        try {
            // Отправляем запрос на удаление в db.json
            await fetch(`http://localhost:3001/likedJokes/${idToDelete}`, {
                method: 'DELETE',
            });

            // Обновляем состояние, убирая удаленную шутку
            // Это заставит React перерисовать список
            setLikedJokes(prevJokes => prevJokes.filter(joke => joke.id !== idToDelete));

        } catch (error) {
            console.error("Failed to delete the joke:", error);
        }
    };

    return (
        <div className='liked-page'>
            <div className="liked-container">
                <div className="liked-header">
                    <h1>Liked Jokes ❤️</h1>
                    <Link to="/" className="back-link">Back</Link>
                </div>

                {loading ? (
                    <p className="list-message">Loading jokes...</p>
                ) : likedJokes.length > 0 ? (
                    <div className="jokes-list">
                        {likedJokes.map(joke => (
                            <div key={joke.id} className="joke-item">
                                <div className="joke-content">
                                    <p className="setup">{joke.setup}</p>
                                    <p className="punchline">{joke.punchline}</p>
                                </div>
                                {/* 2. Кнопка удаления, вызывающая нашу функцию */}
                                <button onClick={() => handleDeleteJoke(joke.id)} className="delete-btn">
                                    &times;
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="list-message">You haven't liked any jokes yet.</p>
                )}
            </div>
        </div>
    );
};

export default Liked;