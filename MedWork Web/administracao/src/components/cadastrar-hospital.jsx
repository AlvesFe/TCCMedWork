import React, { Component } from 'react';
import UploadImagem from './template/upload-imagem'
import InputMask from 'react-input-mask'

import cadastrarHospital from '../main/api/cadastrarHospital';
import Menu from './template/menu'

export default class CadastrarHospital extends Component {

    constructor() {
        super()
        this.state = {
            nomeEmpresa: "",
            cnpj: "",
            image: {},
            endereco: "",
            telefone: "",
            email: "",
            senhaProvisoria: "",
            confirmarSenha: ""
        }
        this.onChange = (e) => {
            const state = Object.assign({}, this.state)
            const campo = e.target.name
            state[campo] = e.target.value
            this.setState(state)
        }
        this.onSubmit = (e) => {
            e.preventDefault()
            cadastrarHospital(this.state).then(res => {
                console.log(res)
                if (res === true) {
                    this.setState({
                        nomeEmpresa: "",
                        cnpj: "",
                        image: {},
                        endereco: "",
                        telefone: "",
                        email: "",
                        senhaProvisoria: "",
                        confirmarSenha: ""
                    })
                }
            });


        }
    }


    render() {

        return (
            <div className='row bg-white'>
                <Menu />
                <div className='container col-md-8 pt-4 col-lg-9 animate__animated animate__fadeIn animate__fast '>
                    <h2 className='text-center font-weight-light'>CADASTRAR HOSPITAL</h2>
                    <div className='row justify-content-center py-3'>
                        <div className="col-10 py-2 form-row">
                            <div className='col-12 mb-1'>
                                <UploadImagem src={this.state.image.name ? URL.createObjectURL(this.state.image) : "http://localhost:3001/uploads/hospital/default.png"} onChange={(event) => {
                                    this.setState({ image: event.target.files[0] });
                                }} />
                            </div>

                            <div className='form-group col-6 py-1'>
                                <label htmlFor="pesquisarEstabelecimento" className='font-weight-bold mb-0'>Nome da empresa</label>
                                <input type="text" className="form-control form-control-sm " id="pesquisarEstabelecimento" placeholder='Nome da empresa' name="nomeEmpresa" value={this.state.nomeEmpresa} onChange={this.onChange} />
                            </div>
                            <div className='form-group col-6 py-1'>
                                <label htmlFor="cnpj" className='font-weight-bold mb-0'>CNPJ</label>
                                <InputMask mask="99.999.999/9999-99" className="form-control form-control-sm " id="cnpj" placeholder='xx.xxx.xxx/xxxx-xx' name='cnpj' value={this.state.cnpj} onChange={this.onChange} />
                            </div>

                            <div className='form-group col-8 py-1'>
                                <label htmlFor="endereco" className='font-weight-bold mb-0'>Endereço</label>
                                <input type="text" className="form-control form-control form-control-sm " id="endereco" placeholder='Ex: Avenida paulista, 2222, São Paulo - SP' name='endereco' value={this.state.endereco} onChange={this.onChange} />
                            </div>
                            <div className='form-group col-4 py-1'>
                                <label htmlFor="telefone" className='font-weight-bold mb-0'>Telefone</label>
                                <InputMask mask="(99) 9999-9999" className="form-control form-control form-control-sm " id="telefone" placeholder='(xx) xxxx-xxxx' name='telefone' value={this.state.telefone} onChange={this.onChange} />
                            </div>
                            <div className='form-group col-4 py-1'>
                                <label htmlFor="email" className='font-weight-bold mb-0'>E-mail</label>
                                <input type="text" className="form-control form-control form-control-sm" id="email" placeholder='email@medwork.com' name='email' value={this.state.email} onChange={this.onChange} />
                            </div>
                            <div className='form-group col-8 py-1'>
                                <label htmlFor="senhaProvisoria" className='font-weight-bold mb-0'>Senha provisória</label>
                                <input type="password" className="form-control form-control form-control-sm" id="senhaProvisoria" placeholder='••••••••••' name='senhaProvisoria' value={this.state.senhaProvisoria} onChange={this.onChange} />
                            </div>
                        </div>
                        <div className='col-12 text-center py-2'>
                            <button className='btn-roxo' onClick={this.onSubmit} >CADASTRAR</button>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}