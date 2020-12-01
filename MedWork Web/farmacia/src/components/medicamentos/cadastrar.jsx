import React, { Component } from 'react'
import cadastrarMedicamento from '../../main/api/cadastrarMedicamento'
import CadastroErro from '../template/CadastroErro'
import CadastroSucesso from '../template/CadastroSucesso'

export default class CadastrarMedicamento extends Component {

    constructor() {
        super()
        this.state = {
            codigoMedicamento: "",
            nomeMedicamento: "",
            tarjaMedicamento: "",
            codigoMedicamento: "",
            fabricanteMedicamento: "",
            validadeMedicamento: "",
            quantidadeMedicamento: "",
            precoMedicamento: "",
            descricaoMedicamento: "",
            cadastrarSucesso: "d-none",
            cadastrarErro: "d-none",
        }

        this.onChange = (e) => {
            const state = Object.assign({}, this.state)
            const campo = e.target.name
            state[campo] = e.target.value
            this.setState(state)
        }

        this.onSubmit = (e) => {
            e.preventDefault()
            console.log(this.state)
            cadastrarMedicamento(this.state).then(res => {
                console.log(res);
                if (res) {
                    this.setState({
                        cadastrarSucesso: "col-12 animate__animated animate__fadeIn animate__fast",
                        cadastrarErro: "d-none",
                        codigoMedicamento: "",
                        nomeMedicamento: "",
                        tarjaMedicamento: "",
                        codigoMedicamento: "",
                        fabricanteMedicamento: "",
                        validadeMedicamento: "",
                        quantidadeMedicamento: "",
                        precoMedicamento: "",
                        descricaoMedicamento: ""
                    })
                } else {
                    this.setState({
                        cadastrarErro: "col-12 animate__animated animate__fadeIn animate__fast",
                        cadastrarSucesso: "d-none"
                    })
                }
            })

        }

    }


    render() {

        return (
            <div className='row pt-3'>
                <div className="col-12">
                    <div className={this.state.cadastrarSucesso}>
                        <CadastroSucesso />
                    </div>
                    <div className={this.state.cadastrarErro}>
                        <CadastroErro />
                    </div>

                </div>
                <div className="form-group col-4">
                    <label htmlFor="codigoMedicamento" className='mb-0'>Código do medicamento</label>
                    <input type="text" className="form-control" id="codigoMedicamento" name='codigoMedicamento' placeholder="Ex: 001" value={this.state.codigoMedicamento} onChange={this.onChange} />
                </div>
                <div className="form-group col-4">
                    <label htmlFor="nomeMedicamento" className='mb-0'>Nome do medicamento</label>
                    <input type="text" className="form-control" id="nomeMedicamento" name='nomeMedicamento' placeholder="Ex: Diazepan" value={this.state.nomeMedicamento} onChange={this.onChange} />
                </div>
                <div className="form-group col-4">
                    <label htmlFor="tarjaMedicamento" className='mb-0'>Tarja do medicamento</label>
                    <select className="form-control" id="tarjaMedicamento" name="tarjaMedicamento" value={this.state.tarjaMedicamento} onChange={this.onChange}>
                        <option value="">Selecione</option>
                        <option value="preta">Preta</option>
                        <option value="amarela">Amarela</option>
                    </select>
                </div>
                <div className="form-group col-4">
                    <label htmlFor="fabricanteMedicamento" className='mb-0'>Fabricante</label>
                    <input type="text" className="form-control" id="fabricanteMedicamento" name='fabricanteMedicamento' placeholder='Ex: Eurofarma' value={this.state.fabricanteMedicamento} onChange={this.onChange} />
                </div>
                <div className="form-group col-4">
                    <label htmlFor="validadeMedicamento" className='mb-0'>Data de validade</label>
                    <input type="date" className="form-control" id="validadeMedicamento" name='validadeMedicamento' value={this.state.validadeMedicamento} onChange={this.onChange} />
                </div>
                <div className="form-group col-2">
                    <label htmlFor="quantidadeMedicamento" className='mb-0'>Quantidade</label>
                    <input type="text" className="form-control" id="quantidadeMedicamento" name='quantidadeMedicamento' placeholder='1' value={this.state.quantidadeMedicamento} onChange={this.onChange} />
                </div>
                <div className="form-group col-2">
                    <label htmlFor="precoMedicamento" className='mb-0'>Preço</label>
                    <input type="text" className="form-control" id="precoMedicamento" name='precoMedicamento' placeholder='R$__.__' value={this.state.precoMedicamento} onChange={this.onChange} />
                </div>
                <div className="form-group col-12">
                    <label htmlFor="descricaoMedicamento" className='mb-0'>Descrição do medicamento</label>
                    <textarea className="form-control" id="descricaoMedicamento" name="descricaoMedicamento" cols="30" rows="5" placeholder='Descreva para que o medicamento é usado.' value={this.state.descricaoMedicamento} onChange={this.onChange}  ></textarea>
                </div>

                <div className='text-center col-12'>

                    <button className='btn-roxo' onClick={this.onSubmit}>Cadastrar medicamento</button>

                </div>
            </div>
        )
    }

}