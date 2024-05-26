const livros = [
    {
        "id": 1,
        "title": "Empreendedorismo 10ª Classe",
        "author": "Técnicos do INIDE",
        "editor": "Editora das Letras",
        "edition": 1,
        "year": 2012,
        "pages": 87,
        "degree": 10,
        "img": "../../../public/assets/books/1.jpg"
    },
    {
        "id": 2,
        "title": "Informática 10ª Classe",
        "author": "Técnicos do INIDE",
        "editor": "Porto Editora",
        "edition": 1,
        "year": 2012,
        "pages": 96,
        "degree": 10,
        "img": "../../../public/assets/books/2.jpg"
    },
    {
        "id": 3,
        "title": "Empreendedorismo 12ª Classe",
        "author": "Técnicos do INIDE",
        "editor": "Editora das Letras",
        "edition": 1,
        "year": 2012,
        "pages": 92,
        "degree": 12,
        "img": "../../../public/assets/books/3.jpg"
    },
    {
        "id": 4,
        "title": "Empreendedorismo 11ª Classe",
        "author": "Técnicos do INIDE",
        "editor": "Editora das Letras",
        "edition": 1,
        "year": 2012,
        "pages": 88,
        "degree": 11,
        "img": "../../../public/assets/books/4.jpg"
    },
    {
        "id": 5,
        "title": "Física 10ª Classe",
        "author": "Maria Elisa Arieiro, Paula Lei",
        "editor": "Porto Editora",
        "edition": 1,
        "year": 2010,
        "pages": 88,
        "degree": 10,
        "img": "../../../public/assets/books/5.jpg"
    },
    {
        "id": 6,
        "title": "Matemática 12ª Classe",
        "author": "Maria Augusta Ferreira Neves",
        "editor": "Porto Editora",
        "edition": 1,
        "year": 2010,
        "pages": 89,
        "degree": 12,
        "img": "../../../public/assets/books/6.jpg"
    },
    {
        "id": 7,
        "title": "Língua Portuguesa 11ª Classe",
        "author": "Olga Magalhães, Fernanda Costa",
        "editor": "Porto Editora",
        "edition": 1,
        "year": 2010,
        "pages": 89,
        "degree": 11,
        "img": "../../../public/assets/books/7.jpg"
    },
    {
        "id": 8,
        "title": "Língua Portuguesa 12ª Classe",
        "author": "Olga Magalhães, Fernanda Costa",
        "editor": "Porto Editora",
        "edition": 1,
        "year": 2010,
        "pages": 89,
        "degree": 12,
        "img": "../../../public/assets/books/8.jpg"
    },
    {
        "id": 9,
        "title": "Química 12ª Classe",
        "author": "Carlos Corrêa, Adriana Nunes, ",
        "editor": "Porto Editora",
        "edition": 1,
        "year": 2010,
        "pages": 89,
        "degree": 12,
        "img": "../../../public/assets/books/9.jpg"
    },
    {
        "id": 10,
        "title": "Geologia 12ª Classe",
        "author": "Mercês Roque, M. Ângela Ferrei",
        "editor": "Porto Editora",
        "edition": 1,
        "year": 2010,
        "pages": 89,
        "degree": 12,
        "img": "../../../public/assets/books/10.jpg"
    },
    {
        "id": 11,
        "title": "Geologia 11ª Classe",
        "author": "António Varela",
        "editor": "Plural Editores",
        "edition": 1,
        "year": 2010,
        "pages": 89,
        "degree": 11,
        "img": "../../../public/assets/books/11.jpg"
    },
    {
        "id": 12,
        "title": "Física 12ª Classe",
        "author": "Noémia Maciel",
        "editor": "Porto Editora",
        "edition": 1,
        "year": 2010,
        "pages": 89,
        "degree": 12,
        "img": "../../../public/assets/books/12.jpg"
    },
    {
        "id": 13,
        "title": "Geografia 12ª Classe",
        "author": "Cláudio Costa",
        "editor": "Plural Editores",
        "edition": 1,
        "year": 2010,
        "pages": 89,
        "degree": 12,
        "img": "../../../public/assets/books/13.jpeg"
    },
    {
        "id": 14,
        "title": "Introdução à Economia 10ª Clas",
        "author": "Cristovão Segueira",
        "editor": "Plural Editores",
        "edition": 1,
        "year": 2010,
        "pages": 89,
        "degree": 10,
        "img": "../../../public/assets/books/14.jpeg"
    },
    {
        "id": 15,
        "title": "Matemática 11ª Classe",
        "author": "Olga Magalhães, Fernanda Costa",
        "editor": "Porto Editora",
        "edition": 1,
        "year": 2010,
        "pages": 89,
        "degree": 11,
        "img": "../../../public/assets/books/15.jpeg"
    },
    {
        "id": 16,
        "title": "Introdução ao Direito 11ª Clas",
        "author": "Emanuel Correia",
        "editor": "Plural Editores",
        "edition": 1,
        "year": 2010,
        "pages": 89,
        "degree": 11,
        "img": "../../../public/assets/books/16.jpeg"
    },
    {
        "id": 17,
        "title": "História 11ª Classe",
        "author": "Manuel Figueira",
        "editor": "Plural Editores",
        "edition": 1,
        "year": 2010,
        "pages": 89,
        "degree": 11,
        "img": "../../../public/assets/books/17.jpeg"
    },
    {
        "id": 18,
        "title": "Biologia 10ª Classe",
        "author": "Madalena Ferrão, Paola Neto",
        "editor": "Plural Editores",
        "edition": 1,
        "year": 2010,
        "pages": 89,
        "degree": 10,
        "img": "../../../public/assets/books/18.jpeg"
    },
    {
        "id": 19,
        "title": "Inglês 2 10ª Classe",
        "author": "Danilo",
        "editor": "Porto Editora",
        "edition": 1,
        "year": 2010,
        "pages": 89,
        "degree": 12,
        "img": "../../../public/assets/books/19.jpeg"
    },
    {
        "id": 20,
        "title": "História 10ª Classe",
        "author": "Danilo Jamba",
        "editor": "Plural Editores",
        "edition": 1,
        "year": 2010,
        "pages": 89,
        "degree": 12,
        "img": "../../../public/assets/books/20.jpeg"
    }
]

module.exports = {livros};