import * as requset from '../lib/request';

const baseUrl = 'http://localhost:3030/jsonstore/comments';

export const create = async (gameId, username, text) => {
    const newComment = await requset.post(baseUrl, { gameId, username, text });

    return newComment;
}

export const getAll = async (gameId) => {
    const query = new URLSearchParams({
        where: `gameid="${gameId}"`
    });

    //const result = await requset.get(`${baseUrl}?${query.toString()}`);

    const result = await requset.get(`${baseUrl}`);

    return Object.values(result).filter(comment => comment.gameId === gameId);
};