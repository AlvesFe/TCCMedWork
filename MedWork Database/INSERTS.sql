-- -----------------------------------------------------------------------------------------------------------

-- TABELA ESTABELECIMENTOS
INSERT INTO tbl_Estabelecimentos (id_Estabelecimento, cnpj, Estabelecimento) 
VALUES 
(MD5(1), '90173833000147', 'admMedWork');

INSERT INTO tbl_Estabelecimentos (id_Estabelecimento, cnpj, Estabelecimento) 
VALUES 
(MD5(2), '04551296000190', 'admMedWork');

INSERT INTO tbl_Estabelecimentos (id_Estabelecimento, cnpj, Estabelecimento) 
VALUES 
(MD5(3), '83498886000172', 'hospital');

INSERT INTO tbl_Estabelecimentos (id_Estabelecimento, cnpj, Estabelecimento) 
VALUES 
(MD5(4), '64841401000157', 'hospital');

INSERT INTO tbl_Estabelecimentos (id_Estabelecimento, cnpj, Estabelecimento) 
VALUES 
(MD5(5), '65649240000167', 'farmacia');

INSERT INTO tbl_Estabelecimentos (id_Estabelecimento, cnpj, Estabelecimento) 
VALUES 
(MD5(6), '97687908000157', 'farmacia');
-- ------------------------------------------------------------------------------------------------------------- -----------------------------------------------------------------------------------------------------------

-- TABELA MEDWORK
INSERT INTO tbl_MedWork (id_MedWork, nome, email, senha, fk_id_Estabelecimento) 
VALUES 
(MD5(1), 'Felipe', 'lipe.batistao@gmail.com', '$2b$10$YY7nGEr22uXv5eiS.zfyGuwz9d22kHFLGi.OxdPYqjScYGkS3Wcdi', MD5(1));

INSERT INTO tbl_MedWork (id_MedWork, nome, email, senha, fk_id_Estabelecimento) 
VALUES 
(MD5(2), 'Lemos', 'LemosDeveloper@gmail.com', '$2b$10$YY7nGEr22uXv5eiS.zfyGuwz9d22kHFLGi.OxdPYqjScYGkS3Wcdi', MD5(2));
-- -----------------------------------------------------------------------------------------------------------

-- TABELA HOSPITAL
INSERT INTO tbl_Hospital (id_Hospital, nome, endereco, telefone, email, senha, fk_id_MedWork, fk_id_Estabelecimento) 
VALUES 
(MD5(1), 'Albert Einstein', 'Av. Albert Einstein, 627 - Jardim Leonor', '11985946110', 'Albert@hospital.com', '$2b$10$YY7nGEr22uXv5eiS.zfyGuwz9d22kHFLGi.OxdPYqjScYGkS3Wcdi', MD5(1), MD5(3));

INSERT INTO tbl_Hospital (id_Hospital, nome, endereco, telefone, email, senha, fk_id_MedWork, fk_id_Estabelecimento) 
VALUES 
(MD5(2), 'Alpha Med', 'R. Da consolação, Jd. das flores', '11547865661', 'MedAlpha@gmail.com', '$2b$10$YY7nGEr22uXv5eiS.zfyGuwz9d22kHFLGi.OxdPYqjScYGkS3Wcdi', MD5(2), MD5(4));

-- -----------------------------------------------------------------------------------------------------------

-- TABELA FARMACIA

INSERT INTO tbl_Farmacia(id_Farmacia, nome, telefone, endereco, detalhes, senha, email, taxa, fk_id_MedWork, fk_id_Estabelecimento)
VALUES
(MD5(1), 'Drogasil', '1156444781', 'R. Manoel, Jd. Ana Estela', 'Os Melhores Preços!!!', '$2b$10$YY7nGEr22uXv5eiS.zfyGuwz9d22kHFLGi.OxdPYqjScYGkS3Wcdi', 'Drogasil@medwork.com', 2.50, MD5(1), MD5(5));

INSERT INTO tbl_Farmacia(id_Farmacia, nome, telefone, endereco, detalhes, senha, email, taxa, fk_id_MedWork, fk_id_Estabelecimento)
VALUES
(MD5(2), 'FarmaConde', '116458455', 'Vila Dirce, Jd. Planalto', 'A Melhor do Mercado', '$2b$10$YY7nGEr22uXv5eiS.zfyGuwz9d22kHFLGi.OxdPYqjScYGkS3Wcdi', 'CondeFarma@gmail.com', 02.50, MD5(2), MD5(6));
-- -----------------------------------------------------------------------------------------------------------

-- TABELA RECEPCIONISTA

INSERT INTO tbl_Recepcionista (id_Recepcionista, nome, dt_nascimento, tp_sanguineo, endereco, cpf, senha, rg, email, celular, telefone, fk_id_Hospital)
VALUES
(MD5(1), 'Claudia', '1990-06-15', 'A+', 'Rua São Francisco, 796, Vila Santa Terezinha', '89276362878', '$2b$10$YY7nGEr22uXv5eiS.zfyGuwz9d22kHFLGi.OxdPYqjScYGkS3Wcdi', '192013987', 'Claudinha@gmail.com', '11985564552', '1128777456', MD5(1));
INSERT INTO tbl_Recepcionista (id_Recepcionista, nome, dt_nascimento, tp_sanguineo, endereco, cpf, senha, rg, email, celular, telefone, fk_id_Hospital)
VALUES
(MD5(2), 'Natasha', '2000-05-12', 'O+', 'Rua Atibaia, 220, Vila Dirce', '17727383872', '$2b$10$YY7nGEr22uXv5eiS.zfyGuwz9d22kHFLGi.OxdPYqjScYGkS3Wcdi', '123456789', 'NatashaCaldeirao@gmail.com', '11948884552', '1128147456', MD5(2));
-- -----------------------------------------------------------------------------------------------------------

-- TABELA MEDICO

INSERT INTO tbl_Medico (id_Medico, crm, email, nome, especialidade, telefone, celular, dt_Nascimento, senha, tp_sanguineo, cpf, rg, fk_id_Hospital)
VALUES
(MD5(1), '12345SP', 'VelosoLucas@gmail.com', 'Lucas', 'Cirugião', '11658453225', '1158777456', '1980-02-05', '$2b$10$YY7nGEr22uXv5eiS.zfyGuwz9d22kHFLGi.OxdPYqjScYGkS3Wcdi', 'AB+', '98060874020', '456724567', MD5(2));

INSERT INTO tbl_Medico (id_Medico, crm, email, nome, especialidade, telefone, celular, dt_Nascimento, senha, tp_sanguineo, cpf, rg, fk_id_Hospital)
VALUES
(MD5(2), '54321SP', 'Jennyfer.contato@gmail.com', 'Jennyfer', 'Enfermeira', '11654857445', '1125645558', '1989-08-25', '$2b$10$YY7nGEr22uXv5eiS.zfyGuwz9d22kHFLGi.OxdPYqjScYGkS3Wcdi', 'B-', '42489985051', '456789456', MD5(1));

-- -----------------------------------------------------------------------------------------------------------

-- TABELA PACIENTE

INSERT INTO tbl_Paciente (id_Paciente, dt_nascimento, nome, telefone, tp_sanguineo, alergia, rg, email, cpf, endereco, celular, senha, fk_id_Recepcionista)
VALUES
(MD5(1), '1995-05-30', 'Enzo', '1165999458', 'A-', 'Nozes', '564897564', 'Enzo123@gmail.com', '49028776001', 'R. da Gloria, Jd. Amélia', '11654564231', '$2b$10$YY7nGEr22uXv5eiS.zfyGuwz9d22kHFLGi.OxdPYqjScYGkS3Wcdi', MD5(2));

INSERT INTO tbl_Paciente (id_Paciente, dt_nascimento, nome, telefone, tp_sanguineo, alergia, rg, email, cpf, endereco, celular, senha, fk_id_Recepcionista)
VALUES
(MD5(2), '2004-05-12', 'Nathan', '1128777240', 'AB+', 'Nehuma', '159864531', 'Nathan.rodrigu3s@gmail.com', '45259169077', 'R. Manoel José Garcia, Jd. Ana Estela', '11985946110', '$2b$10$YY7nGEr22uXv5eiS.zfyGuwz9d22kHFLGi.OxdPYqjScYGkS3Wcdi', MD5(1));

-- -----------------------------------------------------------------------------------------------------------

-- TABELA REMEDIO
INSERT INTO tbl_Remedio (id_Remedio, codigo, dt_Validade, tarja, nome, descricao, fabricante, preco, bula)
VALUES
(MD5(1), 1, '2025-09-22', 'PRETA', 'Diazepam', 'Alivio de Ansiedade', 'Onofre', 45.04, 'https://www.onofre.com.br/estaticos/bulas/427799.pdf');

INSERT INTO tbl_Remedio (id_Remedio, codigo, dt_Validade, tarja, nome, descricao, fabricante, preco, bula)
VALUES
(MD5(2), 2, '2025-09-22', 'AMARELA', 'Buscopan', 'Alivio de Colicas intestinais', 'Boehringer Ingelheim', 14.75, 'https://www.boehringer-ingelheim.com.br/sites/br/files/bula_buscopan_paciente_e_profissional_30102017_0.pdf');

-- -----------------------------------------------------------------------------------------------------------

-- TABELA RECEITA

INSERT INTO tbl_Receita (id_Receita, dosagem, dt_Emissao, orientacoes, dt_Validade, fk_id_Medico, fk_id_Paciente)
VALUES
(MD5(1), '20 Comprimidos', '2020-09-15', 'Tomar com agua', '2020-10-01', MD5(1), MD5(2));

INSERT INTO tbl_Receita (id_Receita, dosagem, dt_Emissao, orientacoes, dt_Validade, fk_id_Medico, fk_id_Paciente)
VALUES
(MD5(2) ,'10mg', '2020-08-15', 'Sintomas diferentes consultar o medico', '2020-09-18', MD5(2), MD5(1));

INSERT INTO tbl_Receita (id_Receita, dosagem, dt_Emissao, orientacoes, dt_Validade, fk_id_Medico, fk_id_Paciente)
VALUES
(MD5(3) ,'20kg', '2020-09-30', 'Sintomas diferentes consultar o coveiro', '2020-10-02', MD5(2), MD5(1));

-- -----------------------------------------------------------------------------------------------------------

-- TABELA RECEITA_REMEDIO
INSERT INTO tbl_Receita_Remedio (id_Receita_Remedio, Quantidade, fk_id_Receita, fk_id_Remedio)
VALUES
(MD5(1), 10, MD5(2), MD5(1));

INSERT INTO tbl_Receita_Remedio (id_Receita_Remedio, Quantidade, fk_id_Receita, fk_id_Remedio)
VALUES
(MD5(2), 5, MD5(1), MD5(2));

INSERT INTO tbl_Receita_Remedio (id_Receita_Remedio, Quantidade, fk_id_Receita, fk_id_Remedio)
VALUES
(MD5(3), 10, MD5(3), MD5(2));
-- -----------------------------------------------------------------------------------------------------------

-- TABELA REMEDIO_FARMACIA

INSERT INTO tbl_Remedio_Farmacia (id_Remedio_farmacia, estoque, fk_id_Farmacia, fk_id_Remedio)
VALUES
(MD5(1), 30, MD5(1), MD5(1));

INSERT INTO tbl_Remedio_Farmacia (id_Remedio_farmacia, estoque, fk_id_Farmacia, fk_id_Remedio)
VALUES
(MD5(2), 150, MD5(1), MD5(2));

-- -----------------------------------------------------------------------------------------------------------

-- TABELA CONSULTA

INSERT INTO tbl_Consulta (id_Consulta, dt_Consulta, descricao, fk_id_Paciente, fk_id_Medico, fk_id_Receita)
VALUES
(MD5(1), '2020-08-14', 'Ta com dangue', MD5(1), MD5(1), MD5(2));

INSERT INTO tbl_Consulta (id_Consulta, dt_Consulta, descricao, fk_id_Paciente, fk_id_Medico, fk_id_Receita)
VALUES
(MD5(2), '2020-09-15', 'Ta com Colica', MD5(2), MD5(2), MD5(1));

-- -----------------------------------------------------------------------------------------------------------

-- TABELA COMPRA 

INSERT INTO tbl_Compra (id_Compra, cod_fiscal, quantidade, valorRecebido, valorDevolvido, tipo, endereco, fk_id_Farmacia, fk_id_Paciente, fk_id_Remedio)
VALUES
(MD5(1), '5874569458452', 1, 50, 7.60, 'Entrega', 'R. da Casa do Caralho-V2', MD5(2), MD5(2), MD5(2));

INSERT INTO tbl_Compra (id_Compra, cod_fiscal, quantidade, valorRecebido, valorDevolvido, tipo, endereco, fk_id_Farmacia, fk_id_Paciente, fk_id_Remedio)
VALUES
(MD5(2), '4859415165165', 5, 25, 1.40, 'Retirar', 'R. da Casa do Caralho', MD5(1) ,MD5(1), MD5(1));

-- -----------------------------------------------------------------------------------------------------------