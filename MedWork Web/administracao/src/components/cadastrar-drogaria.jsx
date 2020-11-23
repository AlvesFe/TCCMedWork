import React, { Component } from 'react';
import UploadImagem from './template/upload-imagem'
import cadastrarFarmacia from '../main/api/cadastrarFarmacia';
import Menu from './template/menu'

export default class CadastrarDrogaria extends Component {
    constructor() {
        super()
        this.state = {
            nomeEmpresa: "",
            image: {},
            cnpj: "",
            endereco: "",
            telefone: "",
            detalhes: "",
            email: "",
            senhaProvisoria: ""
        }
        this.onChange = (e) => {
            const state = Object.assign({}, this.state)
            const campo = e.target.name
            state[campo] = e.target.value
            this.setState(state)
        }
        this.onSubmit = (e) => {
            e.preventDefault()
            //console.log(this.state)
            const result = cadastrarFarmacia(this.state);
            if (result) {
                this.setState({
                    nomeEmpresa: "",
                    image: {},
                    cnpj: "",
                    endereco: "",
                    telefone: "",
                    detalhes: "",
                    email: "",
                    senhaProvisoria: ""
                })
            }
        }
    }


    render() {
        return (
            <div className='row bg-white'>
                <Menu />
                <div className='container col-md-8 col-lg-9 pt-4 animate__animated animate__fadeIn animate__fast'>
                    <h2 className='text-center font-weight-light'>CADASTRAR DROGARIA</h2>
                    <div className='row justify-content-center py-3'>
                        <div className="col-10 py-3 form-row">
                            <div className='col-12'>
                                <UploadImagem />
                            </div>
                            <div className='form-group col-6 py-1'>
                                <label htmlFor="pesquisarEstabelecimento" className='font-weight-bold mb-0'>Nome da empresa</label>
                                <input type="text" className="form-control form-control-lg" id="pesquisarEstabelecimento" placeholder='Nome' name="nomeEmpresa" value={this.state.nomeEmpresa} onChange={this.onChange} />
                            </div>
                            <div className='form-group col-6 py-1'>
                                <label htmlFor="cnpj" className='font-weight-bold mb-0'>CNPJ</label>
                                <input type="text" className="form-control form-control-lg" id="cnpj" placeholder='xx.xxx.xxx/xxxx-xx' name="cnpj" value={this.state.cnpj} onChange={this.onChange} />
                            </div>
                            <div className='form-group col-8 py-1'>
                                <label htmlFor="endereco" className='font-weight-bold mb-0'>Endereço</label>
                                <input type="text" className="form-control form-control-lg" id="endereco" placeholder='Ex: Avenida paulista, 2222, São Paulo - SP' name='endereco' value={this.state.endereco} onChange={this.onChange} />
                            </div>
                            <div className='form-group col-4 py-1'>
                                <label htmlFor="telefone" className='font-weight-bold mb-0'>Telefone</label>
                                <input type="text" className="form-control form-control-lg" id="telefone" placeholder='(xx) xxxx-xxxx' name='telefone' value={this.state.telefone} onChange={this.onChange} />
                            </div>
                            <div className='form-group col-12 py-1'>
                                <label htmlFor="detalhes" className='font-weight-bold mb-0'>Detalhes</label>
                                <textarea type="text" className="form-control form-control-lg" id="detalhes" placeholder='Nenhum detalhe' name='detalhes' value={this.state.detalhes} onChange={this.onChange} />
                            </div>
                            <div className='form-group col-6 py-1'>
                                <label htmlFor="email" className='font-weight-bold mb-0'>E-mail</label>
                                <input type="text" className="form-control form-control-lg" id="email" placeholder='email@medwork.com' name='email' value={this.state.email} onChange={this.onChange} />
                            </div>
                            <div className='form-group col-6 py-1'>
                                <label htmlFor="senhaProvisoria" className='font-weight-bold mb-0'>Senha provisória</label>
                                <input type="password" className="form-control form-control-lg" id="senhaProvisoria" placeholder='••••••••••' name='senhaProvisoria' value={this.state.senhaProvisoria} onChange={this.onChange} />
                            </div>

                        </div>
                    </div>
                    <div className='text-center py-1'>
                        <button className='btn-roxo' onClick={this.onSubmit}>CADASTRAR</button>
                    </div>
                </div>
            </div>
        )
    }
}