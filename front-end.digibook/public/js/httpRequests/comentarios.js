
let formOperation = 'POST'

const comentariosForm = document.querySelector('#comentarios_form');

if(sessionStorage.getItem('user_id')){
    document.querySelector('#comentarios_container').classList.remove('hide');
}else{
    document.querySelector('#comentarios_container').classList.add('hide');
}

comentariosForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    if(formOperation == 'POST'){

        const comentarioArea = document.querySelector('#comentario');

        let comentario = {
            texto: comentarioArea.value,
            user_id: sessionStorage.getItem('user_id'),
            livro_id: livroActual.id
        }

        comentarioArea.value = '';

        comentario = JSON.stringify(comentario)
        postComentario(comentario)

    }else{

        console.log('Condição para actualizzação verdadeira!')
        const comentarioArea = document.querySelector('#comentario');

        let comentario = {
            id: sessionStorage.getItem('com_id'),
            texto: comentarioArea.value
        }

        sessionStorage.removeItem('com_id');

        comentarioArea.value = '';

        comentario = JSON.stringify(comentario)

        putComentario(comentario)

    }  
    
    formOperation = 'POST'

})


// REQUISIÇÕES HTTP

// ADICIONAR COMMENTÁRIO
async function postComentario(comentario){

    const response = await fetch(`${apiUrl}/comentarios`, {
        method: 'POST',
        body: comentario,
        headers: {
            "Content-type": "application/json"
        }
    })

    if(response.status == 200){
        const comentarioNovo = await response.json()
        comentariosFullResult.comentarios.push(comentarioNovo)

        let userFound = false
        comentariosFullResult.users.forEach(user => {
            if(user.id == sessionStorage.getItem('user_id')){
                userFound = true;
            }
        });

        if(!userFound){
            comentariosFullResult.users.push({
                id: Number(sessionStorage.getItem('user_id')),
                nome: sessionStorage.getItem('user_name')
            })
        }

        showComentarios();

    }
}


//OBTER TODOS OS COMMENTARIOS DO LIVRO
async function getAllComentarios(id){

    const response = await fetch(`${apiUrl}/comentarios/${id}`)

    if(response.status == 200){
        let data = await response.json()
        comentariosFullResult.comentarios = data[0] 
        comentariosFullResult.users = data[1];
    }
}

// APAGAR COMENTÁRIO
async function deleteComentario(id){
    
    const response = await fetch(`${apiUrl}/comentarios/${id}`, {
        method: 'DELETE'
    })

    if(response.status == 200){

        comentariosFullResult.comentarios = comentariosFullResult.comentarios.filter((commentario) => (commentario.id != id))

        showComentarios();
    }
}

// ACTUALIZAR COMENTÁRIO
async function putComentario(comentario){

    let coment = JSON.parse(comentario)
    
    const response = await fetch(`${apiUrl}/comentarios/${coment.id}`, {
        method: 'PUT',
        body: comentario,
        headers: {
            "Content-type": "application/json"
        }

    })

    if(response.status == 200){
        let index;

        comentariosFullResult.comentarios.forEach((comentario, ind) => {
            if(comentario.id == coment.id){
                index = ind;
            }
        })

        
        comentariosFullResult.comentarios[index].texto = coment.texto

        showComentarios();
    }
}