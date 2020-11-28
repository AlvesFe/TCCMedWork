import React from 'react';

import ImageDefault from '../../images/default.png'

function UploadImagem(props){
    const { estabelecimento } = props;
    const { tipo } = props;
    const lowerTipo = tipo.charAt(0).toLowerCase() + tipo.slice(1)
    // console.log(props);
    return(
        <div className="ui divided items col-12">
            <div className="item">
                <div className="ui tiny image">
                    <img src={`/api/uploads/${lowerTipo}/${estabelecimento.foto}`} />
                </div>
                <div className="content">
                    <a className="header">{estabelecimento.nome}</a>
                    <div className="meta">
                        <div className="ui label"><i className="building icon"></i> {tipo}</div> <span className="cinema">CNPJ: {estabelecimento.cnpj}</span>
                    </div>
                    <div className="extra">
                        <p>Endereço: {estabelecimento.endereco}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UploadImagem




