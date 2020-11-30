import React, { Component } from 'react';

function ListarFuncionarios(props) {
    const { funcionario } = props;
    const { tipo } = props;

    const fotoMed = `/api/uploads/medico/${funcionario.foto}`
    const fotoRecep = `/api/uploads/recepcionista/${funcionario.foto}`
    return (
        <div className="col-12 py-5">
            <div className="ui items">
                <div className="item">
                    <a className="ui tiny image circle">
                        <img className="ui avatar image" onClick={() => alterarFuncionario(funcionario, tipo)} src={ tipo === "Recepcionista" ? fotoRecep : fotoMed } />
                    </a>
                    <div className="content">
                        <a className="header" onClick={() => alterarFuncionario(funcionario, tipo)}>{funcionario.nome}</a>
                        <div className="description">
                            <div className="ui label">
                                <span className='mr-2'>
                                    <i className={tipo === "Recepcionista" ? "user icon": "user md icon"}></i>
                                    {tipo}
                                </span>
                            </div>
                            <div className="ui label">
                                <span>
                                    <i className="address card icon"></i>
                                    {funcionario.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")}
                                </span>
                            </div>
                            <div className="mt-1">
                            <i className="envelope outline icon"></i>
                                E-mail: {funcionario.email}
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )

}

export default ListarFuncionarios

function alterarFuncionario(funcionario, tipo) {
    if (tipo === "Recepcionista") {
        localStorage.setItem('cpf', funcionario.cpf);
        window.location.assign('#/alterar-recepcionista');
    }
    else if(tipo === "Médico"){
        localStorage.setItem('crm', funcionario.crm);
        window.location.assign('#/alterar-medico');
    }
}