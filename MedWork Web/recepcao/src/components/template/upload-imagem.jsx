import React from 'react'

const UploadImagem = ({ onChange, src }) => (
    <div className='container text-center bg-light border borde-muted rounded py-2' >
        <div className="py-2">
            <label htmlFor="image">
                <img width="240px" height="130px" className="rounded pointer" src={src} alt="" />
            </label>
        </div>
        <div className="input-group">
            <div className="custom-file">
                <input type="file" className="custom-file-input pointer" id="image" onChange={onChange} aria-describedby="uploadImage" />
                <label className="custom-file-label" htmlFor="image">Selecione uma Imagem!</label>
            </div>
        </div>
    </div>
)

export default UploadImagem