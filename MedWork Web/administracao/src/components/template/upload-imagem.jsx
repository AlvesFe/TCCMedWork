import React from 'react'

const UploadImagem = () => (
    <div className='container text-center bg-light border borde-muted rounded py-2' >
        <i className="image outline huge icon"></i>
        <div className="input-group">
            <div className="custom-file">
                <input type="file" className="custom-file-input" id="subirImagem" aria-describedby="uploadImage" />
                <label className="custom-file-label" htmlFor="subirImagem">Insira o logotipo da empresa</label>
            </div>
            <div className="input-group-append">
                <button className="btn-roxo" type="button" id="uploadImage">SALVAR</button>
            </div>
        </div>
    </div>
)

export default UploadImagem