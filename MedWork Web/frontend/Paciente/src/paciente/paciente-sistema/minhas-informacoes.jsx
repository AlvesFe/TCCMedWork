import React from 'react';


export default props => (
    <div className='col-md-12 col-lg-9 animate__animated animate__fadeIn animate__fast'>
        <div className='row mt-3'>
            <div className=" col-12 text-center"><svg width="8em" height="8em" viewBox="0 0 16 16" className="bi bi-circle-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <circle cx="8" cy="8" r="8" />
            </svg>
            </div>
            <div className="col-12 pt-5 container">
                <div className="form-row">
                    <div className="col-sm-12 col-md-8  py-3">
                        <input type="text" className="form-control form-control form-control-sm" placeholder="Nome" />
                    </div>
                    <div className="col-sm-6 col-md-2 py-3">
                        <input type="text" className="form-control form-control-sm" placeholder="DD/MM/AAAA" />
                    </div>
                    <div className="col-sm-6 col-md-2 py-3">
                        <input type="text" className="form-control  form-control-sm" placeholder="Tipo Sanguíneo" />
                    </div>
                    <div className="col-sm-12 col-md-8 py-3">
                        <input type="text" className="form-control  form-control-sm" placeholder="Endereço" />
                    </div>
                    <div className="col-sm-6 col-md-2 py-3">
                        <input type="text" className="form-control  form-control-sm" placeholder="CPF" />
                    </div>
                    <div className="col-sm-6 col-md-2 py-3">
                        <input type="text" className="form-control form-control-sm" placeholder="RG" />
                    </div>
                    <div className="col-4 py-3">
                        <input type="text" className="form-control form-control-sm" placeholder="E-mail" />
                    </div>
                    <div className="col-4 py-3">
                        <input type="text" className="form-control form-control-sm" placeholder="Celular" />
                    </div>
                    <div className="col-4 py-3">
                        <input type="text" className="form-control form-control-sm" placeholder="Telefone" />
                    </div>
                    <div className="col-12 py-3">
                        <input type="text" className="form-control form-control-sm" placeholder="Alergia a medicamento ou remédios" />
                    </div>
                    <div className="col-6 py-3">
                        <input type="password" className="form-control form-control-sm" placeholder="Nova senha" />
                    </div>
                    <div className="col-6 py-3">
                        <input type="password" className="form-control  form-control-sm" placeholder="Confirmar nova senha" />
                    </div>
                </div>
            </div>
            <div className="col-12 text-center py-3">
                <button className='btn-roxo'>ALTERAR DADOS</button>
            </div>
            <div className="col-12 py-5 d-block d-md-none"></div>
        </div>
    </div>
)