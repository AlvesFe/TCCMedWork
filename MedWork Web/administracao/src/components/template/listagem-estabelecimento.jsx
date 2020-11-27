import React from 'react';
import variables from '../../main/api/variables';

import ImageDefault from '../../images/default.png'

const env = variables()
const {API_URL} = env

function UploadImagem(props){
    const { estabelecimento } = props;
    const { tipo } = props;
    const lowerTipo = tipo.charAt(0).toLowerCase() + tipo.slice(1)
    console.log(estabelecimento);
    return(
        <div className='row'>
            <div className="ui divided items col-12">
                <div className="item">
                    <div className="ui tiny image">
                        <img src={`${API_URL}/uploads/${lowerTipo}/${estabelecimento.foto}`} />
                    </div>
                    <div className="content">
                        <a className="header">{estabelecimento.nome}</a>
                        <div className="meta">
                            <div className="ui label"><i className="building icon"></i> {tipo}</div> <span className="cinema">CNPJ:</span>
                        </div>
                        <div className="extra">
                            <p>Endereço:</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UploadImagem




