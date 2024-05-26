
const openForm = document.querySelector('#avaliar');
const closeForm = document.querySelector('#close_avaliacao_form');
const avaliacaoForm =  document.querySelector('#avaliacao_form');
const deleteAvaliacaoButton = document.querySelector('#remove');
const putAvaliacaoButton = document.querySelector('#edit');

let httpAvaliacao;

let FormOperetion = 'POST';
let numero_estrelas = 0;

openForm.addEventListener('click', () => {
    document.querySelector('#avaliacao_form_container').classList.remove('hide');
    FormOperetion = 'POST';
})

closeForm.addEventListener('click', () => {
    document.querySelector('#avaliacao_form_container').classList.add('hide');
})

avaliacaoForm.addEventListener('submit', async (e) => { 
    e.preventDefault();
    
    if(!httpAvaliacao.id){

        console.log('condição Válida')

        const numero_estrelas_input = document.querySelector('#numero_estrelas');
        numero_estrelas = numero_estrelas_input.value;

        let avaliacao = {
            numero_estrelas: Number(numero_estrelas),
            user_id: Number(sessionStorage.getItem('user_id')),
            livro_id: livroActual.id
        }

        avaliacao = JSON.stringify(avaliacao);
        postAvaliacao(avaliacao)

        document.querySelector('#avaliacao_form_container').classList.add('hide');
    }else{

        let avaliacao = {
            numero_estrelas: Number(document.querySelector('#numero_estrelas').value)
        }

        avaliacao = JSON.stringify(avaliacao);
        putAvaliacao(avaliacao)

        document.querySelector('#avaliacao_form_container').classList.add('hide');
    }
})

deleteAvaliacaoButton.addEventListener('click', async () => {
    deleteAvaliacao()
})

putAvaliacaoButton.addEventListener('click', async () => {
    document.querySelector('#avaliacao_form_container').classList.remove('hide');
    document.querySelector('#numero_estrelas').value = httpAvaliacao.numero_estrelas;
})

function showAvaliacao(){

    if(httpAvaliacao){
        const avalicaoContainer = document.querySelector('#avaluated');
        avalicaoContainer.classList.remove('hide');

        // <img class="estrela" width="30" src="../../../public/assets/icons/star_24dp_FILL1_wght400_GRAD0_opsz24.png" alt="">
        // <img class="estrela" width="30" src="../../../public/assets/icons/star_24dp_FILL1_wght400_GRAD0_opsz24 (1).png" alt="">

        const estrelas = document.querySelector('#estrelas');

        estrelas.innerHTML = '';
        for(let i = 1; i <= 5; i++){
            if(i <= httpAvaliacao.numero_estrelas){
                estrelas.innerHTML += `<img class="estrela" width="30" src="../../../public/assets/icons/star_24dp_FILL1_wght400_GRAD0_opsz24.png" alt="">`
            }else{
                estrelas.innerHTML += `<img class="estrela" width="30" src="../../../public/assets/icons/star_24dp_FILL1_wght400_GRAD0_opsz24 (1).png" alt="">`
            }
        }
    }else{
        const avalicaoContainer = document.querySelector('#avaluated');
        avalicaoContainer.classList.add('hide');
        openForm.classList.remove('hide')
    }
}


//REQUISIÇÕES HTTP


//ADICIONAR AVALIACAO
async function postAvaliacao(avalicao){

    const response = await fetch(`${apiUrl}/avaliacoes`, {
        method: 'POST',
        body: avalicao,
        headers: {
            "Content-type": "application/json"
        }
    })

    if(response.status == 200){
        httpAvaliacao = await response.json();
        openForm.classList.add('hide');
        showAvaliacao()
        FormOperetion = 'PUT';
    }

}


//OBTER AVALIACAO
async function getAvaliacao(){

    const response = await fetch(`${apiUrl}/avaliacoes/${sessionStorage.getItem('user_id')}/${livroActual.id}`)

    if(response.status == 200){

        httpAvaliacao = await response.json();

        if(httpAvaliacao.id){
            openForm.classList.add('hide');
            formOperation = 'PUT'
            showAvaliacao()
        }
    }

}

//APAGAR AVALIACAO
async function deleteAvaliacao(){

    const response = await fetch(`${apiUrl}/avaliacoes/${httpAvaliacao.id}`, {
        method: 'DELETE'
    })

    if(response.status == 200){
        httpAvaliacao = null;
        showAvaliacao();
    }

}

//ACTUALIZAR AVALIACAO
async function putAvaliacao(avaliacao){

    const response = await fetch(`${apiUrl}/avaliacoes/${httpAvaliacao.id}`, {
        method: 'PUT',
        body: avaliacao,
        headers: {
            "Content-type": "application/json"
        }
    })

    if(response.status == 200){
        console.log('Estado da Actualização: 200!')
        httpAvaliacao = await response.json();
        console.log(httpAvaliacao);
        showAvaliacao()
    }

}





