import React, { Component } from 'react';
import cadastrarPaciente from '../main/api/cadastrarPaciente';
import UploadImagem from './template/upload-imagem'
import Menu from './template/menu'
import InputMask from 'react-input-mask';
import Image from '../images/default-Upload.png'
import AlterarSucesso from './template/AlterarSucesso'
import AlterarErro from './template/AlterarErro'


export default class VerPaciente extends Component {

    constructor() {
        super()
        this.state = {
            nomePaciente: "",
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
            alteracaoSucesso: "d-none",
            alteracaoErro: "d-none",
            alergia: ""
        }

        const cpfMask = value => {
            return value
                .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
                .replace(/(\d{3})(\d)/, '$1.$2') // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
                .replace(/(\d{3})(\d)/, '$1.$2')
                .replace(/(\d{3})(\d{1,2})/, '$1-$2')
                .replace(/(-\d{2})\d+?$/, '$1') // captura 2 numeros seguidos de um traço e não deixa ser digitado mais nada
        }
        this.onChange = (e) => {
            const state = Object.assign({}, this.state)
            const campo = e.target.name
            state[campo] = campo == "cpf" ? cpfMask(e.target.value) : e.target.value
            // this.setState({telefone: cpfMask(e.target.value)})
            this.setState(state)
        }
        this.onSubmit = (e) => {
            e.preventDefault()
            cadastrarPaciente(this.state).then(res => {
                if (res) {
                    this.setState({
                        nomePaciente: "",
                        foto: {},
                        dataNascimento: "",
                        tipoSanguineo: "",
                        endereco: "",
                        cpf: "",
                        rg: "",
                        email: "",
                        celular: "",
                        telefone: "",
                        senhaProvisoria: "",
                        alergia: ""
                    })
                }
            });  
        }
    }

    render() {

        return (
            <div className='row bg-white'>
                <Menu />
                <div className='container col-md-8 col-lg-9 pt-4 animate__animated animate__fadeIn animate__fast'>
                    <h2 className='text-center font-weight-light'>FICHA DO PACIENTE</h2>

                    <div className='row justify-content-center'>
                    <div className='col-12'>
                            <div className={this.state.alteracaoSucesso}>
                                <AlterarSucesso />
                            </div>
                            <div className={this.state.alteracaoErro}>
                                <AlterarErro />
                            </div>
                            <UploadImagem src={this.state.image.name ? URL.createObjectURL(this.state.image) : Image} onChange={(event) => {
                                this.setState({ image: event.target.files[0] });
                            }} />
                        </div>
                        <div className="col-12 form-row">
                            <div className='form-group col-5 '>
                                <label htmlFor="nomePaciente" className='font-weight-bold mb-0'>Nome</label>
                                <input type="text" className="form-control form-control-sm" id="nomePaciente" placeholder='Nome' name="nomePaciente" value={this.state.nomePaciente} onChange={this.onChange} />
                            </div>
                            <div className='form-group col-3 '>
                                <label htmlFor="dataNascimento" className='font-weight-bold mb-0'>Data de nascimento</label>
                                <input className="form-control form form-control-sm" type='date' id="dataNascimento" placeholder='DD/MM/AAAA' name='dataNascimento' value={this.state.dataNascimento} onChange={this.onChange} />
                            </div>
                            <div className='form-group col-4 '>
                                <label htmlFor="tipoSanguineo" className='font-weight-bold mb-0'>Tipo sanguíneo</label>
                                <input type="text" className="form-control form-control-sm" id="tipoSanguineo" placeholder='O+' name='tipoSanguineo' value={this.state.tipoSanguineo} onChange={this.onChange} />
                            </div>
                            <div className='form-group col-6 '>
                                <label htmlFor="endereco" className='font-weight-bold mb-0'>Endereço</label>
                                <input type="text" className="form-control form-control-sm" id="endereco" placeholder='Ex: Avenida paulista, 2222, São Paulo - SP' name='endereco' value={this.state.endereco} onChange={this.onChange} />
                            </div>
                            <div className='form-group col-3 '>
                                <label htmlFor="cpf" className='font-weight-bold mb-0'>CPF</label>
                                <InputMask mask="999.999.999-99" className="form-control form-control-sm" id="cpf" placeholder='___.___.___-__' name='cpf' value={this.state.cpf} onChange={this.onChange} />
                            </div>
                            <div className='form-group col-3 '>
                                <label htmlFor="rg" className='font-weight-bold mb-0'>RG</label>
                                <InputMask mask="99.999.999-9" className="form-control form-control-sm" id="rg" placeholder='__.___.___-_' name='rg' value={this.state.rg} onChange={this.onChange} />
                            </div>
                            <div className='form-group col-6 '>
                                <label htmlFor="email" className='font-weight-bold mb-0'>E-mail</label>
                                <input type="text" className="form-control form-control-sm" id="email" placeholder='email@medwork.com' name='email' value={this.state.email} onChange={this.onChange} />
                            </div>
                            <div className='form-group col-3 '>
                                <label htmlFor="celular" className='font-weight-bold mb-0'>Celular</label>
                                <InputMask mask="(99) 99999-99999" className="form-control form-control-sm" id="celular" placeholder='(__) _____-____' name='celular' value={this.state.celular} onChange={this.onChange} />
                            </div>
                            <div className='form-group col-3 '>
                                <label htmlFor="telefone" className='font-weight-bold mb-0'>Telefone</label>
                                <InputMask mask="(99) 9999-9999" className="form-control form-control-sm" id="telefone" placeholder='(__) ____-____' name='telefone' value={this.state.telefone} onChange={this.onChange} />
                            </div>
                            <div className='form-group col-12 '>
                                <label htmlFor="alergia" className='font-weight-bold mb-0'>Alergia a medicamentos ou remédios</label>
                                <textarea className="form-control form-control-sm" id="alergia" placeholder='Ex: Nenhuma alergia' name='alergia' value={this.state.alergia} onChange={this.onChange} />
                            </div>
                        </div>
                        <div className='col-12 text-center '>
                            <a className='btn-roxo' href='#/encaminhamento' >CONTINUAR</a>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}