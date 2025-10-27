import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Liked.scss';

const Liked = () => {
    const [likedJokes, setLikedJokes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadLikedJokes = () => {
            try {
                const jokes = JSON.parse(localStorage.getItem("likedJokes")) || [];
                setLikedJokes(jokes);
            } catch (error) {
                console.error("Failed to load liked jokes:", error);
                setLikedJokes([]);
            } finally {
                setLoading(false);
            }
        };

        loadLikedJokes();
    }, []);

    const handleDeleteJoke = (idToDelete) => {
        try {
            const updatedJokes = likedJokes.filter(joke => joke.id !== idToDelete);
            localStorage.setItem("likedJokes", JSON.stringify(updatedJokes));
            setLikedJokes(updatedJokes);
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