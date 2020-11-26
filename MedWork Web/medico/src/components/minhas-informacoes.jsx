import React, { Component } from 'react';
import patchUser from '../main/api/patchUser'
import InputMask from 'react-input-mask';
import UploadImagem from '../components/template/upload-imagem'
import Menu from './template/menu'

export default class MinhasInformacoes extends Component {

    constructor() {
        super()
        const stringData = localStorage.getItem('user_data')
        const userData = JSON.parse(stringData);
        console.log(userData);
        this.state = {
            id_Medico: userData.id_Medico,
            image: {},
            foto: userData.foto,
            nome: userData.nome,
            image: userData.foto,
            ativo: userData.ativo,
            crm: userData.crm,
            especiealidade: userData.especialidade,
            dataNascimento: userData.dt_Nascimento.slice(0, -14),
            tipoSanguineo: userData.tp_sanguineo,
            cpf: userData.cpf,
            rg: userData.rg,
            email: userData.email,
            celular: userData.celular,
            telefone: userData.telefone,
        }
        this.onChange = (e) => {
            const state = Object.assign({}, this.state)
            const campo = e.target.name
            state[campo] = e.target.value
            this.setState(state)
        }
        this.onSubmit = (e) => {
            e.preventDefault()
            patchUser(this.state);
        }
    }


    render() {

        return (
            <div className='row bg-white'>
                <Menu />
                <div className='container col-md-8 col-lg-9 pt-4 animate__animated animate__fadeIn animate__fast'>
                    <h2 className='text-center font-weight-light'>MINHAS INFORMAÇÕES</h2>

                    <div className='row justify-content-center py-3'>
                        <UploadImagem src={this.state.image.name ? URL.createObjectURL(this.state.image) : `http://localhost:3001/uploads/medico/${this.state.foto}`} onChange={(event) => {
                            this.setState({ image: event.target.files[0] });
                        }} />
                        <div className="col-12 py-2 form-row">
                            <div className='form-group col-6 py-1'>
                                <label htmlFor="nomeMedico" className='font-weight-bold mb-0'>Nome</label>
                                <input type="text" className="form-control form-control-lg" id="nomeMedico" placeholder='Nome' name="nome" value={this.state.nome} onChange={this.onChange} />
                            </div>
                            <div className='form-group col-2 py-1'>
                                <label htmlFor="crm" className='font-weight-bold mb-0'>CRM</label>
                                <input type="text" disabled={true} className="form-control form-control-lg" id="crm" placeholder='01.234-SP' name="crm" value={this.state.crm} onChange={this.onChange} />
                            </div>
                            <div className='form-group col-2 py-1'>
                                <label htmlFor="dataNascimento" className='font-weight-bold mb-0'>Nascimento</label>
                                <InputMask mask="99/99/9999" className="form-control form-control-lg" id="dataNascimento" placeholder='DD/MM/AAAA' name='dataNascimento' value={this.state.dataNascimento} onChange={this.onChange} />
                            </div>
                            <div className='form-group col-2 py-1'>
                                <label htmlFor="tipoSanguineo" className='font-weight-bold mb-0'>Tipo sanguíneo</label>
                                <input type="text" className="form-control form-control-lg" id="tipoSanguineo" placeholder='O+' name='tipoSanguineo' value={this.state.tipoSanguineo} onChange={this.onChange} />
                            </div>
                            <div className='form-group col-3 py-1'>
                                <label htmlFor="cpf" className='font-weight-bold mb-0'>CPF</label>
                                <InputMask mask="999.999.999-99" disabled={true} className="form-control form-control-lg" id="cpf" placeholder='xxx.xxx.xxx-xx' name='cpf' value={this.state.cpf} onChange={this.onChange} />
                            </div>
                            <div className='form-group col-3 py-1'>
                                <label htmlFor="especialidade" className='font-weight-bold mb-0'>Especialidade</label>
                                <input type="text" className="form-control form-control-lg" id="especiealidade" placeholder='Cirurgião' name='especiealidade' value={this.state.especiealidade} onChange={this.onChange} />
                            </div>
                            <div className='form-group col-3 py-1'>
                                <label htmlFor="rg" className='font-weight-bold mb-0'>RG</label>
                                <InputMask mask="99.999.999-9" disabled={true} className="form-control form-control-lg" id="rg" placeholder='xx.xxx.xxx-x' name='rg' value={this.state.rg} onChange={this.onChange} />
                            </div>
                            <div className='form-group col-3 py-1'>
                                <label htmlFor="ativo" className='font-weight-bold mb-0'>Ativo</label>
                                <input type="text" className="form-control form-control-lg" id="ativo" placeholder='1' name='ativo' value={this.state.ativo} onChange={this.onChange} />
                            </div>

                            <div className='form-group col-6 py-1'>
                                <label htmlFor="email" className='font-weight-bold mb-0'>E-mail</label>
                                <input type="text" disabled={true} className="form-control form-control-lg" id="email" placeholder='email@medwork.com' name='email' value={this.state.email} onChange={this.onChange} />
                            </div>
                            <div className='form-group col-3 py-1'>
                                <label htmlFor="celular" className='font-weight-bold mb-0'>Celular</label>
                                <InputMask mask="(99) 99999-9999" className="form-control form-control-lg" id="celular" placeholder='(xx) xxxxx-xxxx' name='celular' value={this.state.celular} onChange={this.onChange} />
                            </div>
                            <div className='form-group col-3 py-1'>
                                <label htmlFor="telefone" className='font-weight-bold mb-0'>Telefone</label>
                                <InputMask mask="(99) 9999-9999" className="form-control form-control-lg" id="telefone" placeholder='(xx) xxxx-xxxx' name='telefone' value={this.state.telefone} onChange={this.onChange} />
                            </div>
                        </div>
                        <div className='col-12 text-center py-2'>
                            <button className='btn-roxo' onClick={this.onSubmit} >SALVAR ALTERAÇÕES</button>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}