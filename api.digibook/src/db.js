const setBD = require('./setters/setDB');

async function connect() {
    const mysql = require("mysql2/promise");
    const conn = await mysql.createConnection("mysql://root:@localhost:3306");
    await setBD.initizeDB(conn);
    return conn;
}

//LIVRO - START
async function selectAll(){
    const conn = await connect();
    const sql = 'SELECT * from livros;';
    let livros = await conn.query(sql)  

    if(livros[0].length == 0){
        
        const livros_export = require('./contents/livros').livros;

        livros_export.forEach(async (livro) => {
            let livros_returned = await insertLivro(livro);
        })

        livros = livros_export;
    }

    return livros[0];
}

async function insertLivro(livro){
    const conn = await connect();
    const sql = 'INSERT INTO livros (title, author, editor, edition, year, pages, degree, img) VALUES(?, ?, ?, ?, ?, ?, ?, ?);';
    const values = [livro.title, livro.author , livro.editor, livro.edition, livro.year, livro.pages, livro.degree, livro.img]
    const liv = await conn.query(sql, values)
    return liv[0];
}

//LIVRO - END

//USER - START
async function cadastrUSer(user){
    const conn = await connect();
    let sql = 'SELECT * FROM users WHERE email = ?';
    let userResult = await conn.query(sql, [user.email])

    if(!userResult[0][0]){ //Cadastrar usuário

        sql = 'INSERT INTO users (nome, email, senha) VALUES(?, ?, ?);';
        const values = [user.nome, user.email , user.senha]
        user = await conn.query(sql, values);

        sql = 'SELECT * FROM users WHERE id = ?;';
        userResult = await conn.query(sql, [user[0].insertId]);

        return userResult[0][0];
    }

    return {};
}

async function login(user){
    const conn = await connect();
    let sql = 'SELECT * FROM users WHERE email = ? and senha = ?';
    let userResult = await conn.query(sql, [user.email, user.senha])

    if(userResult[0][0]){ //Logar usuário
        return userResult[0][0];
    }

    return {};
}

async function changeUserName(user){
    const conn = await connect();
    let sql = 'UPDATE users SET nome = ? WHERE id = ?;';
    let userResult = await conn.query(sql, [user.nome, user.id])
}

async function getUserByID(id){
    const conn = await connect();
    let sql = 'SELECT * from users WHERE id = ?;';
    let userResult = await conn.query(sql, [id]);

    return userResult[0][0];
}

async function changeUserPassWord(user){
    const conn = await connect();
    let sql = 'UPDATE users SET senha = ? WHERE id = ?;';
    let userResult = await conn.query(sql, [user.senha, user.id])
}

async function deleteUserByID(id){
    const conn = await connect();
    let sql = 'DELETE from users WHERE id = ?;';
    let userResult = await conn.query(sql, [id]);
}
//USER - END

//COMENTARIO - START

async function insertComentario(comentario){
    const conn = await connect();
    let sql = 'INSERT INTO comentarios (texto, user_id, livro_id) VALUES(?, ?, ?);';
    const values = [comentario.texto, comentario.user_id , comentario.livro_id]; 
    const coment = await conn.query(sql, values);
    
    sql = 'SELECT * FROM comentarios WHERE id = ?;';
    const comentarioNovo = await conn.query(sql, [coment[0].insertId])
    return comentarioNovo[0][0];
}

async function selectAllComentariosById(livro_id){
    const conn = await connect();

    let sql = 'SELECT * FROM comentarios WHERE livro_id = ?;'; 
    const comentarios = await conn.query(sql, [livro_id]);

    sql = 'SELECT id, nome FROM users WHERE id IN (SELECT user_id FROM comentarios WHERE livro_id = ?);';
    const users = await conn.query(sql, [livro_id]);

    const fullResult = [comentarios[0], users[0]];

    return fullResult;
}

async function putComentario(comentario){
    const conn = await connect();
    let sql = 'UPDATE comentarios SET texto = ? WHERE id = ?;'; 
    const coment = await conn.query(sql, [comentario.texto, comentario.id]);
    return coment[0];
}

async function deleteComentario(id){
    const conn = await connect();
    let sql = 'DELETE FROM comentarios WHERE id = ?;'; 
    const coment = await conn.query(sql, [id]);
}

//COMENTARIO - END

//AVALIACOES - START

async function insertAvaliacao(avaliacao){
    const conn = await connect();
    let sql = 'INSERT INTO avaliacoes (numero_estrelas, user_id, livro_id) VALUES(?, ?, ?);';
    const values = [avaliacao.numero_estrelas, avaliacao.user_id , avaliacao.livro_id]; 
    const aval = await conn.query(sql, values);

    sql = 'SELECT * FROM avaliacoes WHERE id = ?;';
    const avaliacaoNova = await conn.query(sql, [aval[0].insertId])
    return avaliacaoNova[0][0];
}

async function selectAvaliacaoById(user_id, livro_id){
    const conn = await connect();

    let sql = 'SELECT * FROM avaliacoes WHERE user_id = ? and livro_id = ?;'; 
    const avaliacaoResult = await conn.query(sql, [user_id, livro_id]);

    if(avaliacaoResult[0][0]){
        return avaliacaoResult[0][0];
    }

    return {}
}

async function putAvaliacao(avaliacao){
    const conn = await connect();
    let sql = 'UPDATE avaliacoes SET numero_estrelas = ? WHERE id = ?;'; 
    const aval = await conn.query(sql, [avaliacao.numero_estrelas, avaliacao.id]);

    
    sql = 'SELECT * FROM avaliacoes WHERE id = ?;';
    const avaliacaoNova = await conn.query(sql, [avaliacao.id])
    return avaliacaoNova[0][0];
}

async function deleteAvaliacao(id){
    const conn = await connect();
    let sql = 'DELETE FROM avaliacoes WHERE id = ?;'; 
    const aval = await conn.query(sql, [id]);
}

//COMENTARIO - END

module.exports = {
    /* Livros */ selectAll,
    /* 1 - Users */ cadastrUSer, login, changeUserName, getUserByID, changeUserPassWord, deleteUserByID,
    /* 2 - Comentarios */ insertComentario, selectAllComentariosById, putComentario, deleteComentario,
    /* 3 - Comentarios */ insertAvaliacao, selectAvaliacaoById, putAvaliacao, deleteAvaliacao
};