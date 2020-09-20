#SELCETS QUE SERAM USADOS

#SELECT LOGIN PACIENTE
SELECT * FROM tbl_Paciente WHERE cpf = '?' AND senha = '?';

#SELECT RECEITAS DO PACIENTE
SELECT tblR.*, tblRR.*, 
tblM.id_Medico, tblM.nome, tblM.crm, 
tblRM.id_Remedio, tblRM.nome, tblRM.preco, tblRM.tarja
FROM tbl_Receita As tblR 
CROSS JOIN tbl_Receita_Remedio As tblRR 
CROSS JOIN tbl_Medico As tblM
CROSS JOIN tbl_Remedio As tblRM
WHERE tblR.fk_id_Paciente = '?' 
AND tblRR.fk_id_Receita = tblR.id_Receita 
AND tblR.fk_id_Medico = tblM.id_Medico
AND tblRR.fk_id_Remedio = tblRM.id_Remedio;

#SELECT BUSCAR REMDIOS
SELECT tblRF.*, 
tblF.id_Farmacia, tblF.nome, tblF.telefone, tblF.endereco, tblF.detalhes, tblF.cnpj,
tblR.id_Remedio, tblR.tarja, tblR.nome, tblR.descricao, tblR.preco
FROM tbl_Remedio_Farmacia As tblRF
CROSS JOIN tbl_Farmacia As tblF
CROSS JOIN tbl_Remedio As tblR 
WHERE id_Remedio = '?'
AND tblRF.fk_id_Remedio = tblR.id_Remedio
AND tblF.id_Farmacia = tblRF.fk_id_Farmacia;