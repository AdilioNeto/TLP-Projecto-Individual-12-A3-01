const alert = document.querySelector('.form_alert');

const cadastroForm = document.querySelector('#cadastrar');
const loginForm = document.querySelector('#login_form');

const submitButton =  document.querySelector('#submit');
const confirmCadastro = document.querySelector('#confirm_cadastro'); 

const changeNameForm = document.querySelector('#change_name_form'); 

const changePassWordForm = document.querySelector('#change_passowrd_form'); 

const deleteUserButton =  document.querySelector('#delete_user');

if(cadastroForm)
cadastroForm.addEventListener('submit', (e) => {
    e.preventDefault()
    alert.classList.add('hide');
    
    const nome = document.querySelector('#nome');
    const email = document.querySelector('#email');
    const senha = document.querySelector('#sh');
    const sh = document.querySelector('#shc');

    if(senha.value === sh.value){
        let user = {
            nome: nome.value,
            email: email.value,
            senha: senha.value
        }

        nome.value = '';
        email.value = '';
        senha.value = '';
        sh.value = '';

        user = JSON.stringify(user);
        cadastrUser(user);

    }else{
        alert.innerHTML = `<p>Senhas incompatíveis!</p>`;
        alert.classList.remove('hide');
    }

})

if(confirmCadastro)
confirmCadastro.addEventListener('click', () => {
    window.location.href = '../../index.html';
})

if(loginForm)
loginForm.addEventListener('submit', (e) => {
    e.preventDefault()

    alert.classList.add('hide');
    
    const email = document.querySelector('#email');
    const senha = document.querySelector('#sh');

    let user = {
        email: email.value,
        senha: senha.value
    }

    email.value = '';
    senha.value = '';

    user = JSON.stringify(user);
    LogUser(user);

})

if(changeNameForm)
changeNameForm.addEventListener('submit', (e) => {
    e.preventDefault();
        
    const nome = document.querySelector('#change_name_form #nome');
    
    let user = {
        nome: nome.value
    }
    
    user = JSON.stringify(user);
    changeName(user);
    
})

if(changePassWordForm)
    changePassWordForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const alert_pass = document.querySelector('#change_passowrd .form_alert');
        alert_pass.classList.add('hide');
            
        const senhaActual = document.querySelector('#change_passowrd_form #senha_actual');
        const senhaNova = document.querySelector('#change_passowrd_form #senha_nova');
        const confirmaSenhaNova = document.querySelector('#change_passowrd_form #confirma_senha_nova');

        const user = await getUser();

        if(senhaActual.value != user.senha){
            alert_pass.classList.remove('hide');
            alert_pass.innerHTML = `<p>Senha Actual Incorrecta!</p>`;
        }else if(senhaNova.value != confirmaSenhaNova.value){
            alert_pass.classList.remove('hide');
            alert_pass.innerHTML = `<p>Senha Nova e Senha de confirmação não combinam!</p>`;
        }else{

            let user = {
                senha: senhaNova.value
            }
            
            user = JSON.stringify(user);
            changeSenha(user);
        }
        
    });


if(deleteUserButton)
deleteUserButton.addEventListener('click', () => {
     deleteUser()
})


//                 REQUISIÇÕES HTTP

//CADASTRAR USUÁRIO
async function cadastrUser(user){

    let data;

    const response = await fetch(`${apiUrl}/users/cadstro`, 
        {
            method: 'POST',
            body: user,
            headers: {
                "Content-type": "application/json"
            }
        }
    ) 

    data = await response.json();

    console.log(data);
    if(data.id == null){
        console.log('Condição Válida!')
        alert.innerHTML = `<p>Este usuário já existe!</p>`;
        alert.classList.remove('hide');
    }else{
        persistUser(data);
        window.location.href = './confirm-cadastro/index.html';
    }

}

function persistUser(user){
    sessionStorage.setItem('user_email', user.email);
    sessionStorage.setItem('user_name', user.nome);
    sessionStorage.setItem('user_id', user.id);
}

function signOutUser(){
    sessionStorage.removeItem('user_email');
    sessionStorage.removeItem('user_name');
    sessionStorage.removeItem('user_id');

    window.location.reload(); 
}

//lOGAR USUÁRIO
async function LogUser(user){

    let data;

    const response = await fetch(`${apiUrl}/users/login`, 
        {
            method: 'POST',
            body: user,
            headers: {
                "Content-type": "application/json"
            }
        }
    ) 

    data = await response.json();

    console.log(data);
    if(data.id == null){
        alert.innerHTML = `<p>Combinação de Email e Senha Inexistente!</p>`;
        alert.classList.remove('hide');
    }else{
        persistUser(data);
        window.location.href = '../index.html';
    }
}

//TROCAR NOME DO USUÁRIO
async function changeName(user){
    const userId = sessionStorage.getItem('user_id');
    let response = await fetch(`${apiUrl}/users/putname/${userId}`, 
        {
            method: 'PUT',
            body: user,
            headers: {
                "Content-type": "application/json"
            }
        }
    )

    if(response.status == 200){
        sessionStorage.setItem('user_name', JSON.parse(user).nome)
        window.location.reload()
    }
}

//OBTER USER BY ID
async function getUser(){
    const userId = sessionStorage.getItem('user_id');
    let response = await fetch(`${apiUrl}/users/${userId}`);

    let data = await response.json()

    return data;
}

//TROCAR SENHA DO USUÁRIO
async function changeSenha(user){
    const userId = sessionStorage.getItem('user_id');
    let response = await fetch(`${apiUrl}/users/putpassword/${userId}`, 
        {
            method: 'PUT',
            body: user,
            headers: {
                "Content-type": "application/json"
            }
        }
    )

    if(response.status == 200){
        window.location.reload()
    }
}

//ELIMINA O USUÁRIO
async function deleteUser(){
    const userId = sessionStorage.getItem('user_id');
    let response = await fetch(`${apiUrl}/users/delete/${userId}`, 
        {
            method: 'DELETE'
        }
    )

    if(response.status == 200){
        signOutUser()
        window.location.reload()
    }
}