class MoviesApi {
    constructor(options) {
        this.options = options;
        this.baseUrl = this.options.baseUrl;
    }


    getMovies() {
        return fetch(`${this.baseUrl}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }).then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(new Error(`Ошибка: ${res.status}`));
        }
        )
    }
}

const moviesApi = new MoviesApi({
    baseUrl: "https://api.nomoreparties.co/beatfilm-movies",
});

export default moviesApi;
