import {view_movies, views_choices, views_title} from './views.js';
import {get_movies_api, list_choices} from './api.js';
import { active_default_menu } from "./events.js";
import { best_movie } from "./best_movie.js";
import { open_modal } from "./modal.js";

best_movie()

async function fetchMovies() {
    const bloc_category = document.querySelector('.section__categories')
    if (bloc_category) {
        const categories = bloc_category.querySelectorAll('.categories')

        for (const category of categories) {
            if (category.id === 'choices') {
                const list = await list_choices()
                views_choices(category, list)
                active_default_menu(category)

                const category_selected = category.querySelector('.default_choice')
                const movies = await get_movies_api(category_selected.innerHTML);
                view_movies(category, movies)
            } else {
                views_title(category)
                const movies = await get_movies_api(category.id);
                view_movies(category, movies)
            }
        }
    }
}

fetchMovies().then(() => {
    open_modal()
}).catch((error) => {
    console.error("Erreur lors du chargement des films :", error);
});

