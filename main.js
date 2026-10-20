// Funçao de Rolar Para Topo
function rolarParaTopo() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Modal de contato
const openModalButtons = document.querySelectorAll("#open-modal, #open-modal-hero");
const closeModalButton = document.querySelector("#close-modal");
const modal = document.querySelector("#modal");
const modalOverlay = document.querySelector("#modal-overlay");

function abrirModal() {
    modal.style.display = "block";
    modalOverlay.style.display = "block";
    document.body.style.overflow = "hidden";
    const firstInput = modal.querySelector("input");
    if (firstInput) firstInput.focus();
}

function fecharModal() {
    modal.style.display = "none";
    modalOverlay.style.display = "none";
    document.body.style.overflow = "";
}

openModalButtons.forEach(function (button) {
    button.addEventListener("click", abrirModal);
});
closeModalButton.addEventListener("click", fecharModal);
modalOverlay.addEventListener("click", fecharModal);

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && modal.style.display === "block") {
        fecharModal();
    }
});

// Menu mobile
const navToggle = document.querySelector("#nav-toggle");
const mainNav = document.querySelector("#main-nav");

navToggle.addEventListener("click", function () {
    const isOpen = mainNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
});

mainNav.querySelectorAll(".nav-links").forEach(function (link) {
    link.addEventListener("click", function () {
        mainNav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
    });
});

// Projetos do GitHub
function getProjects() {
    const urlGitHub = 'https://api.github.com/users/oriongraciano/repos?sort=updated&per_page=12';
    const loadingElement = document.getElementById('loading');

    fetch(urlGitHub, { method: 'GET' })
        .then(function (response) { return response.json(); })
        .then(function (data) {
            loadingElement.style.display = 'none';
            showProjects(data);
        })
        .catch(function () {
            loadingElement.textContent = 'Não foi possível carregar os projetos agora. Tente novamente mais tarde.';
        });
}

function showProjects(data) {
    const listElement = document.getElementById('my-projects-list');

    if (!Array.isArray(data) || data.length === 0) {
        const emptyMessage = document.createElement('p');
        emptyMessage.className = 'projects-empty';
        emptyMessage.textContent = 'Nenhum repositório público encontrado.';
        listElement.appendChild(emptyMessage);
        return;
    }

    data.forEach(function (repo) {
        const card = document.createElement('article');
        card.className = 'project-card';

        const title = document.createElement('h3');
        title.textContent = repo.name;

        const description = document.createElement('p');
        description.textContent = repo.description || 'Sem descrição disponível.';

        const link = document.createElement('a');
        link.href = repo.html_url;
        link.target = '_blank';
        link.rel = 'noopener';
        link.textContent = 'Ver repositório';

        card.appendChild(title);
        card.appendChild(description);
        card.appendChild(link);
        listElement.appendChild(card);
    });
}

getProjects();
