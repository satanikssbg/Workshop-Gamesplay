import { useNavigate, useParams } from 'react-router-dom';

import * as gameService from "../../services/gameService";
import useForm from '../../hooks/useForm';
import { useEffect, useState } from 'react';

export default function GameEdit() {
    const navigate = useNavigate();
    const { gameId } = useParams();
    const [game, setGame] = useState({});

    useEffect(() => {
        gameService.getOne(gameId)
            .then(result => setGame(result));
    }, [gameId]);


    const createGameSubmitHandler = async (values) => {
        try {
            await gameService.edit(gameId, values);

            window.scrollTo(0, 0);

            navigate(`/games/${gameId}`);
        } catch (err) {
            console.log(err);
        }
    }

    const { values, onChange, onSubmit } = useForm(createGameSubmitHandler, game);

    return (
        <section id="create-page" className="auth">
            <form id="create" onSubmit={onSubmit}>
                <div className="container">
                    <h1>Edit Game</h1>

                    <label htmlFor="leg-title">Legendary title:</label>
                    <input onChange={onChange} value={values.title} type="text" id="title" name="title" placeholder="Enter game title..." />

                    <label htmlFor="category">Category:</label>
                    <input onChange={onChange} value={values.category} type="text" id="category" name="category" placeholder="Enter game category..." />

                    <label htmlFor="levels">MaxLevel:</label>
                    <input onChange={onChange} value={values.maxLevel} type="number" id="maxLevel" name="maxLevel" min={1} />

                    <label htmlFor="game-img">Image:</label>
                    <input onChange={onChange} value={values.imageUrl} type="text" id="imageUrl" name="imageUrl" placeholder="Upload a photo..." />

                    <label htmlFor="summary">Summary:</label>
                    <textarea onChange={onChange} value={values.summary} name="summary" id="summary" />

                    <input className="btn submit" type="submit" defaultValue="Create Game" />
                </div>
            </form>
        </section>
    );
}