import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Saved.scss';

const Saved = () => {
    const [savedJokes, setSavedJokes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadSavedJokes = () => {
            try {
                const jokes = JSON.parse(localStorage.getItem("savedJokes")) || [];
                setSavedJokes(jokes);
            } catch (error) {
                console.error("Failed to load saved jokes:", error);
                setSavedJokes([]);
            } finally {
                setLoading(false);
            }
        };

        loadSavedJokes();
    }, []);

    const handleDeleteJoke = (idToDelete) => {
        try {
            const updatedJokes = savedJokes.filter(joke => joke.id !== idToDelete);
            localStorage.setItem("savedJokes", JSON.stringify(updatedJokes));
            setSavedJokes(updatedJokes);
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