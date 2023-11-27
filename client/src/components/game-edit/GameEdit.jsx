import { useNavigate, useParams } from 'react-router-dom';

import * as gameService from "../../services/gameService";
import useForm from '../../hooks/useForm';
import { useEffect, useState } from 'react';

export default function GameEdit() {
    const navigate = useNavigate();

    const { gameId } = useParams();

    const [game, setGame] = useState({
        title: '',
        category: '',
        maxLevel: '',
        imageUrl: '',
        summary: ''
    });

    useEffect(() => {
        gameService.getOne(gameId)
            .then(result => setGame(result));
    }, [gameId]);


    const editGameSubmitHandler = async (e) => {
        e.preventDefault();

        const values = Object.fromEntries(new FormData(e.currentTarget));

        try {
            await gameService.edit(gameId, values);

            window.scrollTo(0, 0);

            navigate(`/games/${gameId}`);
        } catch (err) {
            console.log(err);
        }
    }

    const onChange = (e) => {
        setGame(state => ({
            ...state,
            [e.target.name]: e.target.value
        }));
    };

    //const { values, onChange, onSubmit } = useForm(createGameSubmitHandler, game);

    return (
        <section id="create-page" className="auth">
            <form id="create" onSubmit={editGameSubmitHandler}>
                <div className="container">
                    <h1>Edit Game</h1>

                    <label htmlFor="leg-title">Legendary title:</label>
                    <input type="text" id="title" name="title" onChange={onChange} value={game.title} placeholder="Enter game title..." />

                    <label htmlFor="category">Category:</label>
                    <input type="text" id="category" name="category" onChange={onChange} value={game.category} placeholder="Enter game category..." />

                    <label htmlFor="levels">MaxLevel:</label>
                    <input type="number" id="maxLevel" name="maxLevel" onChange={onChange} value={game.maxLevel} min={1} />

                    <label htmlFor="game-img">Image:</label>
                    <input type="text" id="imageUrl" name="imageUrl" onChange={onChange} value={game.imageUrl} placeholder="Upload a photo..." />

                    <label htmlFor="summary">Summary:</label>
                    <textarea name="summary" id="summary" onChange={onChange} value={game.summary} />

                    <input className="btn submit" type="submit" value="Edit game" />
                </div>
            </form>
        </section>
    );
}