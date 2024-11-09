export async function data_api(types, params){
    const base_url = `http://localhost:8000/api/v1/${types}`
    const url = (params) ? `${base_url}${params}` : `${base_url}`;

    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.log(error);
    }
}

export async function list_choices() {
    let page = 1
    const data = await data_api('genres', `?sort_by=-imdb_score&page=${page}`)
    const max_page = data['count'] / 5
    const choices_data = []

    while (page <= max_page) {
        const genres = await data_api('genres', `?page=${page}`)

        genres['results'].forEach((genre) => {
            choices_data.push(genre)
        })

        page += 1
    }

    return choices_data
}

export async function get_movies_api(category){
    const list_movies = []
    let page = 1

    while (page <= 2) {
        const movies = await data_api(
            'titles',
            `?sort_by=-imdb_score&genre=${category}&page=${page}`
        )

        if (movies) {
            movies['results'].forEach((movie) => {
                if (list_movies.length < 6) {
                    list_movies.push(movie)
                }
            })
        }

        if (movies['next']) {
            page += 1
        } else {
            break;
        }
    }

    return list_movies
}
