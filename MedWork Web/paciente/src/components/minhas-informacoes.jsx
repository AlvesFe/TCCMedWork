import React, { Component } from 'react';
import Menu from './template/menu'
import UploadImagem from '../components/template/upload-imagem'
import InputMask from 'react-input-mask';
import AlterarSucesso from './template/AlterarSucesso'
import AlterarErro from './template/AlterarErro'
import alterarPaciente from '../main/api/alterarPaciente'
import desativarPaciente from '../main/api/desativarPaciente';


export default class MinhasInformacoes extends Component {

    constructor() {
        super()
        const stringuser = localStorage.getItem('user_data')
        const user = JSON.parse(stringuser);
        console.log(user);
        this.state = {
            nomePaciente: user.nome,
            image: {},
            foto: user.foto,
            dataNascimento: user.dt_Nascimento.slice(0, -14),
            tipoSanguineo: user.tp_sanguineo,
            endereco: user.endereco,
            cpf: user.cpf,
            ativo: user.ativo,
            senha: user.senha,
            alt_senha: user.alt_senha,
            rg: user.rg,
            email: user.email,
            celular: user.celular,
            telefone: user.telefone,
            alteracaoSucesso: "d-none",
            alteracaoErro: "d-none",
            alergia: user.alergia
        }
        this.onChange = (e) => {
            const state = Object.assign({}, this.state)
            const campo = e.target.name
            state[campo] = e.target.value
            // this.setState({telefone: cpfMask(e.target.value)})
            this.setState(state)
        }
        this.onSubmit = (e) => {
            e.preventDefault()

            alterarPaciente(this.state).then(res => {
                console.log(res);
            })

        }
        this.onDelete = (e) => {
            e.preventDefault()
            desativarPaciente(user.id_Paciente)
        }
    }



    render() {
        return (
            <div className='row bg-white'>
                <Menu />
                <div className='container col-md-8 col-lg-9 pt-4 animate__animated animate__fadeIn animate__fast'>
                    <h1 className='text-center font-weight-light'>MINHAS INFORMAÇÕES</h1>
                    <div>

                        <div className='row justify-content-center'>
                            <div className='col-10  form-row'>
                                <div className={this.state.alteracaoSucesso}>
                                    <AlterarSucesso />
                                </div>
                                <div className={this.state.alteracaoErro}>
                                    <AlterarErro />
                                </div>
                                <UploadImagem src={this.state.image.name ? URL.createObjectURL(this.state.image) : "/api/uploads/paciente/" + this.state.foto} onChange={(event) => {
                                    this.setState({ image: event.target.files[0] });
                                }} />

                                <div className='form-group col-8 '>
                                    <label htmlFor="nomePaciente" className='font-weight-bold mb-0'>Nome</label>
                                    <input type="text" className="form-control form-control-sm" id="nomePaciente" placeholder='Nome' name="nomePaciente" value={this.state.nomePaciente} onChange={this.onChange} />
                                </div>
                                <div className='form-group col-2 '>
                                    <label htmlFor="dataNascimento" className='font-weight-bold mb-0'>Data de nascimento</label>
                                    <input disabled={true} className="form-control form form-control-sm" type='date' id="dataNascimento" placeholder='DD/MM/AAAA' name='dataNascimento' value={this.state.dataNascimento} onChange={this.onChange} />
                                </div>
                                <div className='form-group col-2 '>
                                    <label htmlFor="tipoSanguineo" className='font-weight-bold mb-0'>Tipo sanguíneo</label>
                                    <input disabled={true} type="text" className="form-control form-control-sm" id="tipoSanguineo" placeholder='O+' name='tipoSanguineo' value={this.state.tipoSanguineo} onChange={this.onChange} />
                                </div>
                                <div className='form-group col-8 '>
                                    <label htmlFor="endereco" className='font-weight-bold mb-0'>Endereço</label>
                                    <input type="text" className="form-control form-control-sm" id="endereco" placeholder='Ex: Avenida paulista, 2222, São Paulo - SP' name='endereco' value={this.state.endereco} onChange={this.onChange} />
                                </div>
                                <div className='form-group col-2 '>
                                    <label htmlFor="cpf" className='font-weight-bold mb-0'>CPF</label>
                                    <InputMask disabled={true} mask="999.999.999-99" className="form-control form-control-sm" id="cpf" placeholder='___.___.___-__' name='cpf' value={this.state.cpf} onChange={this.onChange} />
                                </div>
                                <div className='form-group col-2 '>
                                    <label htmlFor="rg" className='font-weight-bold mb-0'>RG</label>
                                    <InputMask disabled={true} mask="99.999.999-9" className="form-control form-control-sm" id="rg" placeholder='__.___.___-_' name='rg' value={this.state.rg} onChange={this.onChange} />
                                </div>
                                <div className='form-group col-8 '>
                                    <label htmlFor="email" className='font-weight-bold mb-0'>E-mail</label>
                                    <input disabled={true} type="text" className="form-control form-control-sm" id="email" placeholder='email@medwork.com' name='email' value={this.state.email} onChange={this.onChange} />
                                </div>
                                <div className='form-group col-2 '>
                                    <label htmlFor="celular" className='font-weight-bold mb-0'>Celular</label>
                                    <InputMask mask="(99) 99999-9999" className="form-control form-control-sm" id="celular" placeholder='(__) _____-____' name='celular' value={this.state.celular} onChange={this.onChange} />
                                </div>
                                <div className='form-group col-2 '>
                                    <label htmlFor="telefone" className='font-weight-bold mb-0'>Telefone</label>
                                    <InputMask mask="(99) 9999-9999" className="form-control form-control-sm" id="telefone" placeholder='(__) ____-____' name='telefone' value={this.state.telefone} onChange={this.onChange} />
                                </div>
                                <div className='form-group col-12 '>
                                    <label htmlFor="alergia" className='font-weight-bold mb-0'>Alergia a medicamentos ou remédios</label>
                                    <textarea className="form-control form-control-sm" id="alergia" rows="2" placeholder='Ex: Nenhuma alergia' name='alergia' value={this.state.alergia} onChange={this.onChange} />
                                </div>
                            </div>
                            <div className='col-12 text-center '>
                                <button className='btn btn-danger mr-2' onClick={this.onDelete} >DESATIVAR PERFIL</button>
                                <button className='btn-roxo' onClick={this.onSubmit} >SALVAR ALTERAÇÕES</button>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        )
    }


}