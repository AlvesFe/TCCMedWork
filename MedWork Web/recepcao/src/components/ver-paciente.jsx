import React, { Component } from 'react';
import cadastrarPaciente from '../main/api/cadastrarPaciente';
import UploadImagem from './template/upload-imagem'
import Menu from './template/menu'
import InputMask from 'react-input-mask';
import Image from '../images/default-Upload.png'
import AlterarSucesso from './template/AlterarSucesso'
import AlterarErro from './template/AlterarErro'
import getPaciente from '../main/api/getPaciente';
import { jsPDF } from 'jspdf/dist/jspdf.umd';
import Logo from '../images/logotipo.png';
export default class VerPaciente extends Component {

    constructor() {
        super()
        this.state = {
            nomePaciente: "",
            foto: "default.png",
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
        const cpf = localStorage.getItem('Cpf_Paciente');
        getPaciente(cpf).then(res => {
            this.setState({
                nomePaciente: res.nome,
                foto: res.foto,
                dataNascimento: res.dt_Nascimento.slice(0, -14),
                tipoSanguineo: res.tp_sanguineo,
                endereco: res.endereco,
                cpf: res.cpf,
                rg: res.rg,
                email: res.email,
                celular: res.celular,
                telefone: res.telefone,
                alteracaoSucesso: "d-none",
                alteracaoErro: "d-none",
                alergia: res.alergia
            })
            console.log(this.state);
        })
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
            e.preventDefault();
            const estado = this.state;
            let data = this.state.dataNascimento;
            data = Date.parse(data);
            data = new Date(data);
            data = ((data.getDate())) + "/" + ((data.getMonth() + 1)) + "/" + data.getFullYear();

            const img = new Image();
            img.src = '/api/uploads/paciente/' + estado.foto;
            
            const doc = new jsPDF('p');
            doc.addImage(Logo, 'png', 80, 0, 50, 50);
            doc.addImage(img, 'png', 150, 60, 50, 50);
            doc.text(70, 50, 'ATENDIMENTO MEDWORK');
            // doc.text(20, 70, 'Paciente: ' + this.state.nome);
            // doc.text(20, 80, 'CPF: ' + this.state.cpf);
            doc.text(20, 90, 'Nascimento: ' + data);
            // doc.text(20, 100, 'Alergias: ' + this.state.alergia);
            doc.save(`${this.state.nome}-atendimento-${Date.now()}`);
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
                            <div className='container text-center bg-light border borde-muted rounded py-2' >
                                <div className="py-2">
                                    <label htmlFor="image">
                                        <img width="240px" height="180px" className="rounded pointer" src={`/api/uploads/paciente/${this.state.foto}`} alt="" />
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 form-row">
                            <div className='form-group col-5 '>
                                <label htmlFor="nomePaciente" className='font-weight-bold mb-0'>Nome</label>
                                <input type="text" disabled={true} className="form-control form-control-sm" id="nomePaciente" placeholder='Nome' name="nomePaciente" value={this.state.nomePaciente} onChange={this.onChange} />
                            </div>
                            <div className='form-group col-3 '>
                                <label htmlFor="dataNascimento" className='font-weight-bold mb-0'>Data de nascimento</label>
                                <input disabled={true} className="form-control form form-control-sm" type='date' id="dataNascimento" placeholder='DD/MM/AAAA' name='dataNascimento' value={this.state.dataNascimento} onChange={this.onChange} />
                            </div>
                            <div className='form-group col-4 '>
                                <label htmlFor="tipoSanguineo" className='font-weight-bold mb-0'>Tipo sanguíneo</label>
                                <input disabled={true} type="text" className="form-control form-control-sm" id="tipoSanguineo" placeholder='O+' name='tipoSanguineo' value={this.state.tipoSanguineo} onChange={this.onChange} />
                            </div>
                            <div className='form-group col-6 '>
                                <label htmlFor="endereco" className='font-weight-bold mb-0'>Endereço</label>
                                <input disabled={true} type="text" className="form-control form-control-sm" id="endereco" placeholder='Ex: Avenida paulista, 2222, São Paulo - SP' name='endereco' value={this.state.endereco} onChange={this.onChange} />
                            </div>
                            <div className='form-group col-3 '>
                                <label htmlFor="cpf" className='font-weight-bold mb-0'>CPF</label>
                                <InputMask disabled={true} mask="999.999.999-99" className="form-control form-control-sm" id="cpf" placeholder='___.___.___-__' name='cpf' value={this.state.cpf} onChange={this.onChange} />
                            </div>
                            <div className='form-group col-3 '>
                                <label htmlFor="rg" className='font-weight-bold mb-0'>RG</label>
                                <InputMask disabled={true} mask="99.999.999-9" className="form-control form-control-sm" id="rg" placeholder='__.___.___-_' name='rg' value={this.state.rg} onChange={this.onChange} />
                            </div>
                            <div className='form-group col-6 '>
                                <label htmlFor="email" className='font-weight-bold mb-0'>E-mail</label>
                                <input disabled={true} type="text" className="form-control form-control-sm" id="email" placeholder='email@medwork.com' name='email' value={this.state.email} onChange={this.onChange} />
                            </div>
                            <div className='form-group col-3 '>
                                <label htmlFor="celular" className='font-weight-bold mb-0'>Celular</label>
                                <InputMask disabled={true} mask="(99) 99999-9999" className="form-control form-control-sm" id="celular" placeholder='(__) _____-____' name='celular' value={this.state.celular} onChange={this.onChange} />
                            </div>
                            <div className='form-group col-3 '>
                                <label htmlFor="telefone" className='font-weight-bold mb-0'>Telefone</label>
                                <InputMask disabled={true} mask="(99) 9999-9999" className="form-control form-control-sm" id="telefone" placeholder='(__) ____-____' name='telefone' value={this.state.telefone} onChange={this.onChange} />
                            </div>
                            <div className='form-group col-12 '>
                                <label htmlFor="alergia" className='font-weight-bold mb-0'>Alergia a medicamentos ou remédios</label>
                                <textarea disabled={true} className="form-control form-control-sm" id="alergia" placeholder='Ex: Nenhuma alergia' name='alergia' value={this.state.alergia} onChange={this.onChange} />
                            </div>
                        </div>
                        <div className='col-12 text-center '>
                            <button type='button' className='btn-roxo' onClick={this.onSubmit}>GERAR FICHA</button>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}