export class MainApi {
    constructor(options) {
        this._options = options;
        this._baseUrl = this._options.baseUrl;
    }

    static _checkResponse(res) {
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
        }).then(this.checkResponse);
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
        }).then(this.checkResponse);
    }

    addMovie() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`,
                "Content-Type": "application/json",
            },
        }).then(this.checkResponse);
    }

    removeMovie(movieId) {
        return fetch(`${this._baseUrl}/cards${movieId}`, {
            method: "DELETE",
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`,
                "Content-Type": "application/json",
            },
        }).then(this.checkResponse);
    }
}

const api = new MainApi({
    baseUrl: "https://devdiploma.nomoredomains.monster",
    headers: {
        Authorization: 'Bearer ' + localStorage.getItem("token")
    },
});

export default api;
