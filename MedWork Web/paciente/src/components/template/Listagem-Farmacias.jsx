import React from 'react';
import Drogaria from '../../images/drogaria-sao-paulo.png'

export default function ListagemFarmacias(props) {
    return (
        <div className="col-4">
            <div className="card">
                <img src={Drogaria} className="card-img-top my-0" alt="..." />
                <div className="card-body mt-0 pt-0">
                    <h5 className="card-title my-0 text-center">DROGARIA SÃO PAULO</h5>
                    <p className="card-title my-0 text-center small">Rua dos quimbá, 2222, Ipiranga, São Paulo, SP</p>
                    <h5 className="card-title my-1">Nome do medicamento</h5>
                    <p className="card-text">Descrição do medicamento.</p>
                    <div className="clearfix">
                        <h2  className="float-left">R$13.40</h2>
                        <button type="button" className="btn btn-success float-right">Comprar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}