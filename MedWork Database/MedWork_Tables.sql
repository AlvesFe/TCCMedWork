#CRIAÇÃO DO BANCO DE DADOS
DROP DATABASE IF EXISTS MedWork;

CREATE DATABASE IF NOT EXISTS MedWork;

USE MedWork;

#######################################################################################
#CRIAÇÃO DAS TABELAS

#TABELA PACIENTE
CREATE TABLE IF NOT EXISTS tbl_Paciente(
    id_Paciente INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    dt_Nascimento DATE NOT NULL,
    nome VARCHAR(50) NOT NULL,
    telefone VARCHAR(20) NOT NULL,
    tp_sanguineo VARCHAR(5),
    alergia TEXT,
    rg VARCHAR(25) NOT NULL UNIQUE,
    email VARCHAR(90) NOT NULL UNIQUE,
    cpf VARCHAR(25) NOT NULL UNIQUE,
    endereco VARCHAR(150),
    celular VARCHAR(20) NOT NULL,
    ativo BOOLEAN NOT NULL DEFAULT TRUE,
    senha VARCHAR(20) NOT NULL,
    alt_senha BOOLEAN DEFAULT TRUE,
    foto VARCHAR(100) NOT NULL DEFAULT('default.png'),
    fk_id_Recepcionista INT UNSIGNED NOT NULL
);

#TABELA HOSPITAL
CREATE TABLE IF NOT EXISTS tbl_Hospital(
    id_Hospital INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    cnpj VARCHAR(20) NOT NULL UNIQUE,
    nome VARCHAR(50) NOT NULL,
    endereco VARCHAR(150) NOT NULL,
    telefone VARCHAR(20) NOT NULL,
    ativo BOOLEAN NOT NULL DEFAULT TRUE,
    foto VARCHAR(100) NOT NULL DEFAULT('default.png'),
    email VARCHAR(90) NOT NULL UNIQUE,
    senha VARCHAR(20) NOT NULL,
    fk_id_MedWork INT UNSIGNED NOT NULL
);

#TABELA MEDICO
CREATE TABLE IF NOT EXISTS tbl_Medico(
    id_Medico INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    crm VARCHAR(10) NOT NULL UNIQUE,
    email VARCHAR(90) NOT NULL UNIQUE,
    nome VARCHAR(50) NOT NULL,
    especialidade VARCHAR(50) NOT NULL,
    telefone VARCHAR(20) NOT NULL,
    celular VARCHAR(20) NOT NULL,
    dt_Nascimento DATE NOT NULL,
    ativo BOOLEAN NOT NULL DEFAULT TRUE,
    foto VARCHAR(100) NOT NULL DEFAULT('default.png'),
    senha VARCHAR(20) NOT NULL,
    tp_sanguineo VARCHAR(5),
    cpf VARCHAR(25) NOT NULL UNIQUE,
    rg VARCHAR(25) NOT NULL UNIQUE,
    fk_id_Hospital INT UNSIGNED NOT NULL
);

#TABELA REMEDIO
CREATE TABLE IF NOT EXISTS tbl_Remedio(
    id_Remedio INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    dt_Validade DATE NOT NULL,
    tarja VARCHAR(20) NOT NULL DEFAULT 'Livre',
    nome VARCHAR(50) NOT NULL,
    descricao TEXT NOT NULL,
    fabricante VARCHAR(50) NOT NULL,
    preco DECIMAL(10, 2) UNSIGNED NOT NULL
);

#TABELA FARMCAIA
CREATE TABLE IF NOT EXISTS tbl_Farmacia(
    id_Farmacia INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(50) NOT NULL,
    telefone VARCHAR(20) NOT NULL,
    endereco VARCHAR(150) NOT NULL,
    detalhes TEXT NOT NULL,
    cnpj VARCHAR(20) NOT NULL UNIQUE,
    ativo BOOLEAN NOT NULL DEFAULT TRUE,
    senha VARCHAR(20) NOT NULL,
    email VARCHAR(90) NOT NULL UNIQUE,
    foto VARCHAR(100) NOT NULL DEFAULT('default.png'),
    fk_id_MedWork INT UNSIGNED NOT NULL
);

#TABELA RECEITA
CREATE TABLE IF NOT EXISTS tbl_Receita(
    id_Receita INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    dosagem VARCHAR(50) NOT NULL,
    dt_Emissao DATE NOT NULL,
    orientacoes TEXT NOT NULL,
    dt_Validade DATE NOT NULL,
    fk_id_Medico INT UNSIGNED NOT NULL,
    fk_id_Paciente INT UNSIGNED NOT NULL
);

#TABELA CONSULTA
CREATE TABLE IF NOT EXISTS tbl_Consulta(
    id_Consulta INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    dt_Consulta DATE NOT NULL,
    descricao TEXT NOT NULL,
    fk_id_Paciente INT UNSIGNED NOT NULL,
    fk_id_Medico INT UNSIGNED NOT NULL,
    fk_id_Receita INT UNSIGNED NOT NULL
);

#TABELA COMPRA
CREATE TABLE IF NOT EXISTS tbl_Compra(
    cod_fiscal VARCHAR(40) NOT NULL,
    quantidade INT UNSIGNED NOT NULL,
    fk_id_Paciente INT UNSIGNED NOT NULL,
    fk_id_Remedio INT UNSIGNED NOT NULL
);

#TABELA REMEDIO_FARMACIA
CREATE TABLE IF NOT EXISTS tbl_Remedio_Farmacia(
    estoque INT UNSIGNED NOT NULL,
    fk_id_Farmacia INT UNSIGNED NOT NULL,
    fk_id_Remedio INT UNSIGNED NOT NULL
);

#TABELA RECEITA_REMEDIO
CREATE TABLE IF NOT EXISTS tbl_Receita_Remedio(
    Quantidade INT UNSIGNED NOT NULL,
    fk_id_Receita INT UNSIGNED NOT NULL,
    fk_id_Remedio INT UNSIGNED NOT NULL
);

CREATE TABLE IF NOT EXISTS tbl_Recepcionista(
    id_Recepcionista INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(50) NOT NULL,
    dt_Nascimento DATE NOT NULL,
    tp_sanguineo VARCHAR(5),
    ativo BOOLEAN NOT NULL DEFAULT TRUE,
    endereco VARCHAR(150) NOT NULL,
    cpf VARCHAR(25) NOT NULL UNIQUE,
    senha VARCHAR(20) NOT NULL,
    rg VARCHAR(25) NOT NULL UNIQUE,
    email VARCHAR(90) NOT NULL UNIQUE,
    celular VARCHAR(20) NOT NULL,
    telefone VARCHAR(20) NOT NULL,
    fk_id_Hospital INT UNSIGNED NOT NULL
);

CREATE TABLE IF NOT EXISTS tbl_MedWork(
    id_MedWork INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(50) NOT NULL,
    email VARCHAR(90) NOT NULL UNIQUE,
    senha VARCHAR(20) NOT NULL,
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
#TRIGGER
#TABELAS:
-- TABELA_RECEITA
CREATE TABLE IF NOT EXISTS Hst_Receita(
    id_Historico_Receita INT UNSIGNED AUTO_INCREMENT,
    id_Receita INT UNSIGNED NOT NULL,
    dosagem_Nova VARCHAR(50) NOT NULL,
    dosagem_Antiga VARCHAR(50) NULL,
    orientacoes_Nova TEXT NOT NULL,
    orientacoes_Antiga TEXT NULL,
    dt_Emissao_Nova DATE NOT NULL,
    dt_Emissao_Antiga DATE NULL,
    dt_Validade_Nova DATE NOT NULL,
    dt_Validade_Antiga DATE NULL,
    acao VARCHAR(10) NOT NULL,
    dt_Acao DATE NOT NULL,
    fk_id_Medico INT UNSIGNED NOT NULL,
    fk_id_Paciente INT UNSIGNED NOT NULL,
    PRIMARY KEY(id_Historico_Receita)
);

-- TABELA RECEITA_REMEDIO
CREATE TABLE IF NOT EXISTS Hst_Receita_Remedio(
    id_Historico_Receita_Remedio INT UNSIGNED AUTO_INCREMENT,
    Quantidade_Nova INT UNSIGNED NOT NULL,
    Quantidade_Antiga INT UNSIGNED NULL,
    fk_id_Receita INT UNSIGNED NOT NULL,
    fk_id_Remedio INT UNSIGNED NOT NULL,
    acao VARCHAR(10) NOT NULL,
    dt_Acao DATE NOT NULL,
    PRIMARY KEY(id_Historico_Receita_Remedio)
);

-- TABELA REMEDIO
CREATE TABLE IF NOT EXISTS Hst_Remedio(
    id_Historico_Remedio INT UNSIGNED AUTO_INCREMENT,
    id_Remedio INT UNSIGNED,
    tarja_Nova VARCHAR(20) NOT NULL,
    tarja_Antiga VARCHAR(20) NULL,
    nome_Novo VARCHAR(50) NOT NULL,
    nome_Antigo VARCHAR(50) NULL,
    descricao_Nova TEXT NOT NULL,
    descricao_Antiga TEXT NULL,
    preco_Novo DECIMAL(10, 2) UNSIGNED NOT NULL,
    preco_Antigo DECIMAL(10, 2) UNSIGNED NULL,
    dt_Validade DATE NOT NULL,
    fabricante VARCHAR(50) NOT NULL,
    acao VARCHAR(10) NOT NULL,
    dt_Acao DATE NOT NULL,
    PRIMARY KEY(id_Historico_Remedio)
);

-- TABELA CONSULTA
CREATE TABLE IF NOT EXISTS Hst_Consulta(
    id_Historico_Consulta INT UNSIGNED AUTO_INCREMENT,
    id_Consulta INT UNSIGNED NOT NULL,
    dt_Consulta_Nova DATE NOT NULL,
    dt_Consulta_Antiga DATE NULL,
    descricao_Nova TEXT NOT NULL,
    descricao_Antiga TEXT NULL,
    fk_id_Paciente INT UNSIGNED NOT NULL,
    fk_id_Medico INT UNSIGNED NOT NULL,
    fk_id_Receita INT UNSIGNED NOT NULL,
    acao VARCHAR(10) NOT NULL,
    dt_Acao DATE NOT NULL,
    PRIMARY KEY(id_Historico_Consulta)
);

-- TABELA HOSPITAL
CREATE TABLE IF NOT EXISTS Hst_Hospital(
    id_historico_Hospital INT UNSIGNED AUTO_INCREMENT,
    id_Hospital INT UNSIGNED NOT NULL,
    cnpj_Novo VARCHAR(20) NOT NULL,
    cnpj_Antigo VARCHAR(20) NULL,
    nome_Novo VARCHAR(50) NOT NULL,
    nome_Antigo VARCHAR(50) NULL,
    endereco_Novo VARCHAR(150) NOT NULL,
    endereco_Antigo VARCHAR(150) NULL,
    telefone_Novo VARCHAR(20) NOT NULL,
    telefone_Antigo VARCHAR(20) NULL,
    email_Novo VARCHAR(90) NOT NULL,
    email_Antigo VARCHAR(90) NULL,
    senha_Nova VARCHAR(20) NOT NULL,
    senha_Antiga VARCHAR(20) NULL,
    foto VARCHAR(100) NOT NULL,
    fk_id_MedWork INT UNSIGNED NOT NULL,
    acao VARCHAR(10) NOT NULL,
    dt_Acao DATE NOT NULL,
    PRIMARY KEY(id_historico_Hospital)
);

-- TABELA FARMACIA
CREATE TABLE IF NOT EXISTS Hst_Farmacia(
    id_historico_Farmacia INT UNSIGNED AUTO_INCREMENT,
    id_Farmacia INT UNSIGNED,
    nome_Novo VARCHAR(50) NOT NULL,
    nome_Antigo VARCHAR(50) NULL,
    telefone_Novo VARCHAR(20) NOT NULL,
    telefone_Antigo VARCHAR(20) NULL,
    endereco_Novo VARCHAR(150) NOT NULL,
    endereco_Antigo VARCHAR(150) NULL,
    detalhes_Novo TEXT NOT NULL,
    detalhes_Antigo TEXT NULL,
    cnpj_Novo VARCHAR(20) NOT NULL,
    cnpj_Antigo VARCHAR(20) NULL,
    senha_Novo VARCHAR(20) NOT NULL,
    senha_Antigo VARCHAR(20) NULL,
    email_Novo VARCHAR(90) NOT NULL,
    email_Antigo VARCHAR(90) NULL,
    foto VARCHAR(100) NOT NULL,
    fk_id_MedWork INT UNSIGNED NOT NULL,
    acao VARCHAR(10) NOT NULL,
    dt_Acao DATE NOT NULL,
    PRIMARY KEY(id_historico_Farmacia)
);

-- -----------------------------------------------------------------------------------------------------------------------------------------------
-- TABELA RECEITA (INSERT TRIGGER);
CREATE TRIGGER Trg_Insert_Rc
AFTER
INSERT
    ON Tbl_Receita FOR EACH ROW
INSERT
    Hst_Receita (
        id_Receita,
        dosagem_Nova,
        dosagem_Antiga,
        orientacoes_Nova,
        orientacoes_Antiga,
        dt_Emissao_Nova,
        dt_Emissao_Antiga,
        dt_Validade_Nova,
        dt_Validade_Antiga,
        acao,
        dt_Acao,
        fk_id_Medico,
        fk_id_Paciente
    )
VALUES
    (
        NEW.id_Receita,
        NEW.dosagem,
        NULL,
        NEW.orientacoes,
        NULL,
        NEW.dt_Emissao,
        NULL,
        NEW.dt_Validade,
        NULL,
        'INSERT',
        NOW(),
        NEW.fk_id_Medico,
        NEW.fk_id_Paciente
    );

-- TABELA RECEITA (UPDATE TRIGGER);
CREATE TRIGGER Trg_Update_Rc
AFTER
UPDATE
    ON Tbl_Receita FOR EACH ROW
INSERT
    Hst_Receita (
        id_Receita,
        dosagem_Nova,
        dosagem_Antiga,
        orientacoes_Nova,
        orientacoes_Antiga,
        dt_Emissao_Nova,
        dt_Emissao_Antiga,
        dt_Validade_Nova,
        dt_Validade_Antiga,
        acao,
        dt_Acao,
        fk_id_Medico,
        fk_id_Paciente
    )
VALUES
    (
        NEW.id_Receita,
        NEW.dosagem,
        OLD.dosagem,
        NEW.orientacoes,
        OLD.orientacoes,
        NEW.dt_Emissao,
        OLD.dt_Emissao,
        NEW.dt_Validade,
        OLD.dt_Validade,
        'UPDATE',
        NOW(),
        OLD.fk_id_Medico,
        OLD.fk_id_Paciente
    );

-- TABELA RECEITA (DELETE TRIGGER);
CREATE TRIGGER Trg_Delete_Rc BEFORE DELETE ON Tbl_Receita FOR EACH ROW
INSERT
    Hst_Receita (
        id_Receita,
        dosagem_Nova,
        dosagem,
        orientacoes_Nova,
        orientacoes_Antiga,
        dt_Emissao_Nova,
        dt_Emissao_Antiga,
        dt_Validade_Nova,
        dt_Validade_Antiga,
        acao,
        dt_Acao,
        fk_id_Medico,
        fk_id_Paciente
    )
VALUES
    (
        OLD.id_Receita,
        NULL,
        OLD.dosagem,
        NULL,
        OLD.orientacoes,
        NULL,
        OLD.dt_Emissao,
        NULL,
        OLD.dt_Validade,
        'DELETE',
        NOW(),
        OLD.fk_id_Medico,
        OLD.fk_id_Paciente
    );

-- -----------------------------------------------------------------------------------------------------------------------------------------------
-- TABELA RECEITA_REMEDIO (INSERT TRIGGER);
CREATE TRIGGER Trg_Insert_RR
AFTER
INSERT
    ON Tbl_Receita_Remedio FOR EACH ROW
INSERT
    Hst_Receita_Remedio (
        Quantidade_Nova,
        Quantidade_Antiga,
        fk_id_Receita,
        fk_id_Remedio,
        acao,
        dt_Acao
    )
VALUES
    (
        NEW.Quantidade,
        NULL,
        NEW.fk_id_Receita,
        NEW.fk_id_Remedio,
        'INSERT',
        NOW()
    );

-- TABELA RECEITA (UPDATE TRIGGER);
CREATE TRIGGER Trg_Update_RR
AFTER
UPDATE
    ON Tbl_Receita_Remedio FOR EACH ROW
INSERT
    Hst_Receita_Remedio (
        Quantidade_Nova,
        Quantidade_Antiga,
        fk_id_Receita,
        fk_id_Remedio,
        acao,
        dt_Acao
    )
VALUES
    (
        NEW.Quantidade,
        OLD.Quantidade,
        NEW.fk_id_Receita,
        NEW.fk_id_Remedio,
        'UPDATE',
        NOW()
    );

-- TABELA RECEITA (DELETE TRIGGER);
CREATE TRIGGER Trg_Delete_RR BEFORE
UPDATE
    ON Tbl_Receita_Remedio FOR EACH ROW
INSERT
    Hst_Receita_Remedio (
        Quantidade_Nova,
        Quantidade_Antiga,
        fk_id_Receita,
        fk_id_Remedio,
        acao,
        dt_Acao
    )
VALUES
    (
        NULL,
        OLD.Quantidade,
        OLD.fk_id_Receita,
        OLD.fk_id_Remedio,
        'DELETE',
        NOW()
    );

-- -----------------------------------------------------------------------------------------------------------------------------------------------
-- TABELA REMEDIO (INSERT TRIGGER);
CREATE TRIGGER Trg_Insert_R
AFTER
INSERT
    ON Tbl_Remedio FOR EACH ROW
INSERT
    Hst_Remedio (
        id_Remedio,
        tarja_Nova,
        tarja_Antiga,
        nome_Novo,
        nome_Antigo,
        descricao_Nova,
        descricao_Antiga,
        preco_Novo,
        preco_Antigo,
        dt_Validade,
        fabricante,
        acao,
        dt_Acao
    )
VALUES
    (
        NEW.id_Remedio,
        NEW.tarja,
        NULL,
        NEW.nome,
        NULL,
        NEW.descricao,
        NULL,
        NEW.preco,
        NULL,
        NEW.dt_Validade,
        NEW.fabricante,
        'INSERT',
        NOW()
    );

-- TABELA REMEDIO (UPDATE TRIGGER);
CREATE TRIGGER Trg_Update_R
AFTER
UPDATE
    ON Tbl_Remedio FOR EACH ROW
INSERT
    Hst_Remedio (
        id_Remedio,
        tarja_Nova,
        tarja_Antiga,
        nome_Novo,
        nome_Antigo,
        descricao_Nova,
        descricao_Antiga,
        preco_Novo,
        preco_Antigo,
        dt_Validade,
        fabricante,
        acao,
        dt_Acao
    )
VALUES
    (
        OLD.id_Remedio,
        NEW.tarja,
        OLD.tarja,
        NEW.nome,
        OLD.nome,
        NEW.descricao,
        OLD.descricao,
        NEW.preco,
        OLD.preco,
        OLD.dt_Validade,
        OLD.fabricante,
        'DELETE',
        NOW()
    );

-- TABELA REMEDIO (DELETE TRIGGER);
CREATE TRIGGER Trg_Delete_R BEFORE DELETE ON Tbl_Remedio FOR EACH ROW
INSERT
    Hst_Remedio (
        id_Remedio,
        tarja_Nova,
        tarja_Antiga,
        nome_Novo,
        nome_Antigo,
        descricao_Nova,
        descricao_Antiga,
        preco_Novo,
        preco_Antigo,
        dt_Validade,
        fabricante,
        acao,
        dt_Acao
    )
VALUES
    (
        OLD.id_Remedio,
        NULL,
        OLD.tarja,
        NULL,
        OLD.nome,
        NULL,
        OLD.descricao,
        NULL,
        OLD.preco,
        OLD.dt_Validade,
        OLD.fabricante,
        'DELETE',
        NOW()
    );

-- -----------------------------------------------------------------------------------------------------------------------------------------------
-- TABELA CONSULTA (INSERT TRIGGER);
CREATE TRIGGER Trg_Insert_C
AFTER
INSERT
    ON Tbl_Consulta FOR EACH ROW
INSERT
    Hst_Consulta (
        id_Consulta,
        dt_Consulta_Nova,
        dt_Consulta_Antiga,
        descricao_Nova,
        descricao_Antiga,
        fk_id_Paciente,
        fk_id_Medico,
        fk_id_Receita,
        acao,
        dt_Acao
    )
VALUES
    (
        NEW.id_Consulta,
        NEW.dt_Consulta,
        NULL,
        NEW.descricao,
        NULL,
        NEW.fk_id_Paciente,
        NEW.fk_id_Medico,
        NEW.fk_id_Receita,
        'INSERT',
        NOW()
    );

-- TABELA CONSULTA (UPDATE TRIGGER);
CREATE TRIGGER Trg_Update_C
AFTER
UPDATE
    ON Tbl_Consulta FOR EACH ROW
INSERT
    Hst_Consulta (
        id_Consulta,
        dt_Consulta_Nova,
        dt_Consulta_Antiga,
        descricao_Nova,
        descricao_Antiga,
        fk_id_Paciente,
        fk_id_Medico,
        fk_id_Receita,
        acao,
        dt_Acao
    )
VALUES
    (
        OLD.id_Consulta,
        NEW.dt_Consulta,
        OLD.dt_Consulta,
        NEW.descricao,
        OLD.descricao,
        OLD.fk_id_Paciente,
        OLD.fk_id_Medico,
        OLD.fk_id_Receita,
        'UPDATE',
        NOW()
    );

-- TABELA CONSULTA (DELETE TRIGGER);
CREATE TRIGGER Trg_Delete_C
AFTER
    DELETE ON Tbl_Consulta FOR EACH ROW
INSERT
    Hst_Consulta (
        id_Consulta,
        dt_Consulta_Nova,
        dt_Consulta_Antiga,
        descricao_Nova,
        descricao_Antiga,
        fk_id_Paciente,
        fk_id_Medico,
        fk_id_Receita,
        acao,
        dt_Acao
    )
VALUES
    (
        OLD.id_Consulta,
        NULL,
        OLD.dt_Consulta,
        NULL,
        OLD.descricao,
        OLD.fk_id_Paciente,
        OLD.fk_id_Medico,
        OLD.fk_id_Receita,
        'DELETE',
        NOW()
    );

-- -----------------------------------------------------------------------------------------------------------------------------------------------
-- TABELA HOSPITAL (INSERT TRIGGER);
CREATE TRIGGER Trg_Insert_H
AFTER
INSERT
    ON Tbl_Hospital FOR EACH ROW
INSERT
    Hst_Hospital (
        id_Hospital,
        cnpj_Novo,
        cnpj_Antigo,
        nome_Novo,
        nome_Antigo,
        endereco_Novo,
        endereco_Antigo,
        telefone_Novo,
        telefone_Antigo,
        email_Novo,
        email_Antigo,
        senha_Nova,
        senha_Antiga,
        foto,
        fk_id_MedWork,
        acao,
        dt_Acao
    )
VALUES
    (
        NEW.id_Hospital,
        NEW.cnpj,
        NULL,
        NEW.nome,
        NULL,
        NEW.endereco,
        NULL,
        NEW.telefone,
        NULL,
        NEW.email,
        NULL,
        NEW.senha,
        NULL,
        NEW.foto,
        NEW.fk_id_MedWork,
        'INSERT',
        NOW()
    );

-- TABELA HOSPITAL (UPDATE TRIGGER);
CREATE TRIGGER Trg_Update_H
AFTER
UPDATE
    ON Tbl_Hospital FOR EACH ROW
INSERT
    Hst_Hospital (
        id_Hospital,
        cnpj_Novo,
        cnpj_Antigo,
        nome_Novo,
        nome_Antigo,
        endereco_Novo,
        endereco_Antigo,
        telefone_Novo,
        telefone_Antigo,
        email_Novo,
        email_Antigo,
        senha_Nova,
        senha_Antiga,
        foto,
        fk_id_MedWork,
        acao,
        dt_Acao
    )
VALUES
    (
        OLD.id_Hospital,
        NEW.cnpj,
        OLD.cnpj,
        NEW.nome,
        OLD.nome,
        NEW.endereco,
        OLD.endereco,
        NEW.telefone,
        OLD.telefone,
        NEW.email,
        OLD.email,
        NEW.senha,
        OLD.senha,
        NEW.foto,
        OLD.fk_id_MedWork,
        'UPDATE',
        NOW()
    );

-- TABELA HOSPITAL (DELETE TRIGGER);
CREATE TRIGGER Trg_Delete_H
AFTER
    DELETE ON Tbl_Hospital FOR EACH ROW
INSERT
    Hst_Hospital (
        id_Hospital,
        cnpj_Novo,
        cnpj_Antigo,
        nome_Novo,
        nome_Antigo,
        endereco_Novo,
        endereco_Antigo,
        telefone_Novo,
        telefone_Antigo,
        email_Novo,
        email_Antigo,
        senha_Nova,
        senha_Antiga,
        foto,
        fk_id_MedWork,
        acao,
        dt_Acao
    )
VALUES
    (
        OLD.id_Hospital,
        NULL,
        OLD.cnpj,
        NULL,
        OLD.nome,
        NULL,
        OLD.endereco,
        NULL,
        OLD.telefone,
        NULL,
        OLD.email,
        NULL,
        OLD.senha,
        Old.foto,
        OLD.fk_id_MedWork,
        'DELETE',
        NOW()
    );

-- -----------------------------------------------------------------------------------------------------------------------------------------------
-- TABELA FARMACIA (INSERT TRIGGER)
CREATE TRIGGER Trg_Insert_F
AFTER
INSERT
    ON Tbl_Farmacia FOR EACH ROW
INSERT
    Hst_Farmacia (
        id_Farmacia,
        nome_Novo,
        nome_Antigo,
        telefone_Novo,
        telefone_Antigo,
        endereco_Novo,
        endereco_Antigo,
        detalhes_Antigo,
        detalhes_Novo,
        cnpj_Novo,
        cnpj_Antigo,
        senha_Novo,
        senha_Antigo,
        email_Novo,
        email_Antigo,
        foto,
        fk_id_MedWork,
        acao,
        dt_Acao
    )
VALUES
    (
        NEW.id_Farmacia,
        NEw.nome,
        NULL,
        NEW.telefone,
        NULL,
        NEW.endereco,
        NULL,
        NULL,
        NEW.detalhes,
        NEW.cnpj,
        NULL,
        NEW.senha,
        NULL,
        NEW.email,
        NULL,
        NEW.foto,
        NEW.fk_id_MedWork,
        'INSERT',
        NOW()
    );

-- TABELA FARMACIA (UPDATE TRIGGER)
CREATE TRIGGER Trg_Update_F
AFTER
UPDATE
    ON Tbl_Farmacia FOR EACH ROW
INSERT
    Hst_Farmacia (
        id_Farmacia,
        nome_Novo,
        nome_Antigo,
        telefone_Novo,
        telefone_Antigo,
        endereco_Novo,
        endereco_Antigo,
        detalhes_Antigo,
        detalhes_Novo,
        cnpj_Novo,
        cnpj_Antigo,
        senha_Novo,
        senha_Antigo,
        email_Novo,
        email_Antigo,
        foto,
        fk_id_MedWork,
        acao,
        dt_Acao
    )
VALUES
    (
        OLD.id_Farmacia,
        NEW.nome,
        OLD.nome,
        NEW.telefone,
        OLD.telefone,
        NEW.endereco,
        OLD.endereco,
        NEW.detalhes,
        OLD.detalhes,
        NEW.cnpj,
        OLD.cnpj,
        NEW.senha.NEW,
        OLD.senha,
        NEW.email,
        OLD.email,
        NEW.foto,
        OLD.fk_id_MedWork,
        'UPDATE',
        NOW()
    );

-- TABELA FARMACIA (DELETE TRIGGER)
CREATE TRIGGER Trg_Delete_F
AFTER
    DELETE ON Tbl_Farmacia FOR EACH ROW
INSERT
    Hst_Farmacia (
        id_Farmacia,
        nome_Novo,
        nome_Antigo,
        telefone_Novo,
        telefone_Antigo,
        endereco_Novo,
        endereco_Antigo,
        detalhes_Antigo,
        detalhes_Novo,
        cnpj_Novo,
        cnpj_Antigo,
        senha_Novo,
        senha_Antigo,
        email_Novo,
        email_Antigo,
        foto,
        fk_id_MedWork,
        acao,
        dt_Acao
    )
VALUES
    (
        OLD.id_Farmacia,
        NULL,
        OLD.nome,
        NULL,
        OLD.telefone,
        NULL,
        OLD.endereco,
        NULL,
        OLD.detalhes,
        NULL,
        OLD.cnpj,
        NULL,
        OLD.senha,
        NULL,
        OLD.email,
        OLD.foto,
        OLD.fk_id_MedWork,
        'DELETE',
        NOW()
    );

-- -----------------------------------------------------------------------------------------------------------------------------------------------