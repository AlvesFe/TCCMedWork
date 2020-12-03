import React from 'react';



export default function ListagemHistorico({item}) {

    function onClick(item){
        localStorage.setItem('receita', item.id_Receita)
        window.location.assign('#/ver-prescricao');
    }

    return (
        <tr className='text-center text-capitalize' >
            <th scope="row">{item.nome}</th>
            <td>{item.dt_Emissao.slice(0, -14)}</td>
            <td>{item.dt_Validade.slice(0, -14)}</td>
            <td>{item.dosagem}</td>
            <td className='text-center'>
                <button onClick={() => onClick(item)} className='btn-roxo mr-1' title='Ver prescrição'>
                    Ver
                </button >
            </td>
        </tr>
    )
}