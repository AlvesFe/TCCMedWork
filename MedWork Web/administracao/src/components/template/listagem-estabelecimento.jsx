import React from 'react'

import ImageDefault from '../../images/default.png'

const UploadImagem = (props) => (
    <div className="ui divided items">

        <div className="item">
            <div className=" ui tiny image">
                <img src={ImageDefault} />
            </div>
            <div className="content">
                <a className="header">Nome do estabelecimento</a>
                <div className="meta">
                    <div className="ui label"><i className="building icon"></i> Farmácia / Hospital</div> <span className="cinema">CNPJ:</span>
                </div>
                <div className="extra">
                    <p>Endereço:</p>
                </div>
            </div>
        </div>

    </div>
)

export default UploadImagem




