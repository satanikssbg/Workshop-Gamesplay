const buildOptions = (data) => {
    const options = {};

    if (data) {
        options.body = JSON.stringify(data);
        options.headers = {
            'Content-Type': 'application/json'
        };
    }

    const token = localStorage.getItem('accessToken');

    if (token) {
        options.headers = {
            ...options.headers,
            'X-Authorization': token,
        };
    }

    return options;
};

const request = async (method, url, data) => {
    try {
        const response = await fetch(url, {
            ...buildOptions(data),
            method,
        });

        if (response.status === 204) {
            return {};
        }

        if (!response.ok && response.status === 403 && localStorage.getItem("accessToken")) {
            const result = await response.json();

            if ((result.message === "Invalid access token" || result.message === "User session does not exist") && result.code === 403) {
                localStorage.removeItem('accessToken');

                if (localStorage.getItem('auth')) {
                    localStorage.removeItem('auth');
                }
            }
        }

        if (!response.ok) {
            throw new Error(`HTTP status: ${response.status}`);
        }

        const result = await response.json();

        return result;
    } catch (error) {
        throw new Error(`${error}`);
    }
};

export const get = request.bind(null, 'GET');
export const post = request.bind(null, 'POST');
export const put = request.bind(null, 'PUT');
export const remove = request.bind(null, 'DELETE');
export const patch = request.bind(null, 'PATCH');