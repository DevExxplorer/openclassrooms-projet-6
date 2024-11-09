import { get_movies_api, list_choices } from "./api.js";
import { view_movies } from "./views.js";
import { open_modal } from "./modal.js";

// Ouverture du menu lors du click sur le champs par default
export function active_default_menu(category) {
    const container_select =  document.querySelectorAll('.container-select')
    if (container_select) {
        container_select.forEach((select) => {
            const default_choice = select.querySelector('.default_choice')
            default_choice.addEventListener('click', () => {
                const list_options = select.querySelector('ul')
                list_options.classList.toggle('active')
            })
            selectChoice(select, category)
        })
    }
}

// Event lors du click sur un des choix du menu
function selectChoice(select, category) {
    const list_options = select.querySelector('ul')
    const options = list_options.querySelectorAll('li')
    const default_choice = select.querySelector('.default_choice')

    options.forEach((option) => {
        option.addEventListener('click', async (e) => {
            list_options.classList.remove('active')

            options.forEach((item) => {
                item.classList.remove('selected')
            });
            option.classList.add('selected')

            default_choice.innerHTML = option.innerHTML

            await updateMovies(option.innerHTML, category)

            open_modal()
        })
    })
}

export async function updateMovies(name, category) {
    const list = await list_choices()
    const movies = await get_movies_api(name);
    view_movies(category, movies, list)
}

export function see_more_btn(category) {
    const button = category.querySelector('.btn-more')
    button.addEventListener('click', () => {
        const text_btn = button.querySelector('span')
        button.classList.toggle('active')

        // Changer le texte du bouton
        if (button.classList.contains('active')) {
            text_btn.innerHTML = 'Voir moins'
        } else {
            text_btn.innerHTML = 'Voir plus'
        }

        // Ajout de la class qui affiche les films
        const bloc_btn = button.parentNode
        const movies = bloc_btn.querySelectorAll('.movie');

        movies.forEach((movie) => {
            if (button.classList.contains('active')) {
                movie.classList.add('is_active')
            } else {
                movie.classList.remove('is_active')
            }
        })
    })
}