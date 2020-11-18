#CRIAÇÃO DO BANCO DE DADOS
DROP DATABASE IF EXISTS MedWork;

CREATE DATABASE IF NOT EXISTS MedWork;

USE MedWork;

#######################################################################################
#CRIAÇÃO DAS TABELAS

#TABELA PACIENTE
CREATE TABLE IF NOT EXISTS tbl_Paciente(
    id_Paciente VARCHAR(60) NOT NULL PRIMARY KEY,
    dt_Nascimento DATE NOT NULL,
    nome VARCHAR(50) NOT NULL,
    telefone VARCHAR(20) NOT NULL,
    tp_sanguineo VARCHAR(5),
    alergia TEXT,
    rg VARCHAR(20) NOT NULL UNIQUE,
    email VARCHAR(90) NOT NULL UNIQUE,
    cpf VARCHAR(20) NOT NULL UNIQUE,
    endereco VARCHAR(150),
    celular VARCHAR(20) NOT NULL,
    ativo BOOLEAN NOT NULL DEFAULT TRUE,
    senha VARCHAR(60) NOT NULL,
    alt_senha BOOLEAN DEFAULT TRUE,
    foto VARCHAR(100) NOT NULL DEFAULT('default.png'),
    fk_id_Recepcionista VARCHAR(60) NOT NULL
);

#TABELA HOSPITAL
CREATE TABLE IF NOT EXISTS tbl_Hospital(
    id_Hospital VARCHAR(60) NOT NULL PRIMARY KEY,
    cnpj VARCHAR(20) NOT NULL UNIQUE,
    nome VARCHAR(50) NOT NULL,
    endereco VARCHAR(150) NOT NULL,
    telefone VARCHAR(20) NOT NULL,
    ativo BOOLEAN NOT NULL DEFAULT TRUE,
    foto VARCHAR(100) NOT NULL DEFAULT('default.png'),
    email VARCHAR(90) NOT NULL UNIQUE,
    senha VARCHAR(60) NOT NULL,
    fk_id_MedWork VARCHAR(60) NOT NULL
);

#TABELA MEDICO
CREATE TABLE IF NOT EXISTS tbl_Medico(
    id_Medico VARCHAR(60) NOT NULL PRIMARY KEY,
    crm VARCHAR(10) NOT NULL UNIQUE,
    email VARCHAR(90) NOT NULL UNIQUE,
    nome VARCHAR(50) NOT NULL,
    especialidade VARCHAR(50) NOT NULL,
    telefone VARCHAR(20) NOT NULL,
    celular VARCHAR(20) NOT NULL,
    dt_Nascimento DATE NOT NULL,
    ativo BOOLEAN NOT NULL DEFAULT TRUE,
    foto VARCHAR(100) NOT NULL DEFAULT('default.png'),
    senha VARCHAR(60) NOT NULL,
    tp_sanguineo VARCHAR(5),
    cpf VARCHAR(20) NOT NULL UNIQUE,
    rg VARCHAR(20) NOT NULL UNIQUE,
    fk_id_Hospital VARCHAR(60) NOT NULL
);

#TABELA REMEDIO
CREATE TABLE IF NOT EXISTS tbl_Remedio(
    id_Remedio VARCHAR(60) NOT NULL PRIMARY KEY,
    dt_Validade DATE NOT NULL,
    tarja VARCHAR(20) NOT NULL DEFAULT 'Livre',
    nome VARCHAR(50) NOT NULL,
    descricao TEXT NOT NULL,
    fabricante VARCHAR(50) NOT NULL,
    preco DECIMAL(10, 2) UNSIGNED NOT NULL
);

#TABELA FARMCAIA
CREATE TABLE IF NOT EXISTS tbl_Farmacia(
    id_Farmacia VARCHAR(60) NOT NULL PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    telefone VARCHAR(20) NOT NULL,
    endereco VARCHAR(150) NOT NULL,
    detalhes TEXT NOT NULL,
    cnpj VARCHAR(20) NOT NULL UNIQUE,
    ativo BOOLEAN NOT NULL DEFAULT TRUE,
    senha VARCHAR(60) NOT NULL,
    email VARCHAR(90) NOT NULL UNIQUE,
    foto VARCHAR(100) NOT NULL DEFAULT('default.png'),
    taxa DECIMAL(2,2) UNSIGNED NOT NULL,
    fk_id_MedWork VARCHAR(60) NOT NULL
);

#TABELA RECEITA
CREATE TABLE IF NOT EXISTS tbl_Receita(
    id_Receita VARCHAR(60) NOT NULL PRIMARY KEY,
    dosagem VARCHAR(50) NOT NULL,
    dt_Emissao DATE NOT NULL,
    orientacoes TEXT NOT NULL,
    dt_Validade DATE NOT NULL,
    fk_id_Medico VARCHAR(60) NOT NULL,
    fk_id_Paciente VARCHAR(60) NOT NULL
);

#TABELA CONSULTA
CREATE TABLE IF NOT EXISTS tbl_Consulta(
    id_Consulta VARCHAR(60) NOT NULL PRIMARY KEY,
    dt_Consulta DATE NOT NULL,
    descricao TEXT NOT NULL,
    fk_id_Paciente VARCHAR(60) NOT NULL,
    fk_id_Medico VARCHAR(60) NOT NULL,
    fk_id_Receita VARCHAR(60) NOT NULL
);

#TABELA COMPRA
CREATE TABLE IF NOT EXISTS tbl_Compra(
	id_Compra VARCHAR(60) NOT NULL PRIMARY KEY,
    cod_fiscal VARCHAR(40) NOT NULL,
    quantidade INT UNSIGNED NOT NULL,
    fk_id_Paciente VARCHAR(60) NOT NULL,
    fk_id_Remedio VARCHAR(60) NOT NULL
);

#TABELA REMEDIO_FARMACIA
CREATE TABLE IF NOT EXISTS tbl_Remedio_Farmacia(
	id_Remedio_Farmacia VARCHAR(60) NOT NULL PRIMARY KEY,
    estoque INT UNSIGNED NOT NULL,
    fk_id_Farmacia VARCHAR(60) NOT NULL,
    fk_id_Remedio VARCHAR(60) NOT NULL
);

#TABELA RECEITA_REMEDIO
CREATE TABLE IF NOT EXISTS tbl_Receita_Remedio(
	id_Receita_Remedio VARCHAR(60) NOT NULL PRIMARY KEY,
    Quantidade INT UNSIGNED NOT NULL,
    fk_id_Receita VARCHAR(60) NOT NULL,
    fk_id_Remedio VARCHAR(60) NOT NULL
);

CREATE TABLE IF NOT EXISTS tbl_Recepcionista(
    id_Recepcionista VARCHAR(60) NOT NULL PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    dt_Nascimento DATE NOT NULL,
    tp_sanguineo VARCHAR(5),
    ativo BOOLEAN NOT NULL DEFAULT TRUE,
    endereco VARCHAR(150) NOT NULL,
    cpf VARCHAR(20) NOT NULL UNIQUE,
    foto VARCHAR(100) NOT NULL DEFAULT "default.png",
    senha VARCHAR(60) NOT NULL,
    rg VARCHAR(20) NOT NULL UNIQUE,
    email VARCHAR(90) NOT NULL UNIQUE,
    celular VARCHAR(20) NOT NULL,
    telefone VARCHAR(20) NOT NULL,
    fk_id_Hospital VARCHAR(60) NOT NULL
);

CREATE TABLE IF NOT EXISTS tbl_MedWork(
    id_MedWork VARCHAR(60) NOT NULL PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    email VARCHAR(90) NOT NULL UNIQUE,
    senha VARCHAR(60) NOT NULL,
    cnpj VARCHAR(20) NOT NULL UNIQUE,
    ativo BOOL NOT NULL DEFAULT TRUE,
    foto VARCHAR(100) NOT NULL DEFAULT('default.png')
);

#######################################################################################
#CRIANDO FOREIGN KEY
#PACIENTE
ALTER TABLE
    tbl_Paciente
ADD
    CONSTRAINT fk_id_Recepcionista_Pac FOREIGN KEY(fk_id_Recepcionista) REFERENCES tbl_Recepcionista (id_Recepcionista);

#MEDICO
ALTER TABLE
    tbl_Medico
ADD
    CONSTRAINT fk_id_Hospital_Med FOREIGN KEY(fk_id_Hospital) REFERENCES tbl_Hospital (id_Hospital);

#RECEPCIONISTA
ALTER TABLE
    tbl_Recepcionista
ADD
    CONSTRAINT fk_id_Hospital_Rec FOREIGN KEY(fk_id_Hospital) REFERENCES tbl_Hospital(id_Hospital);

#Farmacia
ALTER TABLE
    tbl_Farmacia
ADD
    CONSTRAINT fk_id_MedWork_Farm FOREIGN KEY(fk_id_MedWork) REFERENCES tbl_MedWork(id_Medwork);

#RECEITA
ALTER TABLE
    tbl_Receita
ADD
    CONSTRAINT fk_id_Paciente_Rec FOREIGN KEY(fk_id_Paciente) REFERENCES tbl_Paciente (id_Paciente);

ALTER TABLE
    tbl_Receita
ADD
    CONSTRAINT fk_id_Medico_Rec FOREIGN KEY(fk_id_Medico) REFERENCES tbl_Medico (id_Medico);

#HOSPITAL
ALTER TABLE
    tbl_Hospital
ADD
    CONSTRAINT fk_id_MedWork_Hosp FOREIGN KEY(fk_id_MedWork) REFERENCES tbl_MedWork(id_MedWork);

#COMPRA
ALTER TABLE
    tbl_Compra
ADD
    CONSTRAINT fk_id_Paciente_Cmp FOREIGN KEY(fk_id_Paciente) REFERENCES tbl_Paciente(id_Paciente);

ALTER TABLE
    tbl_Compra
ADD
    CONSTRAINT fk_id_Remedio_Cmp FOREIGN KEY(fk_id_Remedio) REFERENCES tbl_Remedio(id_Remedio);

#REMEDIO_FARMACIA
ALTER TABLE
    tbl_Remedio_Farmacia
ADD
    CONSTRAINT fk_id_Farmacia_RF FOREIGN KEY(fk_id_Farmacia) REFERENCES tbl_Farmacia(id_Farmacia);

ALTER TABLE
    tbl_Remedio_Farmacia
ADD
    CONSTRAINT fk_id_Remedio_RF FOREIGN KEY(fk_id_Remedio) REFERENCES tbl_Remedio(id_Remedio);

#RECEITA_REMEDIO
ALTER TABLE
    tbl_Receita_Remedio
ADD
    CONSTRAINT fk_id_Receita_RR FOREIGN KEY(fk_id_Receita) REFERENCES tbl_Receita(id_Receita);

ALTER TABLE
    tbl_Receita_Remedio
ADD
    CONSTRAINT fk_id_Remedio_RR FOREIGN KEY(fk_id_Remedio) REFERENCES tbl_Remedio(id_Remedio);

#CONSULTA
ALTER TABLE
    tbl_Consulta
ADD
    CONSTRAINT fk_id_Paciente_Cs FOREIGN KEY(fk_id_Paciente) REFERENCES tbl_Paciente(id_Paciente);

ALTER TABLE
    tbl_Consulta
ADD
    CONSTRAINT fk_id_Medico_Cs FOREIGN KEY(fk_id_Medico) REFERENCES tbl_Medico(id_Medico);

ALTER TABLE
    tbl_Consulta
ADD
    CONSTRAINT fk_id_Receita_Cs FOREIGN KEY(fk_id_Receita) REFERENCES tbl_Receita(id_Receita);

#######################################################################################
-- -----------------------------------------------------------------------------------------------------------------------------------------------