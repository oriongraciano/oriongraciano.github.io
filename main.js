//Funçao de Rolar Para Topo
function rolarParaTopo() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

//Função de Linkar Projetos GitHub    
function getProjects() {
    const urlGitHub = 'https://api.github.com/users/oriongraciano/repos'
    var loadingElement = document.getElementById('loading')

    fetch(urlGitHub, {
        method: 'GET'
    })

        .then((response) => response.json())
        .then((response) => {
            loadingElement.style.display = 'none'
            showProjects(response)
        })
        .catch((e) => {
            console.log(e)
        })
}

function showProjects(data) {
    var listElement = document.getElementById('my-projects-list')

    for (let i = 0; i < data.length; i++) {
        let a = document.createElement("a")
        a.href = data[i]['clone_url']
        a.target = '_blank'
        a.title = data[i]['description']
        let linkText = document.createTextNode(data[i]['name'])
        a.appendChild(linkText)
        listElement.appendChild(a)
    }

}

getProjects()