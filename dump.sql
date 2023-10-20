create table usuarios (
	id serial primary key,
  	nome varchar(150) not null,
  	email text not null unique,
  	senha text not null
);

create table categorias (
  id serial primary key,
  descricao text not null
);

insert into categorias (descricao) values
    ('Informática'),
    ('Celulares'),
    ('Beleza e Perfumaria'),
    ('Mercado'),
    ('Livros e Papelaria'),
    ('Brinquedos'),
    ('Moda'),
    ('Bebê'),
    ('Games');

create table clientes (
  id serial primary key,
  nome varchar(150) not null,
  email text not null unique,
  cpf varchar(11) not null unique,
  cep varchar(8),
  rua varchar(150),
  numero integer,
  bairro varchar(50),
  cidade varchar(50),
  estado varchar(50)
 );
 
 create table produtos (
  id serial primary key,
  descricao varchar(150) not null unique,
  quantidade_estoque integer not null,
  valor integer not null,
  categoria_id integer not null references categorias(id)
);