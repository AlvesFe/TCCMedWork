import React from 'react';
import alterarStatus from '../../main/api/alterarStatus';
import { jsPDF } from 'jspdf/dist/jspdf.umd';
import Logo from '../../images/logotipo.png';


export default function Listapedido({item}) {
    function alterarPedido(dados) {
        alterarStatus(dados).then(res => {
            res ? window.location.reload() : null
        })
        gerarPdf()
    }

    function gerarPdf() {
        const stringData = localStorage.getItem('user_data')
        const userData = JSON.parse(stringData)

        const doc = new jsPDF('p');
        doc.addImage(Logo, 'png', 80, 0, 50, 50);

        doc.text(93, 50, 'CLIENTE');
        doc.text(20, 70, 'Nome: ' + item.paciente);
        doc.text(20, 80, 'CPF: ' + item.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4"));
        doc.text(20, 90, 'Endereço: ' + item.endereco);

        doc.text(85, 110, 'MEDICAMENTO');
        doc.text(20, 130, 'Remédio: ' + item.nome);
        doc.text(20, 140, 'Quantidade: ' + item.quantidade);
        doc.text(20, 150, 'Preço: R$ ' + item.preco.toFixed(2));
        doc.text(20, 160, 'Valor a pagar: R$ ' + item.valorRecebido.toFixed(2));
        doc.text(20, 170, 'Troco: R$ ' + item.valorDevolvido.toFixed(2));
        doc.text(30, 190, '______________________  ______________________');
        doc.text(50, 200, 'Assinatura');
        doc.text(123, 200, 'Documento');

        doc.text(85, 240, 'Farmacia ' + userData.nome);
        doc.text(78, 250, userData.detalhes);
        doc.text(50, 260, 'Contato: ' + userData.telefone + " | " + userData.email);
        doc.text(64, 270, 'Endereço ' + userData.endereco);

        doc.save(`NOTA-${Date.now()}`);
    }

    return(
        <tr className='text-center text-capitalize' >
            <th scope="row">{item.nome}</th>
            <td>{item.quantidade}</td>
            <td>R$ {item.valorRecebido}</td>
            <td>R$ {item.valorDevolvido}</td>
            <td className='text-center'>
                {
                    item.status_pedido === "PENDENTE" && item.tipo === "Entrega" &&
                    (
                        <div>
                            <button className='btn btn-primary mr-1' onClick={() => alterarPedido({status: "ENTREGANDO", id_Compra: item.id_Compra})}><i className="shipping fast icon"></i></button>
                        </div>
                    )
                }
                {
                    item.status_pedido === "ENTREGANDO" && 
                    (
                        <div>
                            <button className='btn btn-success mr-1' onClick={() => alterarPedido({status: "ENTREGUE", id_Compra: item.id_Compra})}><i className="check icon"></i></button>
                            <button className='btn btn-danger' onClick={() => alterarPedido({status: "PENDENTE", id_Compra: item.id_Compra})}><i className="undo alternate icon"></i></button>
                        </div>
                    )
                }
                {
                    item.status_pedido === "PENDENTE" && item.tipo === "Retirar" &&
                    (
                        <div>
                            <button className='btn btn-success mr-1' onClick={() => alterarPedido({status: "ENTREGUE", id_Compra: item.id_Compra})}><i className="check icon"></i></button>
                        </div>
                    )
                }

            </td>
        </tr>
    )
}