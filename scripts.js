const uploadBtn = document.getElementById("upload-btn");
const inputUpload = document.getElementById("image-upload")

uploadBtn.addEventListener("click", () => {
    inputUpload.click();
})

function lerConteudoDoArquivo(arquivo) {
    return new Promise((resolve, reject) => {
        const leitor = new FileReader();
        leitor.onload = () => {
            resolve({ url: leitor.result, nome: arquivo.name })
        }

        leitor.onerror = () => {
            reject(`Erro na leitura do arquivo ${arquivo.name}`)
        }

        leitor.readAsDataURL(arquivo)
    })
}

const imagemPrincipal = document.querySelector(".main-imagem");
const nomeDaImagem = document.querySelector(".container-imagem-nome p");

inputUpload.addEventListener("change", async (evento) => {
    const arquivo = evento.target.files[0];

    if (arquivo) {
        try {
            const conteudoDoArquivo = await lerConteudoDoArquivo(arquivo);
            imagemPrincipal.src = conteudoDoArquivo.url;
            nomeDaImagem.textContent = conteudoDoArquivo.nome;
        } catch (erro) {
            console.error("Erro na leitura do arquivo")
        }
    }
})

const inputTags = document.getElementById('categoria');
const listaTags = document.getElementById('lista-tags');

// Remove a TAG.
listaTags.addEventListener('click', (evento) => {
    if(evento.target.classList.contains('remove-tag')) { // Checks if the clicked target has the 'remove-tag' tag.
        const tagQueQueremosRemover = evento.target.parentElement;
        listaTags.removeChild(tagQueQueremosRemover);
    }
});
// Defining available TAGs.
const tagsDisponiveis = ['Love','Romance','Sad','Happy','All','love','romance','sad','happy','all'];
// Function that checks whether the TAG that the user entered is an available TAG.
async function verificaTagsDisponiveis(tagTexto) {
    return new Promise((resolve) => { // Promessa, pois nao sabemos quanto tempo ira levar ate o banco de dados retornar se é uma TAG disponivel
        setTimeout(() => {
            resolve(tagsDisponiveis.includes(tagTexto)); // Scroll through the list looking to see if the TAG entered exists.
        }, 1000);
    });
}

// Add a TAG.
inputTags.addEventListener('keypress', async (evento) => {
    if(evento.key === 'Enter'){
        evento.preventDefault();
        const tagTexto = inputTags.value.trim();
        if(tagTexto !== '') {
            try {
                const tagExiste = await verificaTagsDisponiveis(tagTexto); // Calls the function to check the TAG and returns TRUE or FALSE.
                if(tagExiste) {
                    const tagNova = document.createElement('li');
                    tagNova.innerHTML = `<p>${tagTexto}</p> <img src="img/close.svg" class="remove-tag">`;
                    listaTags.appendChild(tagNova);
                    inputTags.value = '';
                }else {
                    alert('Tag not found. Please enter a valid tag.');
                    alert('Available tags: Love / Romance / Sad / Happy / All');
                }
            }catch(error) { // Error in the functionality request.
                console.error('Error checking the existence of the tag:', error);
                alert('Error checking the existence of the tag. Check the console for more details.');
            }
        }
    }
});

const botaoPublicar = document.querySelector('.botao-publicar');

// Function to send information to the DB / SIMULATION. // In this case, create the item in the Feed.
const poemsList = document.querySelector('.poems-list'); // <ul>
async function publicarProjeto(nomeDoProjeto, descricaoDoProjeto, autorDoProjeto, tagsProjeto) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const deuCerto = Math.random() > 0.3;
            if(deuCerto) {
                const itemDaLista = document.createElement("li"); // Cria o <li>
                const itemTitulo = document.createElement("h2"); // Cria o H2 - Title
                itemTitulo.innerText = nomeDoProjeto;
                itemDaLista.appendChild(itemTitulo);
                const itemDescricao = document.createElement("p"); // Cria o P - Description
                itemDescricao.innerText = descricaoDoProjeto;
                itemDaLista.appendChild(itemDescricao);
                const hr = document.createElement("hr"); // Cria o HR
                itemDaLista.appendChild(hr);
                
                const containerDateTag = document.createElement("div"); // Cria o <Div> (container-date-tag)
                containerDateTag.classList.add("container-date-tag");
                const itemData = document.createElement("p"); // Cria o P - Date/Time
                itemData.innerText = `${new Date().toLocaleDateString("en", { weekday: "long" })} (${new Date().toLocaleDateString()}) at ${new Date().toLocaleTimeString("en", { hour: "numeric", minute: "numeric" })}`;
                itemData.classList.add("date-tag");
                const itemAuthor = document.createElement("p"); // Cria o P - Author
                itemAuthor.innerText = autorDoProjeto;
                itemAuthor.classList.add("date-tag");
                const itemTag = document.createElement("p"); // Cria o P - Tag
                itemTag.innerText = tagsProjeto;
                itemTag.classList.add("date-tag");

                containerDateTag.appendChild(itemData);
                containerDateTag.appendChild(itemAuthor);
                containerDateTag.appendChild(itemTag);

                itemDaLista.appendChild(containerDateTag);
                poemsList.appendChild(itemDaLista);

                resolve('Poem published successfully!');
            }else {
                reject('Error publishing poem, please try again.');
            }
        }, 2000)
    });
}

// Obtaining all field information after clicking the Publish button.
botaoPublicar.addEventListener('click', async (evento) => {
    evento.preventDefault(); // Avoid the standard event, (not updating the page for example).

    const nomeDoProjeto = document.getElementById('nome').value;
    const descricaoDoProjeto = document.getElementById('descricao').value;
    const autorDoProjeto = document.getElementById('author').value;
    const tagsProjeto = Array.from(listaTags.querySelectorAll('p')).map((tag) => tag.textContent); // .map to get only the textual content, not the entire <p>agraph</p>

    try {
        const resultado = await publicarProjeto(nomeDoProjeto, descricaoDoProjeto, autorDoProjeto, tagsProjeto);
        alert('Posted successfully! Go to the feed to see the poems.');
        checkEmptyList(poemsList);
    }catch(error) {
        alert('Not published! You depend on luck, so try again =)');
    }
});


const emptyListMessage = document.getElementById("empty-list-message");

function checkEmptyList(list) {
    if (list.querySelectorAll('li').length === 0) {
        emptyListMessage.style.display = "block";
    } else {
        emptyListMessage.style.display = "none";
    }
}




// Clear all Form fields using the Discard Button
const botaoDescartar = document.querySelector('.botao-descartar');

botaoDescartar.addEventListener('click', (evento) => {
    evento.preventDefault(); // Avoid the standard event, (not updating the page for example).

    const formulario = document.querySelector('form');
    formulario.reset();

    imagemPrincipal.src = 'img/imagem1.png';
    nomeDaImagem.textContent = 'image_projeto.png'

    listaTags.innerHTML = '';
});