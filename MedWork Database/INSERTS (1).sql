-- -----------------------------------------------------------------------------------------------------------

-- TABELA MEDWORK
INSERT INTO Tbl_MedWork (id_MedWork, nome, email, senha, cnpj) 
VALUES 
(1, 'Felipe', 'FelipaoReact@gmail.com', 'Felipo123', '12345678');

INSERT INTO Tbl_MedWork (nome, email, senha, cnpj) 
VALUES 
('Lemos', 'LemosDeveloper@gmail.com', 'JavaeBom', '87654321');
-- -----------------------------------------------------------------------------------------------------------

-- TABELA HOSPITAL
INSERT INTO Tbl_Hospital (cnpj, nome, endereco, telefone, email, senha, fk_id_MedWork) 
VALUES 
('12345678', 'Albert Einstein', 'R. Da desgraça, Jd. da Morte', '11985946110', 'Albert@gmail.com', 'Covid123', 1);

INSERT INTO Tbl_Hospital (cnpj, nome, endereco, telefone, email, senha, fk_id_MedWork) 
VALUES 
('87654321', 'Alpha Med', 'R. Da consolação, Jd. das flores', '11547865661', 'MedAlpha@gmail.com', 'Covid321', 2);

-- -----------------------------------------------------------------------------------------------------------

-- TABELA FARMACIA

INSERT INTO tbl_Farmacia(nome, telefone, endereco, detalhes, cnpj, senha, email, fk_id_MedWork)
VALUES
('Drogasil', '1156444781', 'R. Manoel, Jd. Ana Estela', 'As Melhores Drogas =D', '56489754', 'Dangue123', 'Drogasil@gmail.com', 2);

INSERT INTO tbl_Farmacia(nome, telefone, endereco, detalhes, cnpj, senha, email, fk_id_MedWork)
VALUES
('FarmaConde', '116458455', 'Vila Dirce, Jd. Planalto', 'A Melhor do Mercado', '32654990', 'Dangue321', 'CondeFarma@gmail.com', 1);


-- -----------------------------------------------------------------------------------------------------------

-- TABELA RECEPCIONISTA

INSERT INTO tbl_recepcionista (nome, dt_nascimento, tp_sanguineo, endereco, cpf, senha, rg, email, celular, telefone, fk_id_Hospital)
VALUES
('Claudia', '1990-06-15', 'A+', 'Murão de carapicuíba', '2783261855', '123456', '192013987', 'Claudinha@gmail.com', '11985564552', '1128777456', 2);
INSERT INTO tbl_recepcionista (nome, dt_nascimento, tp_sanguineo, endereco, cpf, senha, rg, email, celular, telefone, fk_id_Hospital)
VALUES
('Natasha', '2000-05-12', 'O+', 'Murão de carapicuíba', '2453261642', '654321', '123456789', 'NatashaCaldeirao@gmail.com', '11948884552', '1128147456', 1);
-- -----------------------------------------------------------------------------------------------------------

-- TABELA MEDICO

INSERT INTO tbl_Medico (crm, email, nome, especialidade, telefone, celular, dt_Nascimento, senha, tp_sanguineo, cpf, rg, fk_id_Hospital)
VALUES
('F054008', 'VelosoLucas@gmail.com', 'Lucas', 'Cirugião', '11658453225', '1158777456', '1980-02-05', '123456', 'AB+', '12345589745', '456724567', 2);

INSERT INTO tbl_Medico (crm, email, nome, especialidade, telefone, celular, dt_Nascimento, senha, tp_sanguineo, cpf, rg, fk_id_Hospital)
VALUES
('F184654', 'Jennyfer.contato@gmail.com', 'Jennyfer', 'Enfermeira', '11654857445', '1125645558', '1989-08-25', '654321', 'B-', '12564587956', '456789456', 1);

-- -----------------------------------------------------------------------------------------------------------

-- TABELA PACIENTE

INSERT INTO tbl_Paciente (dt_nascimento, nome, telefone, tp_sanguineo, alergia, rg, email, cpf, endereco, celular, senha, fk_id_Recepcionista)
VALUES
('1995-05-30', 'Enzo', '1165999458', 'A-', 'Nozes', '564897564', 'Enzo123@gmail.com', '54864578945', 'R. da Gloria, Jd. Depresão', '11654564231', '111111', 2);

INSERT INTO tbl_Paciente (dt_nascimento, nome, telefone, tp_sanguineo, alergia, rg, email, cpf, endereco, celular, senha, fk_id_Recepcionista)
VALUES
('2004-05-12', 'Nathan', '1128777240', 'AB+', 'Nehuma', '159864531', 'Nathan.rodrigu3s@gmail.com', '56487594521', 'R. Manoel José Garcia, Jd. Ana Estela', '11985946110', 'MedWork123', 2);

-- -----------------------------------------------------------------------------------------------------------

-- TABELA REMEDIO
INSERT INTO tbl_Remedio (dt_Validade, tarja, nome, descricao, fabricante, preco)
VALUES
('2025-09-22', 'PRETA', 'Diazepam', 'Alivio de Ansiedade', 'Generico', 45.04);

INSERT INTO tbl_Remedio (dt_Validade, tarja, nome, descricao, fabricante, preco)
VALUES
('2025-09-22', 'AMARELA', 'Buscopan', 'Alivio de Colicas intestinais', 'Generico', 14.75);

-- -----------------------------------------------------------------------------------------------------------

-- TABELA RECEITA

INSERT INTO tbl_Receita (dosagem, dt_Emissao, orientacoes, dt_Validade, fk_id_Medico, fk_id_Paciente)
VALUES
('20 Comprimidos', '2020-09-15', 'Tomar com agua', '2020-10-01', 2, 1);

INSERT INTO tbl_Receita (dosagem, dt_Emissao, orientacoes, dt_Validade, fk_id_Medico, fk_id_Paciente)
VALUES
('10mg', '2020-08-15', 'Sintomas diferentes consultar o medico', '2020-09-18', 1, 2);

-- -----------------------------------------------------------------------------------------------------------

-- TABELA RECEITA_REMEDIO

INSERT INTO tbl_Receita_Remedio (Quantidade, fk_id_Receita, fk_id_Remedio)
VALUES
(2, 1, 2);

INSERT INTO tbl_Receita_Remedio (Quantidade, fk_id_Receita, fk_id_Remedio)
VALUES
(1, 2, 1);

-- -----------------------------------------------------------------------------------------------------------

-- TABELA REMEDIO_FARMACIA

INSERT INTO tbl_Remedio_farmacia (estoque, fk_id_Farmacia, fk_id_Remedio)
VALUES
(30, 1, 1);

INSERT INTO tbl_Remedio_farmacia (estoque, fk_id_Farmacia, fk_id_Remedio)
VALUES
(150, 2, 2);

-- -----------------------------------------------------------------------------------------------------------

-- TABELA CONSULTA

INSERT INTO tbl_consulta (dt_Consulta, descricao, fk_id_Paciente, fk_id_Medico, fk_id_Receita)
VALUES
('2020-08-14', 'Ta com dangue', 1, 1, 2);

INSERT INTO tbl_consulta (dt_Consulta, descricao, fk_id_Paciente, fk_id_Medico, fk_id_Receita)
VALUES
('2020-09-15', 'Ta com Colica', 2, 2, 1);

-- -----------------------------------------------------------------------------------------------------------

-- TABELA COMPRA 

INSERT INTO tbl_Compra (cod_fiscal, quantidade, fk_id_Paciente, fk_id_Remedio)
VALUES
('5874569458452', 1, 2, 2);

INSERT INTO tbl_Compra (cod_fiscal, quantidade, fk_id_Paciente, fk_id_Remedio)
VALUES
('4859415165165', 5, 1, 1);

-- -----------------------------------------------------------------------------------------------------------