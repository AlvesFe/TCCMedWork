import React, { Component } from 'react';
import InputMask from 'react-input-mask';
import UploadImagem from './template/upload-imagem'
import Menu from './template/menu'
import AlterarSucesso from './template/AlterarSucesso'
import AlterarErro from './template/AlterarErro'
import alterarFarmacia from '../main/api/alterarFarmacia';

export default class MinhasInformacoes extends Component {

    constructor() {
        super()
        const json = localStorage.getItem('user_data');
        const user = JSON.parse(json);
        this.state = {
            id_Farmacia: user.id_Farmacia,
            image: {},
            cnpj: user.cnpj,
            foto: user.foto,
            nome: user.nome,
            ativo: user.ativo,
            endereco: user.endereco,
            detalhes: user.detalhes,
            email: user.email,
            senha: user.senha,
            telefone: user.telefone,
            taxa: user.taxa,
            alteracaoSucesso: "d-none",
            alteracaoErro: "d-none"
        }
        this.onChange = (e) => {
            const state = Object.assign({}, this.state)
            const campo = e.target.name
            state[campo] = e.target.value
            this.setState(state)
        }
        this.onSubmit = (e) => {
            e.preventDefault()
            alterarFarmacia(this.state).then(res => {
                if (res) {
                    this.setState({
                        alteracaoSucesso: "col-12 animate__animated animate__fadeIn animate__fast",
                        alteracaoErro: "d-none"
                    })
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
                <div className='container col-md-8 col-lg-9 pt-4 animate__animated animate__fadeIn animate__fast'>
                    <h2 className='text-center font-weight-light'>INFORMAÇÕES DA EMPRESA</h2>

                    <div className='row justify-content-center py-3'>
                        <div className="col-9 form-row">
                            <div className='col-12'>
                                <div className={this.state.alteracaoSucesso}>
                                    <AlterarSucesso />
                                </div>
                                <div className={this.state.alteracaoErro}>
                                    <AlterarErro />
                                </div>
                                <UploadImagem src={this.state.image.name ? URL.createObjectURL(this.state.image) : `http://localhost:3001/uploads/farmacia/${this.state.foto}`} onChange={(event) => {
                                    this.setState({ image: event.target.files[0] });
                                }} />
                            </div>
                            <div className='form-group col-4 '>
                                <label htmlFor="nomeMedico" className='font-weight-bold mb-0'>Nome</label>
                                <input type="text" className="form-control form-control-sm" id="nomeMedico" placeholder='Nome' name="nome" value={this.state.nome} onChange={this.onChange} />
                            </div>
                            <div className='form-group col-4 '>
                                <label htmlFor="cnpj" className='font-weight-bold mb-0'>CNPJ</label>
                                <InputMask mask="99.999.999/9999-99" disabled={true} className="form-control form-control-sm" id="cnpj" placeholder='__.___.___/_____-__' name='cnpj' value={this.state.cnpj} onChange={this.onChange} />
                            </div>
                            <div className='form-group col-4'>
                                <label htmlFor="email" className='font-weight-bold mb-0'>E-mail</label>
                                <input type="text" disabled={true} className="form-control form-control-sm" id="email" placeholder='email@medwork.com' name='email' value={this.state.email} onChange={this.onChange} />
                            </div>
                            <div className='form-group col-8 '>
                                <label htmlFor="endereco" className='font-weight-bold mb-0'>Endereço</label>
                                <input type="text" className="form-control form-control-sm" id="endereco" placeholder='Ex: R. Luiz Bortoloso' name="endereco" value={this.state.endereco} onChange={this.onChange} />
                            </div>
                            <div className='form-group col-2 '>
                                <label htmlFor="telefone" className='font-weight-bold mb-0'>Telefone</label>
                                <InputMask mask="(99) 9999-9999" className="form-control form-control-sm" id="telefone" placeholder='(xx) xxxx-xxxx' name='telefone' value={this.state.telefone} onChange={this.onChange} />
                            </div>
                            <div className='form-group col-2 '>
                                <label htmlFor="taxa" className='font-weight-bold mb-0'>Taxa</label>
                                <InputMask mask="99.99" className="form-control form-control-sm" id="taxa" placeholder='$12.50' name='taxa' value={this.state.taxa} onChange={this.onChange} />
                            </div>
                            <div className='form-group col-12 '>
                                <label htmlFor="detalhes" className='font-weight-bold mb-0'>Detalhes</label>
                                <textarea className="form-control form-control-sm" id="detalhes" rows={5} placeholder='Descrição' name='detalhes' value={this.state.detalhes} onChange={this.onChange} />
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