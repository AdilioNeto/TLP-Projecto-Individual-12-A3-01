let livros;
let livroActual;

let comentariosFullResult = {
    comentarios: [],
    users: []
};

const apiUrl = 'http://localhost:4000';

verifySession()
getLivros();

const searchInput = document.querySelector('#search');
const serchResults = document.querySelector('.search_results');

if(searchInput)
searchInput.addEventListener('keyup', (event) => {
    search();
})

if(searchInput)
searchInput.addEventListener('focus', () => {
    search();
})

function openDetails(livro, main){

    if(main){
        window.location.href = `detalhes/index.html?livro=${livro}`;
    }else{
        window.location.href = `../detalhes/index.html?livro=${livro}`;
    }
    
}

async function verifyDetails(){
    if(window.location.search != null & window.location.search != ''){
        const title = document.querySelector('title');
        
        let nomeLivro = decodeURIComponent(
                        window
                            .location
                            .search
                            .replace('?livro=', '')
                    )

        do{
            nomeLivro = nomeLivro.replace('-', ' ')
        }while(nomeLivro.includes('-'))

        
        

        title.textContent = `${nomeLivro} - DigiBook`;

        const pageTitle = document.querySelector('#title');
        pageTitle.textContent = nomeLivro;

        let livro = getLivro(nomeLivro);
        livroActual = livro;
        BindData(livro);
        
        if(sessionStorage.getItem('user_id')){

            await getAvaliacao()

            await getAllComentarios(livroActual.id);
            
            showComentarios();
        }

    }
}

function showComentarios(){
    const comentarioContainer = document.querySelector('#all_comentarios .content');

            if(comentariosFullResult.comentarios.length != 0 && comentariosFullResult.users.length != 0){

                comentarioContainer.innerHTML = '';

                comentariosFullResult.comentarios.forEach(async (comentario) => {

                    let texto = comentario.texto;
                    let nome;
                    let inicial; 

                    let operations = '';

                    if(comentario.user_id == sessionStorage.getItem('user_id')){
                        operations = `
                            <button onclick="actualizarComentario('${comentario.id}', '${texto}')">
                                <img width="20" src="../../../public/assets/icons/edit_24dp_FILL0_wght400_GRAD0_opsz24.png" alt="">
                            </button>
                            <button onclick="deleteComentario('${comentario.id}')">
                                <img width="20" src="../../../public/assets/icons/delete_24dp_FILL0_wght400_GRAD0_opsz24 (1).png" alt="">
                            </button>`;
                    }
                    
                    comentariosFullResult.users.forEach(user => {
                        if(comentario.user_id == user.id){
                            nome = user.nome;
                            inicial = nome.charAt(0);
                        }
                    })
                    

                    comentarioContainer.innerHTML +=
                    `<div class="comentario">
                            <div class="user_details">
                            <div class="user_icon">
                                <p>${inicial}</p>
                            </div>
                            <div class="user_name">
                                <p>${nome}</p>
                            </div>
                        </div>
                        <div class="texto">
                            <p>${texto}</p>
                        </div>
                        <div class="operations">
                            ${operations}
                        </div>
                    </div>`;

                })

            }else{
                comentarioContainer.innerHTML = `<p>Ainda sem comentários</p>`;
            }
}

function actualizarComentario(id, texto){
    formOperation = 'PUT';
    const comentarioArea = document.querySelector('#comentario');
    comentarioArea.value = texto;
    sessionStorage.setItem('com_id', id);
}

function getLivro(title){
    return livros.find((livro) => {
        return livro.title === title
    });
}

function BindData(livro){

    const imgs = document.querySelectorAll('.lib_img');
    imgs.forEach((img) => {
        img.setAttribute('src', livro.img);
    })

    const contents = document.querySelectorAll('.content');

    contents[0].textContent = `${livro.title.replace('Classe', '').replace('10ª', '').replace('11ª', '').replace('12ª', '')}`;
    contents[1].textContent = `${livro.author}`;
    contents[2].textContent = `${livro.editor}`;
    contents[3].textContent = `${livro.edition}ª`;
    contents[4].textContent = `${livro.year}`;
    contents[5].textContent = `${livro.pages}`;
    contents[6].textContent = `${livro.degree}ª`;
}


function search(){
    let livrosEncontrados = []

    serchResults.innerHTML='Nada foi encontrado!';

    if(searchInput.value != '' && searchInput.value != null){

        livrosEncontrados = searchLivros(searchInput.value);

        if(livrosEncontrados.length){
            serchResults.innerHTML = '';

            livrosEncontrados.forEach((livro) => {
                serchResults.innerHTML += `<div class="result_item">
                                            <div class="img_container">
                                                <img width="50" height="60" src="${replaceFixImg(livro.img)}" alt="">
                                            </div>
                                            <div class="linl_container">
                                                <button onclick="openDetails('${replaceTitleSpace(livro.title)}', true)">${livro.title}</button>
                                            </div>
                                        </div>`;
            })

        }else{
            serchResults.innerHTML='Nada foi encontrado!';
        }
    }
}

function searchLivros(text){
    
    let result = [];
    
    livros.forEach((livro)  => {
        if(livro.title.toLowerCase().includes(text.toLowerCase())){
            result.push(livro);
        }
    });

    
    return result;
}

function replaceTitleSpace(t){

    let title = t;

    while(title.includes(' ')){
        title = title.replace(' ', '-')
    }
    return title
}

function replaceFixImg(i){

    let img = i.replace('../', '');
    return img
}

function signOutUser(){
    sessionStorage.removeItem('user_email');
    sessionStorage.removeItem('user_name');
    sessionStorage.removeItem('user_id');

    window.location.reload(); 
}

function verifySession(){
    const before = document.querySelector('#session_area #before');
    const after = document.querySelector('#session_area #after');

    if(!sessionStorage.getItem('user_id') && after){
        after.classList.add('hide');
    }else if(after && after){
        before.classList.add('hide');
        let userInitial = sessionStorage.getItem('user_name').charAt(0).toUpperCase();
        after.innerHTML=`<p>${userInitial}</p>`;

        const userMenu = document.querySelector("#user_menu #menu_container");
        const userMenuName = document.querySelector("#user_menu #menu_container h2");
        userMenuName.textContent =`Olá, ${sessionStorage.getItem('user_name').split(' ')[0]}!`;

        after.addEventListener('click', () => {
            userMenu.classList.toggle('hide_user_menu');
        })
        
        const perfil = document.querySelector("#perfil");
        const perfilMenu = document.querySelector(".perfil_menu");
        const definicoesConta = document.querySelector("#def_Conta");
        const definicoesContaMenu = document.querySelector(".def_menu");
        const singOut = document.querySelector("#sign_out");

        const openChangeName = document.querySelector("#change_name_li");
        const closeChangeName = document.querySelector("#change_name #close_change_name");
        
        openChangeName.addEventListener('click', () => {
            document.querySelector("#change_name").classList.toggle('hide');
            document.querySelector("#change_name #nome").value = sessionStorage.getItem('user_name');
        });

        closeChangeName.addEventListener('click', () => {
            document.querySelector("#change_name").classList.toggle('hide');
        });

        perfil.addEventListener('click', () => {
            perfilMenu.classList.toggle('user_submenu_hidden');
        });

        definicoesConta.addEventListener('click', () => {
            definicoesContaMenu.classList.toggle('user_submenu_hidden');
        });

        const openChangePassWord = document.querySelector("#change_password_li");
        const closeChangePassWord = document.querySelector("#change_passowrd #close_change_password");
        
        openChangePassWord.addEventListener('click', () => {
            document.querySelector("#change_passowrd").classList.toggle('hide');
        });

        closeChangePassWord.addEventListener('click', () => {
            document.querySelector("#change_passowrd").classList.toggle('hide');
        });

        /*
        const changePassW = document.querySelector("#perfil");
        const delConta = document.querySelector("#sign_out");*/

        singOut.addEventListener('click', () => {
            signOutUser();
        });
    }
}

function hrefAtributes(){
    return window.location.search;
}

//REQUISIÇÕES HTTP

//Livros
async function getLivros(){

    const response = await fetch(`${apiUrl}/livros`);

    livros = await response.json()

    verifyDetails();

}