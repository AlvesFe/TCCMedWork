-- -----------------------------------------------------------------------------------------------------------

-- TABELA ESTABELECIMENTOS
INSERT INTO tbl_Estabelecimentos (id_Estabelecimento, cnpj, Estabelecimento) 
VALUES 
(MD5(1), '12345678912345', 'MedWork');

INSERT INTO tbl_Estabelecimentos (id_Estabelecimento, cnpj, Estabelecimento) 
VALUES 
(MD5(2), '54321987654321', 'MedWork');

INSERT INTO tbl_Estabelecimentos (id_Estabelecimento, cnpj, Estabelecimento) 
VALUES 
(MD5(3), '25874563254236', 'Hospital');

INSERT INTO tbl_Estabelecimentos (id_Estabelecimento, cnpj, Estabelecimento) 
VALUES 
(MD5(4), '58974123658974', 'Hospital');

INSERT INTO tbl_Estabelecimentos (id_Estabelecimento, cnpj, Estabelecimento) 
VALUES 
(MD5(5), '58975412355548', 'Farmacia');

INSERT INTO tbl_Estabelecimentos (id_Estabelecimento, cnpj, Estabelecimento) 
VALUES 
(MD5(6), '65458756452310', 'Farmacia');
-- ------------------------------------------------------------------------------------------------------------- -----------------------------------------------------------------------------------------------------------

-- TABELA MEDWORK
INSERT INTO tbl_MedWork (id_MedWork, nome, email, senha, fk_id_Estabelecimento) 
VALUES 
(MD5(1), 'Felipe', 'FelipaoReact@gmail.com', '$2b$10$YY7nGEr22uXv5eiS.zfyGuwz9d22kHFLGi.OxdPYqjScYGkS3Wcdi', MD5(1));

INSERT INTO tbl_MedWork (id_MedWork, nome, email, senha, fk_id_Estabelecimento) 
VALUES 
(MD5(2),'Lemos', 'LemosDeveloper@gmail.com', 'JavaeBom', MD5(2));
-- -----------------------------------------------------------------------------------------------------------

-- TABELA HOSPITAL
INSERT INTO tbl_Hospital (id_Hospital, nome, endereco, telefone, email, senha, fk_id_MedWork, fk_id_Estabelecimento) 
VALUES 
(MD5(1), 'Albert Einstein', 'R. Da desgraça, Jd. da Morte', '11985946110', 'Albert@gmail.com', 'Covid123', MD5(1), MD5(3));

INSERT INTO tbl_Hospital (id_Hospital, nome, endereco, telefone, email, senha, fk_id_MedWork, fk_id_Estabelecimento) 
VALUES 
(MD5(2), 'Alpha Med', 'R. Da consolação, Jd. das flores', '11547865661', 'MedAlpha@gmail.com', 'Covid321', MD5(2), MD5(4));

-- -----------------------------------------------------------------------------------------------------------

-- TABELA FARMACIA

INSERT INTO tbl_Farmacia(id_Farmacia, nome, telefone, endereco, detalhes, senha, email, taxa, fk_id_MedWork, fk_id_Estabelecimento)
VALUES
(MD5(1), 'Drogasil', '1156444781', 'R. Manoel, Jd. Ana Estela', 'As Melhores Drogas =D', 'Dangue123', 'Drogasil@gmail.com', 2.50, MD5(1), MD5(5));

INSERT INTO tbl_Farmacia(id_Farmacia, nome, telefone, endereco, detalhes, senha, email, taxa, fk_id_MedWork, fk_id_Estabelecimento)
VALUES
(MD5(2), 'FarmaConde', '116458455', 'Vila Dirce, Jd. Planalto', 'A Melhor do Mercado', 'Dangue321', 'CondeFarma@gmail.com', 02.50, MD5(2), MD5(6));
-- -----------------------------------------------------------------------------------------------------------

-- TABELA RECEPCIONISTA

INSERT INTO tbl_Recepcionista (id_Recepcionista, nome, dt_nascimento, tp_sanguineo, endereco, cpf, senha, rg, email, celular, telefone, fk_id_Hospital)
VALUES
(MD5(1), 'Claudia', '1990-06-15', 'A+', 'Murão de carapicuíba', '2783261855', '123456', '192013987', 'Claudinha@gmail.com', '11985564552', '1128777456', MD5(1));
INSERT INTO tbl_Recepcionista (id_Recepcionista, nome, dt_nascimento, tp_sanguineo, endereco, cpf, senha, rg, email, celular, telefone, fk_id_Hospital)
VALUES
(MD5(2), 'Natasha', '2000-05-12', 'O+', 'Murão de carapicuíba', '2453261642', '654321', '123456789', 'NatashaCaldeirao@gmail.com', '11948884552', '1128147456', MD5(2));
-- -----------------------------------------------------------------------------------------------------------

-- TABELA MEDICO

INSERT INTO tbl_Medico (id_Medico, crm, email, nome, especialidade, telefone, celular, dt_Nascimento, senha, tp_sanguineo, cpf, rg, fk_id_Hospital)
VALUES
(MD5(1), 'F054008', 'VelosoLucas@gmail.com', 'Lucas', 'Cirugião', '11658453225', '1158777456', '1980-02-05', '123456', 'AB+', '12345589745', '456724567', MD5(2));

INSERT INTO tbl_Medico (id_Medico, crm, email, nome, especialidade, telefone, celular, dt_Nascimento, senha, tp_sanguineo, cpf, rg, fk_id_Hospital)
VALUES
(MD5(2), 'F184654', 'Jennyfer.contato@gmail.com', 'Jennyfer', 'Enfermeira', '11654857445', '1125645558', '1989-08-25', '654321', 'B-', '12564587956', '456789456', MD5(1));

-- -----------------------------------------------------------------------------------------------------------

-- TABELA PACIENTE

INSERT INTO tbl_Paciente (id_Paciente, dt_nascimento, nome, telefone, tp_sanguineo, alergia, rg, email, cpf, endereco, celular, senha, fk_id_Recepcionista)
VALUES
(MD5(1), '1995-05-30', 'Enzo', '1165999458', 'A-', 'Nozes', '564897564', 'Enzo123@gmail.com', '54864578945', 'R. da Gloria, Jd. Depresão', '11654564231', '$2b$10$YY7nGEr22uXv5eiS.zfyGuwz9d22kHFLGi.OxdPYqjScYGkS3Wcdi', MD5(2));

INSERT INTO tbl_Paciente (id_Paciente, dt_nascimento, nome, telefone, tp_sanguineo, alergia, rg, email, cpf, endereco, celular, senha, fk_id_Recepcionista)
VALUES
(MD5(2), '2004-05-12', 'Nathan', '1128777240', 'AB+', 'Nehuma', '159864531', 'Nathan.rodrigu3s@gmail.com', '56487594521', 'R. Manoel José Garcia, Jd. Ana Estela', '11985946110', 'MedWork123', MD5(1));

-- -----------------------------------------------------------------------------------------------------------

-- TABELA REMEDIO
INSERT INTO tbl_Remedio (id_Remedio, dt_Validade, tarja, nome, descricao, fabricante, preco)
VALUES
(MD5(1), '2025-09-22', 'PRETA', 'Diazepam', 'Alivio de Ansiedade', 'Generico', 45.04);

INSERT INTO tbl_Remedio (id_Remedio, dt_Validade, tarja, nome, descricao, fabricante, preco)
VALUES
(MD5(2), '2025-09-22', 'AMARELA', 'Buscopan', 'Alivio de Colicas intestinais', 'Generico', 14.75);

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