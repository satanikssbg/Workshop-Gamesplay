import * as requset from '../lib/request';

const baseUrl = 'http://localhost:3030/data/comments';

export const create = async (gameId, text) => {
    const newComment = await requset.post(baseUrl, { gameId, text });

    return newComment;
}

export const getAll = async (gameId) => {
    const query = new URLSearchParams({
        where: `gameId="${gameId}"`,
        load: `owner=_ownerId:users`
    });

    const result = await requset.get(`${baseUrl}?${query}`);

    return result;
};