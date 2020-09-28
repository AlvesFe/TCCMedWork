#SELCETS QUE SERAM USADOS

#SELECT LOGIN PACIENTE
SELECT * FROM tbl_Paciente WHERE cpf = '?' AND senha = '?';

#SELECT RECEITAS DO PACIENTE
SELECT tblR.*, tblRR.*, 
tblM.id_Medico, tblM.nome, tblM.crm, 
tblRM.id_Remedio, tblRM.nome, tblRM.preco, tblRM.tarja
FROM tbl_Receita As tblR 
LEFT JOIN tbl_Receita_Remedio As tblRR ON tblRR.fk_id_Receita = tblR.id_Receita
LEFT JOIN tbl_Medico As tblM ON tblR.fk_id_Medico = tblM.id_Medico
LEFT JOIN tbl_Remedio As tblRM ON tblRR.fk_id_Remedio = tblRM.id_Remedio
WHERE tblR.fk_id_Paciente = 1;

#SELECT BUSCAR REMDIOS
SELECT tblRF.*, 
tblF.id_Farmacia, tblF.nome, tblF.telefone, tblF.endereco, tblF.detalhes, tblF.cnpj,
tblR.id_Remedio, tblR.tarja, tblR.nome, tblR.descricao, tblR.preco
FROM tbl_Remedio_Farmacia As tblRF 
LEFT JOIN tbl_Farmacia As tblF ON tblF.id_Farmacia = tblRF.fk_id_Farmacia
LEFT JOIN tbl_Remedio As tblR ON tblRF.fk_id_Remedio = tblR.id_Remedio
WHERE id_Remedio = 1;

