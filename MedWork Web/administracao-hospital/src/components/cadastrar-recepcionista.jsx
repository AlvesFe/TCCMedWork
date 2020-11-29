import React, { Component } from 'react';
import InputMask from 'react-input-mask';
import UploadImagem from '../components/template/upload-imagem'
import cadastrarRecepcionista from '../main/api/cadastrarRecepcionista';
import Image from  '../images/default-Upload.png'
import Menu from './template/menu'

export default class CadastrarDrogaria extends Component {

    constructor() {
        super()
        this.state = {
            nomeRecepcionista: "",
            image: {},
            dataNascimento: "",
            tipoSanguineo: "",
            endereco: "",
            cpf: "",
            rg: "",
            email: "",
            celular: "",
            telefone: "",
            senhaProvisoria: "",
            height: window.innerHeight
        }
        window.onresize = () =>{
            this.setState({
                ...this.state, height: window.innerHeight
            })
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
            cadastrarRecepcionista(this.state).then(res => {
                if (res) {
                    this.setState({
                        ...this.state,
                        nomeRecepcionista: "",
                        image: {},
                        dataNascimento: "",
                        tipoSanguineo: "",
                        endereco: "",
                        cpf: "",
                        rg: "",
                        email: "",
                        celular: "",
                        telefone: "",
                        senhaProvisoria: ""
                    })
                }
            });     
        }
    }


    render() {

        return (
            <div className='row bg-white'>
                <Menu />
                <div className='container col-md-8 col-lg-9 pt-4 animate__animated animate__fadeIn animate__fast overflow-auto' style={{height: this.state.height}}>
                    <h2 className='text-center font-weight-light'>CADASTRAR RECEPCIONISTA</h2>

                    <div className='row justify-content-center'>
                        <div className='col-12'>

                        <UploadImagem src={this.state.image.name ? URL.createObjectURL(this.state.image) : Image} onChange={(event) => {
                            this.setState({ image: event.target.files[0] });
                        }} />
                        </div>
                        <div className="col-12 form-row">
                            <div className='form-group col-5 py-1'>
                                <label htmlFor="nomeRecepcionista" className='font-weight-bold mb-0'>Nome</label>
                                <input type="text" className="form-control form-control-sm" id="nomeRecepcionista" placeholder='Nome' name="nomeRecepcionista" value={this.state.nomeRecepcionista} onChange={this.onChange} />
                            </div>
                            <div className='form-group col-3 py-1'>
                                <label htmlFor="dataNascimento" className='font-weight-bold mb-0'>Data de nascimento</label>
                                <input type='date' className="form-control form-control-sm" id="dataNascimento" placeholder='DD/MM/AAAA' name='dataNascimento' value={this.state.dataNascimento} onChange={this.onChange} />
                            </div>
                            <div className='form-group col-4 py-1'>
                                <label htmlFor="tipoSanguineo" className='font-weight-bold mb-0'>Tipo sanguíneo</label>
                                <input type="text" className="form-control form-control-sm" id="tipoSanguineo" placeholder='O+' name='tipoSanguineo' value={this.state.tipoSanguineo} onChange={this.onChange} />
                            </div>
                            <div className='form-group col-6 py-1'>
                                <label htmlFor="endereco" className='font-weight-bold mb-0'>Endereço</label>
                                <input type="text" className="form-control form-control-sm" id="endereco" placeholder='Ex: Avenida paulista, 2222, São Paulo - SP' name='endereco' value={this.state.endereco} onChange={this.onChange} />
                            </div>


                            <div className='form-group col-3 py-1'>
                                <label htmlFor="cpf" className='font-weight-bold mb-0'>CPF</label>
                                <InputMask mask="999.999.999-99" className="form-control form-control-sm" id="cpf" placeholder='___.___.___-__' name='cpf' value={this.state.cpf} onChange={this.onChange} />
                            </div>
                            <div className='form-group col-3 py-1'>
                                <label htmlFor="rg" className='font-weight-bold mb-0'>RG</label>
                                <InputMask mask="99.999.999-9" className="form-control form-control-sm" id="rg" placeholder='__.___.___-_' name='rg' value={this.state.rg} onChange={this.onChange} />
                            </div>

                            <div className='form-group col-5 py-1'>
                                <label htmlFor="email" className='font-weight-bold mb-0'>E-mail</label>
                                <input type="text" className="form-control form-control-sm" id="email" placeholder='email@medwork.com' name='email' value={this.state.email} onChange={this.onChange} />
                            </div>
                            <div className='form-group col-2 py-1'>
                                <label htmlFor="celular" className='font-weight-bold mb-0'>Celular</label>
                                <InputMask mask="(99) 99999-9999" className="form-control form-control-sm" id="celular" placeholder='(__) _____-____' name='celular' value={this.state.celular} onChange={this.onChange} />
                            </div>
                            <div className='form-group col-2 py-1'>
                                <label htmlFor="telefone" className='font-weight-bold mb-0'>Telefone</label>
                                <InputMask mask="(99) 9999-9999" className="form-control form-control-sm" id="telefone" placeholder='(__) ____-____' name='telefone' value={this.state.telefone} onChange={this.onChange} />
                            </div>
                            <div className='form-group col-3 py-1'>
                                <label htmlFor="senhaProvisoria" className='font-weight-bold mb-0'>Senha provisória</label>
                                <input type="password" className="form-control form-control-sm" id="senhaProvisoria" placeholder='••••••••••' name='senhaProvisoria' value={this.state.senhaProvisoria} onChange={this.onChange} />
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