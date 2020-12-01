import React, { Component } from 'react';
import UploadImagem from '../template/upload-imagem'
import InputMask from 'react-input-mask';
import cadastrarFarmacia from '../../main/api/cadastrarFarmacia';
import patchHospital from '../../main/api/alterarHospital'
import getInformacoes from '../../main/api/getInformacoes';
import Menu from '../template/menu'
import Image from '../../images/default-Upload.png';
import AlterarSucesso from '../template/AlterarSucesso'
import AlterarErro from '../template/AlterarErro'
import Event from '../../event/Alerts';

export default class AlterarHospital extends Component {
    constructor() {
        let cnpj = localStorage.getItem('estabelecimento')
        getInformacoes(cnpj, 'hospital').then(res => {
            this.setState({
                id_Hospital: res.id_Hospital,
                nomeEmpresa: res.nome,
                image: {},
                foto: res.foto,
                cnpj: res.cnpj,
                endereco: res.endereco,
                telefone: res.telefone,
                email: res.email,
                ativo: res.ativo,
                senha: res.senha
            })
        })
        super()
        this.state = {
            nomeEmpresa: "",
            image: {},
            cnpj: "",
            endereco: "",
            telefone: "",
            taxa: "",
            detalhes: "",
            email: "",
            senhaProvisoria: "",
            alteracaoSucesso: "d-none",
            alteracaoErro: "d-none",
            foto: "default.png"
        }
        this.onChange = (e) => {
            const state = Object.assign({}, this.state)
            const campo = e.target.name
            state[campo] = e.target.value
            this.setState(state)
        }
        this.onSubmit = (e) => {
            e.preventDefault()
            patchHospital(this.state).then(res => {
                if (res) {
                    this.setState({
                        alteracaoSucesso: "col-12 animate__animated animate__fadeIn animate__fast",
                        alteracaoErro: "d-none"
                    })
                    Event("Sucesso Alteracao");
                } else {
                    this.setState({
                        alteracaoErro: "col-12 animate__animated animate__fadeIn animate__fast",
                        alteracaoSucesso: "d-none"
                    })
                }  
            })
        }
    }


    render() {
        return (
            <div className='row bg-white'>
                <Menu />
                <div className='container col-md-8 pt-4 col-lg-9 animate__animated animate__fadeIn animate__fast '>
                    <h2 className='text-center font-weight-light'>ALTERAR HOSPITAL</h2>
                    <div className='row justify-content-center py-3'>
                        <div className="col-10 py-2 form-row">
                            <div className={this.state.alteracaoSucesso}>
                                <AlterarSucesso />
                            </div>
                            <div className={this.state.alteracaoErro}>
                                <AlterarErro />
                            </div>
                            <div className='col-12 mb-1'>
                                <UploadImagem src={this.state.image.name ? URL.createObjectURL(this.state.image) : `/api/uploads/hospital/${this.state.foto}`} onChange={(event) => {
                                    this.setState({ image: event.target.files[0] });
                                }} />
                            </div>

                            <div className='form-group col-6 py-1'>
                                <label htmlFor="pesquisarEstabelecimento" className='font-weight-bold mb-0'>Nome da empresa</label>
                                <input type="text" className="form-control form-control-sm " id="pesquisarEstabelecimento" placeholder='Nome da empresa' name="nomeEmpresa" value={this.state.nomeEmpresa} onChange={this.onChange} />
                            </div>
                            <div className='form-group col-6 py-1'>
                                <label htmlFor="cnpj" className='font-weight-bold mb-0'>CNPJ</label>
                                <InputMask mask="99.999.999/9999-99" disabled={true} className="form-control form-control-sm " id="cnpj" placeholder='__.___.___/____-__' name='cnpj' value={this.state.cnpj} onChange={this.onChange} />
                            </div>

                            <div className='form-group col-5 py-1'>
                                <label htmlFor="endereco" className='font-weight-bold mb-0'>Endereço</label>
                                <input type="text" className="form-control form-control form-control-sm " id="endereco" placeholder='Ex: Avenida paulista, 2222, São Paulo - SP' name='endereco' value={this.state.endereco} onChange={this.onChange} />
                            </div>
                            <div className='form-group col-4 py-1'>
                                <label htmlFor="email" className='font-weight-bold mb-0'>E-mail</label>
                                <input type="text" disabled={true} className="form-control form-control form-control-sm" id="email" placeholder='email@medwork.com' name='email' value={this.state.email} onChange={this.onChange} />
                            </div>
                            <div className='form-group col-3 py-1'>
                                <label htmlFor="telefone" className='font-weight-bold mb-0'>Telefone</label>
                                <InputMask mask="(99) 9999-9999" className="form-control form-control form-control-sm " id="telefone" placeholder='(__) ____-____' name='telefone' value={this.state.telefone} onChange={this.onChange} />
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