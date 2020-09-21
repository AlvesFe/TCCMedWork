import React from 'react';


export default props => (
    <div className='col-md-12 col-lg-8'>
        <div className='row mt-3'>
            <div className="col-lg-10 col-sm-12 text-center my-3">
                <h2>Minhas informações</h2>
            </div>
            <div className=" col-lg-2 col-sm-12 text-center"><svg width="8em" height="8em" viewBox="0 0 16 16" class="bi bi-circle-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <circle cx="8" cy="8" r="8" />
            </svg></div>
            <div className="col-12 text-center py-3">
                <button className='btn btn-outline-dark'>ALTERAR DADOS</button>
            </div>
        </div>
    </div>
)