import { view_modal } from "./views.js";
import { data_api } from "./api.js";

// Ouverture de la modal
export function open_modal() {
    const buttons = document.querySelectorAll('.btn')
    if (buttons) {
        buttons.forEach((btn) => {
            btn.addEventListener('click', (e) => {
                const modal = document.querySelector('.modal')
                modal.style = 'display: flex';

                const id_movie = btn.dataset.idMovie
                data_api('titles', `/${id_movie}`).then((movie) => {
                    view_modal(modal, movie)
                })

                setTimeout(() => {
                    close_modal()
                }, 1000)
            })
        })
    }
}

export function close_modal() {
    const modal = document.querySelector('.modal')
    const buttonsModal = modal.querySelectorAll('.modal-close');

    buttonsModal.forEach((btn) => {
        btn.addEventListener('click', () => {
            modal.style = 'display: none';
        })
    })
}