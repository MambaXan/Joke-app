import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Saved.scss';

const Saved = () => {
    const [savedJokes, setSavedJokes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:3001/savedJokes")
            .then(res => res.json())
            .then(data => {
                setSavedJokes(data);
            })
            .catch(err => console.error("Failed to fetch saved jokes:", err))
            .finally(() => setLoading(false));
    }, []);

    // 1. Функция для удаления шутки
    const handleDeleteJoke = async (idToDelete) => {
        try {
            // Указываем правильный эндпоинт - savedJokes
            await fetch(`http://localhost:3001/savedJokes/${idToDelete}`, {
                method: 'DELETE',
            });
            
            // Обновляем состояние savedJokes
            setSavedJokes(prevJokes => prevJokes.filter(joke => joke.id !== idToDelete));

        } catch (error) {
            console.error("Failed to delete the joke:", error);
        }
    };

    return (
        <div className='saved-page'>
            <div className="saved-container">
                <div className="saved-header">
                    <h1>Saved Jokes 💾</h1>
                    <Link to="/" className="back-link">Back</Link>
                </div>

                {loading ? (
                    <p className="list-message">Loading jokes...</p>
                ) : savedJokes.length > 0 ? (
                    <div className="jokes-list">
                        {savedJokes.map(joke => (
                            <div key={joke.id} className="joke-item">
                               <div className="joke-content">
                                    <p className="setup">{joke.setup}</p>
                                    <p className="punchline">{joke.punchline}</p>
                                </div>
                                {/* 2. Кнопка удаления */}
                                <button onClick={() => handleDeleteJoke(joke.id)} className="delete-btn">
                                    &times;
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="list-message">You haven't saved any jokes yet.</p>
                )}
            </div>
        </div>
    );
};

export default Saved;