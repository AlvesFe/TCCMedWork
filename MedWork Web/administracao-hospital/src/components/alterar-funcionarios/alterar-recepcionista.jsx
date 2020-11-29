import React, { Component } from 'react';
import UploadImagem from '../template/upload-imagem'
import InputMask from 'react-input-mask';
import Menu from '../template/menu'
import Image from '../../images/default-Upload.png';
import AlteracaoSucesso from '../template/AlterarSucesso'
import AlteracaoErro from '../template/AlterarErro'
import getRecepcionista from '../../main/api/getRecepcionista'
import alterarRecepcionista from '../../main/api/alterarRecepcionista';
import Event from '../../event/Alerts';
export default class AlterarRecepcionista extends Component {
    constructor() {
        super()
        this.state = {
            nomeRecepcionista: "",
            image: {},
            foto: "",
            dataNascimento: "",
            tipoSanguineo: "",
            endereco: "",
            cpf: "",
            rg: "",
            email: "",
            celular: "",
            telefone: "",
            statusPerfil: "",
            alteracaoSucesso: "d-none",
            alteracaoErro: "d-none",
            foto:"default.png"
        }
        const cpf = localStorage.getItem('cpf');
        const data = {
            cpf
        }
        console.log(cpf);
        getRecepcionista(data).then(res => {
            console.log(res)
            this.setState({
                id_Recepcionista: res.id_Recepcionista,
                nomeRecepcionista: res.nome,
                foto: res.foto,
                dataNascimento: res.dt_Nascimento.slice(0, -14),
                tipoSanguineo: res.tp_sanguineo,
                endereco: res.endereco,
                cpf: res.cpf,
                senha: res.senha,
                rg: res.rg,
                email: res.email,
                celular: res.celular,
                telefone: res.telefone,
                statusPerfil: res.ativo,
            })
        })
        this.onChange = (e) => {
            const state = Object.assign({}, this.state)
            const campo = e.target.name
            state[campo] = e.target.value
            this.setState(state)
        }
        this.onSubmit = (e) => {
            e.preventDefault()
            alterarRecepcionista(this.state).then(res => {
                if (res) {
                    this.setState({
                        alteracaoSucesso: "col-12 animate__animated animate__fadeIn animate__fast",
                        alteracaoErro: "d-none"
                    })
                    Event("Sucesso Alteracao");
                } else {
                    this.setState({
                        alteracaoErro: "col-12 animate__animated animate__fadeIn animate__fast",
                        alteracaoSucesso: "d-none",
                    })
                    Event("Erro a Alterar")
                }
            })
            console.log(this.state)
            
        }
    }

    render() {
        return (
            <div className='row bg-white'>
                <Menu />
                <div className='container col-md-8 col-lg-9 pt-4 animate__animated animate__fadeIn animate__fast'>
                    <h2 className='text-center font-weight-light'>ALTERAR RECEPCIONISTA</h2>
                    <div className='row justify-content-center py-2'>
                        <div className="col-11 form-row">
                            <div className={this.state.alteracaoSucesso}>
                                <AlteracaoSucesso />
                            </div>
                            <div className={this.state.alteracaoErro}>
                                <AlteracaoErro />
                            </div>
                            <div className='col-12'>
                                <UploadImagem src={this.state.image.name ? URL.createObjectURL(this.state.image) : `/api/uploads/recepcionista/${this.state.foto}`} onChange={(event) => {
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
                                <div className='form-group col-2 py-1'>
                                    <label htmlFor="tipoSanguineo" className='font-weight-bold mb-0'>Tipo sanguíneo</label>
                                    <input type="text" className="form-control form-control-sm" id="tipoSanguineo" placeholder='O+' name='tipoSanguineo' value={this.state.tipoSanguineo} onChange={this.onChange} />
                                </div>
                                <div className='form-group col-2 py-1'>
                                    <label htmlFor="statusPerfil" className='font-weight-bold mb-0'>Status</label>
                                    <select className="form-control form-control-sm" name='statusPerfil' id="statusPerfil" value={this.state.statusPerfil} onChange={this.onChange}>
                                        <option value="1">Ativo</option>
                                        <option value="0">Inativo</option>
                                    </select>
                                </div>
                                <div className='form-group col-6 py-1'>
                                    <label htmlFor="endereco" className='font-weight-bold mb-0'>Endereço</label>
                                    <input type="text" className="form-control form-control-sm" id="endereco" placeholder='Ex: Avenida paulista, 2222, São Paulo - SP' name='endereco' value={this.state.endereco} onChange={this.onChange} />
                                </div>


                                <div className='form-group col-3 py-1'>
                                    <label htmlFor="cpf" className='font-weight-bold mb-0'>CPF</label>
                                    <InputMask mask="999.999.999-99" disabled={true} className="form-control form-control-sm" id="cpf" placeholder='___.___.___-__' name='cpf' value={this.state.cpf} onChange={this.onChange} />
                                </div>
                                <div className='form-group col-3 py-1'>
                                    <label htmlFor="rg" className='font-weight-bold mb-0'>RG</label>
                                    <InputMask mask="99.999.999-9" disabled={true} className="form-control form-control-sm" id="rg" placeholder='__.___.___-_' name='rg' value={this.state.rg} onChange={this.onChange} />
                                </div>

                                <div className='form-group col-6 py-1'>
                                    <label htmlFor="email" className='font-weight-bold mb-0'>E-mail</label>
                                    <input type="text" disabled={true} className="form-control form-control-sm" id="email" placeholder='email@medwork.com' name='email' value={this.state.email} onChange={this.onChange} />
                                </div>
                                <div className='form-group col-3 py-1'>
                                    <label htmlFor="celular" className='font-weight-bold mb-0'>Celular</label>
                                    <InputMask mask="(99) 99999-9999" className="form-control form-control-sm" id="celular" placeholder='(__) _____-____' name='celular' value={this.state.celular} onChange={this.onChange} />
                                </div>
                                <div className='form-group col-3 py-1'>
                                    <label htmlFor="telefone" className='font-weight-bold mb-0'>Telefone</label>
                                    <InputMask mask="(99) 9999-9999" className="form-control form-control-sm" id="telefone" placeholder='(__) ____-____' name='telefone' value={this.state.telefone} onChange={this.onChange} />
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className='text-center'>
                        <button className='btn-roxo' onClick={this.onSubmit}>SALVAR ALTERAÇÕES</button>
                    </div>
                </div>
            </div>
        )
    }
}