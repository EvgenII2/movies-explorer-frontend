export class MainApi {
    constructor(options) {
        this._options = options;
        this._baseUrl = this._options.baseUrl;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(new Error(`Ошибка: ${res.status}`));
    }

    getUser() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`,
                "Content-Type": "application/json",
            },
        }).then(this._checkResponse);
    }

    editUser(name, email) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: "PATCH",
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name,
                email,
            }),
        }).then(this._checkResponse);
    }

    getMovies() {
        return fetch(`${this._baseUrl}/movies`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`,
                "Content-Type": "application/json",
            },
        }).then(this._checkResponse);
    }

    addMovie(movie) {
        return fetch(`${this._baseUrl}/movies`, {
            method: "POST",
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                country: movie.country,
                director: movie.director,
                duration: movie.duration,
                year: movie.year,
                description: movie.description,
                image: movie.image.url,
                trailer: movie.trailer,
                thumbnail: movie.image.formats.thumbnail.url,
                movieId: movie.movieId,
                nameRU: movie.nameRU,
                nameEN: movie.nameEN,
                id: movie.id,
            }),

        }).then(this._checkResponse);
    }

    removeMovie(movieId) {
        return fetch(`${this._baseUrl}/movies/6192816b9fb9229fb6219ae7`, {
            method: "DELETE",
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`,
                "Content-Type": "application/json",
            },
        }).then(this._checkResponse);
    }
}

const api = new MainApi({
    baseUrl: "https://devdiploma.nomoredomains.monster",
    headers: {
        Authorization: 'Bearer ' + localStorage.getItem("token")
    },
});

export default api;
