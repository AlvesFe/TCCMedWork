import React from 'react';

export default (props) => {

    return (
        <div>
            <div>
                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <a className={this.state.abaPesquisar} href="#" name='abaPesquisar' onClick={this.changeAbaPesquisar}>Pesquisar</a>
                    </li>
                    <li className="nav-item">
                        <a className={this.state.abaCadastrar} href="#" name='abaCadastrar' onClick={this.changeAbaCadastrar}>Cadastrar</a>
                    </li>
                    <li className="nav-item">
                        <a className={this.state.abaVerTodos} href="#" name='abaCadastrar' onClick={this.changeAbaVerTodos}>Ver todos os medicamentos</a>
                    </li>
                </ul>
            </div>
        </div>
    )

}