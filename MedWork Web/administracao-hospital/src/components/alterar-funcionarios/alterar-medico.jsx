import React, { Component } from 'react';
import UploadImagem from '../template/upload-imagem'
import InputMask from 'react-input-mask';
import Menu from '../template/menu'
import Image from '../../images/default-Upload.png';
import AlteracaoSucesso from '../template/AlterarSucesso'
import AlteracaoErro from '../template/AlterarErro'
import getMedico from '../../main/api/getMedico';
import alterarMedico from '../../main/api/alterarMedico';

export default class AlterarMedico extends Component {
    constructor() {
        super()
        this.state = {
            id_Medico: "",
            nomeMedico: "",
            image: {},
            dataNascimento: "",
            tipoSanguineo: "",
            status: "",
            crm: "",
            cpf: "",
            rg: "",
            especialidade: "",
            email: "",
            celular: "",
            telefone: "",
            alergia: "",
            alteracaoSucesso: "d-none",
            alteracaoErro: "d-none",
            foto:"default.png"
        }
        const crm = localStorage.getItem('crm');
        const data = {
            crm
        }
        getMedico(data).then(res => {
            this.setState({
                id_Medico: res.id_Medico,
                nomeMedico: res.nome,
                foto: res.foto,
                dataNascimento: res.dt_Nascimento,
                tipoSanguineo: res.tp_sanguineo,
                status: res.ativo,
                senha: res.senha,
                crm: res.crm,
                cpf: res.cpf,
                rg: res.rg,
                especialidade: res.especialidade,
                email: res.email,
                celular: res.celular,
                telefone: res.telefone,
            })
            console.log(this.state);
        })

        this.onChange = (e) => {
            const state = Object.assign({}, this.state)
            const campo = e.target.name
            state[campo] = e.target.value
            this.setState(state)
        }
        this.onSubmit = (e) => {
            e.preventDefault()
            alterarMedico(this.state).then(res => {
                if (res) {
                    this.setState({
                        alteracaoSucesso: "col-12 animate__animated animate__fadeIn animate__fast"
                    })
                } else {
                    this.setState({
                        alteracaoErro: "col-12 animate__animated animate__fadeIn animate__fast"
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
                    <h2 className='text-center font-weight-light'>ALTERAR MÉDICO</h2>
                    <div className='row justify-content-center py-2'>
                        <div className="col-11 form-row">
                            <div className={this.state.alteracaoSucesso}>
                                <AlteracaoSucesso />
                            </div>
                            <div className={this.state.alteracaoErro}>
                                <AlteracaoErro />
                            </div>
                            <div className='col-12'>
                                <UploadImagem src={this.state.image.name ? URL.createObjectURL(this.state.image) : `/api/uploads/medico/${this.state.foto}`} onChange={(event) => {
                                    this.setState({ image: event.target.files[0] });
                                }} />
                            </div>

                            <div className="col-12 form-row">
                                <div className='form-group col-5 pt-1'>
                                    <label htmlFor="nomeMedico" className='font-weight-bold mb-0'>Nome</label>
                                    <input type="text" className="form-control form-control-sm" id="nomeMedico" placeholder='Nome' name="nomeMedico" value={this.state.nomeMedico} onChange={this.onChange} />
                                </div>
                                <div className='form-group col-3 pt-1'>
                                    <label htmlFor="dataNascimento" className='font-weight-bold mb-0'>Data de nascimento</label>
                                    <InputMask mask="9999/99/99" className="form-control form-control-sm" id="dataNascimento" placeholder='____/__/__' name='dataNascimento' value={this.state.dataNascimento} onChange={this.onChange} />
                                </div>
                                <div className='form-group col-2 pt-1'>
                                    <label htmlFor="tipoSanguineo" className='font-weight-bold mb-0'>Tp sanguíneo</label>
                                    <input type="text" className="form-control form-control-sm" id="tipoSanguineo" placeholder='O+' name='tipoSanguineo' value={this.state.tipoSanguineo} onChange={this.onChange} />
                                </div>
                                <div className='form-group col-2 pt-1'>
                                    <label htmlFor="crm" className='font-weight-bold mb-0'>CRM</label>
                                    <input type="text" disabled={true} className="form-control form-control-sm" id="crm" placeholder='__.___-__' name='crm' value={this.state.crm} onChange={this.onChange} />
                                </div>
                                <div className='form-group col-6 '>
                                    <label htmlFor="cpf" className='font-weight-bold mb-0'>CPF</label>
                                    <InputMask mask="999.999.999-99" disabled={true} className="form-control form-control-sm" id="cpf" placeholder='___.___.___-__' name='cpf' value={this.state.cpf} onChange={this.onChange} />
                                </div>
                                <div className='form-group col-6 '>
                                    <label htmlFor="rg" className='font-weight-bold mb-0'>RG</label>
                                    <InputMask mask="99.999.999-9" disabled={true} className="form-control form-control-sm" id="rg" placeholder='__.___.___-_' name='rg' value={this.state.rg} onChange={this.onChange} />
                                </div>

                                <div className='form-group col-3'>
                                    <label htmlFor="especialidade" className='font-weight-bold mb-0'>Especialidade</label>
                                    <input type="text"  className="form-control form-control-sm" id="especialidade" placeholder='Ex: Clínico geral' name='especialidade' value={this.state.especialidade} onChange={this.onChange} />
                                </div>
                                <div className='form-group col-3 pt-1'>
                                    <label htmlFor="email" className='font-weight-bold mb-0'>E-mail</label>
                                    <input type="text" disabled={true} className="form-control form-control-sm" id="email" placeholder='email@medwork.com' name='email' value={this.state.email} onChange={this.onChange} />
                                </div>
                                <div className='form-group col-3 pt-1'>
                                    <label htmlFor="celular" className='font-weight-bold mb-0'>Celular</label>
                                    <InputMask mask="(99) 99999-9999" className="form-control form-control-sm" id="celular" placeholder='(__) _____-____' name='celular' value={this.state.celular} onChange={this.onChange} />
                                </div>
                                <div className='form-group col-3 pt-1'>
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