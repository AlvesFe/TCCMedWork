import React from 'react';

export default function ListagemHistorico(props) {
    return (
        <tr className='text-center text-capitalize' >
            <th scope="row">01</th>
            <td>Piruliba</td>
            <td>Roxa</td>
            <td>R$10.54</td>
            <td className='text-center'>
                <a href='#/alterar-medicamento' className='btn-roxo mr-1' title='Ver prescrição'>
                    Ver
                </a >
            </td>
        </tr>
    )
}