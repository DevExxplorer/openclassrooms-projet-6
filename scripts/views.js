import {see_more_btn} from "./events.js";

export function views_choices(category, list) {
    category.innerHTML = `
        <div class="categories__title choices">
            <h2>Autres: </h2>
            <div class="container-select">
                <div class="default_choice">${list[0].name}</div>
                <ul class="list_choices"></ul>
            </div>
        </div>
    `

    const list_choices = document.querySelector('.list_choices')

    list.forEach((choice, index) => {
        const selected_class = (index === 0) ? 'selected' : '';
        list_choices.innerHTML += `<li class="${selected_class}">${choice.name}</li>`
    })
}

export function views_title(category) {
    category.innerHTML = `
        <div class="categories__title">
            <h2>${category.id}</h2>
        </div>
    `
}

/**
 * Affichage des données HTML des categories
 * @param category
 * @param movies
 */
export function view_movies(category, movies) {
    const categoriesTitle = category.querySelector('.categories__title');
    // Suppression de l'ancien champs container pour nettoyer l'affichage
    const container_movies = category.querySelector('.container_movies');
    if (container_movies) {
        container_movies.remove();
    }

    // Suppression de l'ancien champs bouton pour nettoyer l'affichage
    const btn_more = category.querySelector('.btn-more');
    if (btn_more) {
        btn_more.remove();
    }

    const newContent = `
        <div class="container_movies"></div>
        <div class="btn-more">
            <span class="btn__orange">Voir plus</span>
        </div>
    `;
    categoriesTitle.insertAdjacentHTML('afterend', newContent);

    // Ajout des données dans le container
    const new_categoriesTitle = category.querySelector('.container_movies');
    movies.forEach((movie) => {
         new_categoriesTitle.innerHTML += `
             <div
                 class="movie"
                 style="background-image: url(${movie.image_url});"
             >
                 <div class="banner">
                     <div class="banner__content">
                         <h3>${movie.title}</h3>
                         <div class="btn btn__darkgrey" data-id-movie="${movie.id}">
                             <span>Détails</span>
                         </div>
                     </div>
                 </div>
             </div>
         `
    })

    see_more_btn(category)
}

/**
 * Affichage des données HTML de la modal
 * @param modal
 * @param data
 */
export function view_modal(modal, data) {
    const modal_content = modal.querySelector('.modal__content')
    modal_content.innerHTML = `
        <div class="section-top">
            <div class="section-top__infos">
                <div class="section-top__infos__title">
                    <h2>${data['title']}</h2>
                    <span>${data['year']} - ${transform_array_to_string(data['genres'])}</span>
                    <span>PG-13 - ${data['duration']} minutes (${transform_array_to_string(data['countries'])})</span>
                    <span class="imdb">IMDB score: ${data['imdb_score']}/10</span>
                    <div class="directors">
                        <span>Réalisé par:</span>
                        <span>${transform_array_to_string(data['directors'])}</span>
                    </div>
                </div>
                <div class="modal-close">❌</div>
                <div class="section-top__infos__image">
                    <img src="${data['image_url']}" alt="${data['title']}">
                </div>
            </div>
            <div class="section-top__description">
                <p>${data['long_description']}</p>
                <div class="section-top__description__image">
                    <img src="${data['image_url']}" alt="${data['title']}">
                </div>
                <div class="actors">
                    <span>Avec:</span>
                    <span>${transform_array_to_string(data['actors'])}</span>
                </div>
            </div>
        </div>
        <div class="section-bottom">
           <div class="btn modal-close">
                <span>Fermer</span>
           </div>
        </div>
    `
}

/**
 * Transorm un tableau en string pour l'affichage sur modal
 * @param data
 * @returns {string}
 */
function transform_array_to_string(data) {
    let value = '';

    if (data) {
        data.forEach((item, index) => {
             if (index > 0) {
                value += ', '
            }
            value += item
        })
    }

    return value
}
