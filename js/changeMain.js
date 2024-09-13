const listaLinks = document.getElementById('lista-links');
const mainNew = document.querySelector('.main-new');
const mainFeed = document.querySelector('.main-feed');
const mainAbout = document.querySelector('.main-about');

mainFeed.classList.add('show-main');

listaLinks.addEventListener('click', (evento) => {
    if(evento.target.classList.contains('list-option')) { // Verifica se o alvo clicado possui a tag 'list-option'.
        // Removendo a classe show-main de todos os Mains
        mainNew.classList.remove('show-main');
        mainFeed.classList.remove('show-main');
        mainAbout.classList.remove('show-main');
        // Obtendo o id do alvo (New/Feed/About)
        const targetId = evento.target.id;
        // Criando o conteudo main+Id (mainNew/mainFeed/mainAbout)
        const targetMain = `main${targetId}`;
        // Verifica o conteudo criado com o Main da mesma classe e adiciona a class 'show-main'
        switch(targetMain) {
            case 'mainNew':
                mainNew.classList.add('show-main');
            break;
            case 'mainFeed':
                mainFeed.classList.add('show-main');
            break;
            case 'mainAbout':
                mainAbout.classList.add('show-main');
            break;
            default:
              // code block
        }
    }
});