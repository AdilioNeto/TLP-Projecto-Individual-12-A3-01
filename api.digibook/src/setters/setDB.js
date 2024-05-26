async function initizeDB(conn){

    //Cria a base de dados Caso não Exista
    await conn.query("CREATE DATABASE IF NOT EXISTS digibook;");

    //Liga-se a Base de Dados
    await conn.query("USE digibook;");

    //Cria a Tabela Livros Caso não Exista
    await conn.query(`CREATE TABLE IF NOT EXISTS livros(
        id int auto_increment primary key,
        title varchar(30) not null,
        author varchar(30) not null,
        editor varchar(70) not null,
        edition int not null,
        year int not null,
        pages int not null,
        degree int not null,
        img varchar(255) not null
    );`);

    //Cria a Tabela Users Caso não Exista 
    await conn.query(`CREATE TABLE IF NOT EXISTS users(
        id int auto_increment primary key,
        nome varchar(255) not null,
        email varchar(255) not null,
        senha varchar(255) not null
    );`);

    //Cria a Tabela Comentários Caso não Exista 
    await conn.query(`CREATE TABLE IF NOT EXISTS comentarios(
        id int auto_increment primary key,
        texto varchar(255) not null,
        user_id int,
        livro_id int,
        foreign key(user_id) references users(id),
        foreign key(livro_id) references livros(id)
    );`);

    //Cria a Tabela Avaliacoes Caso não Exista 
    await conn.query(`CREATE TABLE IF NOT EXISTS avaliacoes(
        id int auto_increment primary key,
        numero_estrelas varchar(255) not null,
        user_id int,
        livro_id int,
        foreign key(user_id) references users(id),
        foreign key(livro_id) references livros(id)
    );`);
}

module.exports  = {initizeDB};