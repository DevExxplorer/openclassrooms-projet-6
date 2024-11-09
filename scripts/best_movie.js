import { data_api } from './api.js';

export function best_movie(){
    // Appel à l'API pour récupérer les films triés par score imdb décroissant
    data_api('titles', "?sort_by=-imdb_score").then((movies) => {
        const result = movies['results'][0];
        const idMovie = result['id']

        // Deuxième appel à l'API pour obtenir les détails du film par son ID
        data_api('titles', `/${idMovie}`).then((movie) => {
            const blocBestMovie = document.querySelector('.section__best-movie__content')

            blocBestMovie.innerHTML = `
                <img src="${movie['image_url']}" alt="${movie['title']}">
                <div class="content">
                    <div class="text">
                        <h2>${movie['title']}</h2>
                        <p>${movie['description']}</p>
                    </div>
                    <div class="btn" data-id-movie="${movie['id']}">
                        <span class="btn__orange">Détails</span>
                    </div>
                </div>
            `
        })
    })
}
