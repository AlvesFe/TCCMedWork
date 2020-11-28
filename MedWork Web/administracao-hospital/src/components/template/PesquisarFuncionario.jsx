import React from 'react';

export default () => {
    return (
        <div className="accordion" id="Accordion">
            <div className="card">
                <a className="collapsed text-dark" data-toggle="collapse" data-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                    <div className="card-header" id="cabecalho-1">
                        <h3>
                            <i className="user md icon"></i>
                             Médico
                        </h3>
                    </div>
                </a>

                <div id="collapseOne" className="collapse" aria-labelledby="cabecalho-1" data-parent="#Accordion">
                    <div className="card-body">

                        <label htmlFor="pesquisarMedico" className='font-weight-bold'>CRM</label>
                        <input type="text" className="form-control form-control-lg" id="pesquisarMedico" name="crm" placeholder='__.___-__' />
                        <div className='text-center py-3'>
                            <button className='btn-roxo' >PESQUISAR</button>
                        </div>

                    </div>
                </div>
            </div>
            <div className="card">
                <a className=" collapsed text-dark" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                    <div className="card-header" id="cabecalho-2">
                        <h3>
                            <i className="user icon"></i>
                             Recepcionista
                        </h3>
                    </div>
                </a>
                <div id="collapseTwo" className="collapse" aria-labelledby="cabecalho-2" data-parent="#Accordion">
                    <div className="card-body">

                        <label htmlFor="pesquisarRecepcionista" className='font-weight-bold'>CPF</label>
                        <input type="text" className="form-control form-control-lg" id="pesquisarRecepcionista" name="cpf" placeholder='___.___.___-__' />
                        <div className='text-center py-3'>
                            <button className='btn-roxo' >PESQUISAR</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}