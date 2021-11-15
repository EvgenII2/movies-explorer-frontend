export class Auth {
    constructor(options) {
        this._baseUrl = options.baseUrl;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(new Error(`Ошибка: ${res.status}`));
    }

    register(email, password, name) {
        return fetch(`${this._baseUrl}/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                password: password,
                email: email,
                name: name,
            }),
        }).then(this._checkResponse);
    }

    authorize(email, password) {
        return fetch(`${this._baseUrl}/signin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                password: password,
                email: email,
            }),
        }).then(this._checkResponse);
    }

    tokenCheck(token) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        }).then(this._checkResponse);
    }
}

const auth = new Auth({
    baseUrl: "https://devdiploma.nomoredomains.monster",
});

export default auth;
