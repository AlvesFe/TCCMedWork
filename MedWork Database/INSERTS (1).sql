-- -----------------------------------------------------------------------------------------------------------
select * from Tbl_MedWork;
-- TABELA MEDWORK
INSERT INTO Tbl_MedWork (id_MedWork, nome, email, senha, cnpj) 
VALUES 
(MD5(1), 'Felipe', 'FelipaoReact@gmail.com', MD5('Felipo123'), '12345678');

INSERT INTO Tbl_MedWork (id_MedWork, nome, email, senha, cnpj) 
VALUES 
(MD5(2), 'Lemos', 'LemosDeveloper@gmail.com', MD5('JavaeBom'), '87654321');
-- -----------------------------------------------------------------------------------------------------------

-- TABELA HOSPITAL
INSERT INTO Tbl_Hospital (id_Hospital, cnpj, nome, endereco, telefone, email, senha, fk_id_MedWork) 
VALUES 
(MD5(1), '12345678', 'Albert Einstein', 'R. Da desgraça, Jd. da Morte', '11985946110', 'Albert@gmail.com', MD5('Covid123'), MD5(1));

INSERT INTO Tbl_Hospital (id_Hospital, cnpj, nome, endereco, telefone, email, senha, fk_id_MedWork) 
VALUES 
(MD5(2), '87654321', 'Alpha Med', 'R. Da consolação, Jd. das flores', '11547865661', 'MedAlpha@gmail.com', MD5('SANGUE145'), MD5(2));

-- -----------------------------------------------------------------------------------------------------------

-- TABELA FARMACIA

INSERT INTO tbl_Farmacia(id_Farmacia, nome, telefone, endereco, detalhes, cnpj, senha, email, fk_id_MedWork)
VALUES
(MD5(1), 'Drogasil', '1156444781', 'R. Manoel, Jd. Ana Estela', 'As Melhores Drogas =D', '56489754', MD5('Dangue123'), 'Drogasil@gmail.com', MD5(2));

INSERT INTO tbl_Farmacia(id_Farmacia, nome, telefone, endereco, detalhes, cnpj, senha, email, fk_id_MedWork)
VALUES
(MD5(2), 'FarmaConde', '116458455', 'Vila Dirce, Jd. Planalto', 'A Melhor do Mercado', '32654990', MD5('Dangue321'), 'CondeFarma@gmail.com', MD5(1));


-- -----------------------------------------------------------------------------------------------------------

-- TABELA RECEPCIONISTA

INSERT INTO tbl_recepcionista (id_Recepcionista, nome, dt_nascimento, tp_sanguineo, endereco, cpf, senha, rg, email, celular, telefone, fk_id_Hospital)
VALUES
(MD5(1), 'Claudia', '1990-06-15', 'A+', 'Murão de carapicuíba', '2783261855', MD5('123456'), '192013987', 'Claudinha@gmail.com', '11985564552', '1128777456', MD5(2));
INSERT INTO tbl_recepcionista (id_Recepcionista, nome, dt_nascimento, tp_sanguineo, endereco, cpf, senha, rg, email, celular, telefone, fk_id_Hospital)
VALUES
(MD5(2), 'Natasha', '2000-05-12', 'O+', 'Murão de carapicuíba', '2453261642', MD5('654321'), '123456789', 'NatashaCaldeirao@gmail.com', '11948884552', '1128147456', MD5(1));
-- -----------------------------------------------------------------------------------------------------------

-- TABELA MEDICO

INSERT INTO tbl_Medico (id_Medico, crm, email, nome, especialidade, telefone, celular, dt_Nascimento, senha, tp_sanguineo, cpf, rg, fk_id_Hospital)
VALUES
(MD5(1), 'F054008', 'VelosoLucas@gmail.com', 'Lucas', 'Cirugião', '11658453225', '1158777456', '1980-02-05', MD5('123456'), 'AB+', '12345589745', '456724567', MD5(2));

INSERT INTO tbl_Medico (id_Medico, crm, email, nome, especialidade, telefone, celular, dt_Nascimento, senha, tp_sanguineo, cpf, rg, fk_id_Hospital)
VALUES
(MD5(2), 'F184654', 'Jennyfer.contato@gmail.com', 'Jennyfer', 'Enfermeira', '11654857445', '1125645558', '1989-08-25', MD5('654321'), 'B-', '12564587956', '456789456', MD5(1));

-- -----------------------------------------------------------------------------------------------------------

-- TABELA PACIENTE

INSERT INTO tbl_Paciente (id_Paciente, dt_nascimento, nome, telefone, tp_sanguineo, alergia, rg, email, cpf, endereco, celular, senha, fk_id_Recepcionista)
VALUES
(MD5(1), '1995-05-30', 'Enzo', '1165999458', 'A-', 'Nozes', '564897564', 'Enzo123@gmail.com', '54864578945', 'R. da Gloria, Jd. Depresão', '11654564231', MD5('111111'), MD5(2));

INSERT INTO tbl_Paciente (id_Paciente, dt_nascimento, nome, telefone, tp_sanguineo, alergia, rg, email, cpf, endereco, celular, senha, fk_id_Recepcionista)
VALUES
(MD5(2), '2004-05-12', 'Nathan', '1128777240', 'AB+', 'Nehuma', '159864531', 'Nathan.rodrigu3s@gmail.com', '56487594521', 'R. Manoel José Garcia, Jd. Ana Estela', '11985946110', MD5('MedWork123'), MD5(2));

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
(MD5(1), '20 Comprimidos', '2020-09-15', 'Tomar com agua', '2020-10-01', MD5(2), MD5(1));

INSERT INTO tbl_Receita (id_Receita, dosagem, dt_Emissao, orientacoes, dt_Validade, fk_id_Medico, fk_id_Paciente)
VALUES
(MD5(2), '10mg', '2020-08-15', 'Sintomas diferentes consultar o medico', '2020-09-18', MD5(1), MD5(2));

-- -----------------------------------------------------------------------------------------------------------

-- TABELA RECEITA_REMEDIO

INSERT INTO tbl_Receita_Remedio (id_Receita_Remedio, Quantidade, fk_id_Receita, fk_id_Remedio)
VALUES
(MD5(1), 2, MD5(1), MD5(2));

INSERT INTO tbl_Receita_Remedio (id_Receita_Remedio, Quantidade, fk_id_Receita, fk_id_Remedio)
VALUES
(MD5(2), 1, MD5(2), MD5(1));

-- -----------------------------------------------------------------------------------------------------------

-- TABELA REMEDIO_FARMACIA

INSERT INTO tbl_Remedio_farmacia (id_Remedio_Farmacia, estoque, fk_id_Farmacia, fk_id_Remedio)
VALUES
(MD5(1), 30, MD5(1), MD5(1));

INSERT INTO tbl_Remedio_farmacia (id_Remedio_Farmacia, estoque, fk_id_Farmacia, fk_id_Remedio)
VALUES
(MD5(2), 150, MD5(2), MD5(2));

-- -----------------------------------------------------------------------------------------------------------

-- TABELA CONSULTA

INSERT INTO tbl_consulta (id_Consulta, dt_Consulta, descricao, fk_id_Paciente, fk_id_Medico, fk_id_Receita)
VALUES
(MD5(1), '2020-08-14', 'Ta com dangue', MD5(1), MD5(1), MD5(2));

INSERT INTO tbl_consulta (id_Consulta, dt_Consulta, descricao, fk_id_Paciente, fk_id_Medico, fk_id_Receita)
VALUES
(MD5(2), '2020-09-15', 'Ta com Colica', MD5(2), MD5(2), MD5(1));

-- -----------------------------------------------------------------------------------------------------------

-- TABELA COMPRA 

INSERT INTO tbl_Compra (id_Compra, cod_fiscal, quantidade, fk_id_Paciente, fk_id_Remedio)
VALUES
(MD5(1), '5874569458452', 1, MD5(2), MD5(2));

INSERT INTO tbl_Compra (id_Compra, cod_fiscal, quantidade, fk_id_Paciente, fk_id_Remedio)
VALUES
(MD5(2), '4859415165165', 5, MD5(1), MD5(1));

-- -----------------------------------------------------------------------------------------------------------