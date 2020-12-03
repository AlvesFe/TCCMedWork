import React from 'react';
import Drogaria from '../../images/drogaria-sao-paulo.png'

export default function ListagemFarmacias({ item }) {
    return (
        <div className="col-4">
            <div className="card">
                <img height="220px" src={`/api/uploads/farmacia/${item.foto}`} className="card-img-top my-0" alt="..." />
                <div className="card-body mt-0 pt-0">
                    <h5 className="card-title my-0 text-center">{item.nome_farmacia}</h5>
                    <p className="card-title my-0 text-center small">{item.endereco}</p>
                    <h5 className="card-title my-1">{item.nome}</h5>
                    <p className="card-text">{item.descricao}</p>
                    <div className="clearfix">
                        <h2 className="float-left">R${item.preco}</h2>
                        <button type="button" className="btn btn-success float-right">Comprar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}