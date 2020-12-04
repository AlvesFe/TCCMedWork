#TRIGGER
#TABELAS:
-- TABELA_RECEITA
CREATE TABLE IF NOT EXISTS Hst_Receita(
    id_Historico_Receita VARCHAR(60) NOT NULL,
    id_Receita VARCHAR(60) NOT NULL,
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
    fk_id_Medico VARCHAR(60) NOT NULL,
    fk_id_Paciente VARCHAR(60) NOT NULL,
    PRIMARY KEY(id_Historico_Receita)
);

-- TABELA RECEITA_REMEDIO
CREATE TABLE IF NOT EXISTS Hst_Receita_Remedio(
    id_Historico_Receita_Remedio VARCHAR(60) NOT NULL,
    Quantidade_Nova INT UNSIGNED NOT NULL,
    Quantidade_Antiga INT UNSIGNED NULL,
    fk_id_Receita VARCHAR(60) NOT NULL,
    fk_id_Remedio VARCHAR(60) NOT NULL,
    acao VARCHAR(10) NOT NULL,
    dt_Acao DATE NOT NULL,
    PRIMARY KEY(id_Historico_Receita_Remedio)
);

-- TABELA REMEDIO
CREATE TABLE IF NOT EXISTS Hst_Remedio(
    id_Historico_Remedio VARCHAR(60) NOT NULL,
    id_Remedio VARCHAR(60) NOT NULL,
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
    id_Historico_Consulta VARCHAR(60) NOT NULL,
    id_Consulta VARCHAR(60) NOT NULL,
    dt_Consulta_Nova DATE NOT NULL,
    dt_Consulta_Antiga DATE NULL,
    descricao_Nova TEXT NOT NULL,
    descricao_Antiga TEXT NULL,
    fk_id_Paciente VARCHAR(60) NOT NULL,
    fk_id_Medico VARCHAR(60) NOT NULL,
    fk_id_Receita VARCHAR(60) NOT NULL,
    acao VARCHAR(10) NOT NULL,
    dt_Acao DATE NOT NULL,
    PRIMARY KEY(id_Historico_Consulta)
);

-- TABELA HOSPITAL
CREATE TABLE IF NOT EXISTS Hst_Hospital(
    id_historico_Hospital VARCHAR(60) NOT NULL,
    id_Hospital VARCHAR(60) NOT NULL,
    nome_Novo VARCHAR(50) NOT NULL,
    nome_Antigo VARCHAR(50) NULL,
    endereco_Novo VARCHAR(150) NOT NULL,
    endereco_Antigo VARCHAR(150) NULL,
    telefone_Novo VARCHAR(20) NOT NULL,
    telefone_Antigo VARCHAR(20) NULL,
    email_Novo VARCHAR(90) NOT NULL,
    email_Antigo VARCHAR(90) NULL,
    senha_Nova VARCHAR(60) NOT NULL,
    senha_Antiga VARCHAR(60) NULL,
    foto VARCHAR(100) NOT NULL,
    fk_id_MedWork VARCHAR(60) NOT NULL,
    acao VARCHAR(10) NOT NULL,
    dt_Acao DATE NOT NULL,
    PRIMARY KEY(id_historico_Hospital)
);

-- TABELA FARMACIA
CREATE TABLE IF NOT EXISTS Hst_Farmacia(
    id_historico_Farmacia VARCHAR(60) NOT NULL,
    id_Farmacia VARCHAR(60) NOT NULL,
    nome_Novo VARCHAR(50) NOT NULL,
    nome_Antigo VARCHAR(50) NULL,
    telefone_Novo VARCHAR(20) NOT NULL,
    telefone_Antigo VARCHAR(20) NULL,
    endereco_Novo VARCHAR(150) NOT NULL,
    endereco_Antigo VARCHAR(150) NULL,
    detalhes_Novo TEXT NOT NULL,
    detalhes_Antigo TEXT NULL,
    senha_Novo VARCHAR(60) NOT NULL,
    senha_Antigo VARCHAR(60) NULL,
    email_Novo VARCHAR(90) NOT NULL,
    email_Antigo VARCHAR(90) NULL,
    taxa_Nova DECIMAL(10,2) UNSIGNED NOT NULL,
    taxa_Antiga DECIMAL(10,2) UNSIGNED NULL,
    foto VARCHAR(100) NOT NULL,
    fk_id_MedWork VARCHAR(60) NOT NULL,
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
		id_Historico_Receita,
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
		MD5(NOW()),
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
		id_Historico_Receita,
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
		MD5(NOW()),
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
CREATE TRIGGER  Trg_Delete_Rc
BEFORE
DELETE
	ON Tbl_Receita FOR EACH ROW 
INSERT 
	Hst_Receita (
		id_Historico_Receita,
		id_Receita , 
		dosagem_Nova , 
		dosagem_Antiga , 
		orientacoes_Nova , 
		orientacoes_Antiga , 
		dt_Emissao_Nova , 
		dt_Emissao_Antiga , 
		dt_Validade_Nova , 
		dt_Validade_Antiga , 
		acao , 
		dt_Acao , 
		fk_id_Medico , 
		fk_id_Paciente
	) 
VALUES 
	(
		MD5(NOW()),
		OLD.id_Receita , 
		OLD.dosagem , 
		NULL , 
		OLD.orientacoes , 
		NULL , 
		OLD.dt_Emissao , 
		NULL , 
		OLD.dt_Validade , 
		NULL , 
		'DELETE' , 
		NOW() , 
		OLD.fk_id_Medico , 
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
		id_Historico_Receita_Remedio,
        Quantidade_Nova,
        Quantidade_Antiga,
        fk_id_Receita,
        fk_id_Remedio,
        acao,
        dt_Acao
    )
VALUES
    (
		MD5(NOW()),
        NEW.Quantidade,
        NULL,
        NEW.fk_id_Receita,
        NEW.fk_id_Remedio,
        'INSERT',
        NOW()
    );

-- TABELA RECEITA_REMEDIO (UPDATE TRIGGER);
CREATE TRIGGER Trg_Update_RR
BEFORE
UPDATE
    ON Tbl_Receita_Remedio FOR EACH ROW
INSERT
    Hst_Receita_Remedio (
		id_Historico_Receita_Remedio,
        Quantidade_Nova,
        Quantidade_Antiga,
        fk_id_Receita,
        fk_id_Remedio,
        acao,
        dt_Acao
    )
VALUES
    (
		MD5(NOW()),
        NEW.Quantidade,
        OLD.Quantidade,
        NEW.fk_id_Receita,
        NEW.fk_id_Remedio,
        'UPDATE',
        NOW()
    );

-- TABELA RECEITA_REMEDIO (DELETE TRIGGER);
CREATE TRIGGER Trg_Delete_RR BEFORE
DELETE
    ON Tbl_Receita_Remedio FOR EACH ROW
INSERT
    Hst_Receita_Remedio (
		id_Historico_Receita_Remedio,
        Quantidade_Nova,
        Quantidade_Antiga,
        fk_id_Receita,
        fk_id_Remedio,
        acao,
        dt_Acao
    )
VALUES
    (
		MD5(NOW()),
		OLD.Quantidade,
        NULL,
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
		id_Historico_Remedio,
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
		MD5(NOW()),
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
		id_Historico_Remedio,
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
		MD5(NOW()),
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
		id_Historico_Remedio,
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
		MD5(NOW()),
        OLD.id_Remedio,
        OLD.tarja,
        NULL,
		OLD.nome,
        NULL,
        OLD.descricao,
        NULL,
        OLD.preco,
        NULL,
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
		id_Historico_Consulta,
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
		MD5(NOW()),
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
		id_Historico_Consulta,
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
		MD5(NOW()),
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
		id_Historico_Consulta,
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
		MD5(NOW()),
        OLD.id_Consulta,
        OLD.dt_Consulta,
        NULL,
        OLD.descricao,
        NULL,
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
		id_historico_Hospital,
        id_Hospital,
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
		MD5(NOW()),
        NEW.id_Hospital,
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
		id_historico_Hospital,
        id_Hospital,
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
		MD5(NOW()),
        OLD.id_Hospital,
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
		id_historico_Hospital,
        id_Hospital,
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
		MD5(NOW()),
        OLD.id_Hospital,
        OLD.nome,
        NULL,
        OLD.endereco,
        NULL,
        OLD.telefone,
        NULL,
        OLD.email,
        NULL,
        OLD.senha,
        NULL,
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
		id_historico_Farmacia,
        id_Farmacia,
        nome_Novo,
        nome_Antigo,
        telefone_Novo,
        telefone_Antigo,
        endereco_Novo,
        endereco_Antigo,
        detalhes_Antigo,
        detalhes_Novo,
        senha_Novo,
        senha_Antigo,
        email_Novo,
        email_Antigo,
        taxa_Nova,
        taxa_Antiga,
        foto,
        fk_id_MedWork,
        acao,
        dt_Acao
    )
VALUES
    (
		MD5(NOW()),
        NEW.id_Farmacia,
        NEw.nome,
        NULL,
        NEW.telefone,
        NULL,
        NEW.endereco,
        NULL,
        NULL,
        NEW.detalhes,
        NEW.senha,
        NULL,
        NEW.email,
        NULL,
        NEW.taxa,
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
		id_historico_Farmacia,
        id_Farmacia,
        nome_Novo,
        nome_Antigo,
        telefone_Novo,
        telefone_Antigo,
        endereco_Novo,
        endereco_Antigo,
        detalhes_Antigo,
        detalhes_Novo,
        senha_Novo,
        senha_Antigo,
        email_Novo,
        email_Antigo,
        taxa_Nova,
        taxa_Antiga,
        foto,
        fk_id_MedWork,
        acao,
        dt_Acao
    )
VALUES
    (
		MD5(NOW()),
        OLD.id_Farmacia,
        NEW.nome,
        OLD.nome,
        NEW.telefone,
        OLD.telefone,
        NEW.endereco,
        OLD.endereco,
        NEW.detalhes,
        OLD.detalhes,
        NEW.senha,
        OLD.senha,
        NEW.email,
        OLD.email,
        NEW.taxa,
        OLD.taxa,
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
		id_historico_Farmacia,
        id_Farmacia,
        nome_Novo,
        nome_Antigo,
        telefone_Novo,
        telefone_Antigo,
        endereco_Novo,
        endereco_Antigo,
        detalhes_Novo,
        detalhes_Antigo,
        senha_Novo,
        senha_Antigo,
        email_Novo,
        email_Antigo,
        taxa_Nova,
        taxa_Antiga,
        foto,
        fk_id_MedWork,
        acao,
        dt_Acao
    )
VALUES
    (
		MD5(NOW()),
        OLD.id_Farmacia,
        OLD.nome,
        NULL,
        OLD.telefone,
        NULL,
        OLD.endereco,
        NULL,
        OLD.detalhes,
        NULL,
        OLD.senha,
        NULL,
        OLD.email,
        NULL,
        OLD.taxa,
        NULL,
        OLD.foto,
        OLD.fk_id_MedWork,
        'DELETE',
        NOW()
    );

-- -----------------------------------------------------------------------------------------------------------------------------------------------