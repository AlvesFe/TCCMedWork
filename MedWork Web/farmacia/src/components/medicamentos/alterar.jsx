import React, { Component } from 'react'
import Menu from '../template/menu'
import Logotipo from '../../images/logotipo.png'
import PesquisarMedicamento from '../medicamentos/pesquisar'
import CadastrarMedicamento from '../medicamentos/cadastrar'
import ListarMedicamentos from '../medicamentos/listar-todos'
import AlterarErro from '../template/AlterarErro'
import AlterarSucesso from '../template/AlterarSucesso'
import Input from 'react-input-mask'
import getRemedio from '../../main/api/getRemedio'
import alterarRemedio from '../../main/api/alterarRemedio'
import deletarRemedio from '../../main/api/deltetarRemedio'

export default class AlterarMedicamento extends Component {

    constructor() {
        super()
        this.state = {
            alterarSucesso: "d-none",
            alterarErro: "d-none",
            codigoMedicamento: "",
            nomeMedicamento: "",
            tarjaMedicamento: "",
            fabricanteMedicamento: "",
            validadeMedicamento: "",
            quantidadeMedicamento: "",
            precoMedicamento: "",
            bula: "",
            descricaoMedicamento: ""
        }
        const data = {
            codigo: localStorage.getItem('codigo_med')
        }
        getRemedio(data).then(res => {
            this.setState({
                id_Remedio: res[0].id_Remedio,
                fk_id_Farmacia: res[0].fk_id_Farmacia,
                codigoMedicamento: res[0].codigo,
                nomeMedicamento: res[0].nome,
                id_Remedio_Farmacia: res[0].id_Remedio_Farmacia,
                tarjaMedicamento: res[0].tarja,
                fabricanteMedicamento: res[0].fabricante,
                validadeMedicamento: res[0].dt_Validade.slice(0, -14),
                quantidadeMedicamento: res[0].estoque,
                precoMedicamento: res[0].preco,
                bula: res[0].bula,
                descricaoMedicamento: res[0].descricao
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
            alterarRemedio(this.state).then(res => {
                if (res) {
                    this.setState({
                        alterarSucesso: "col-12 animate__animated animate__fadeIn animate__fast",
                        alterarErro: "d-none",
                    })
                } else {
                    this.setState({
                        alterarErro: "col-12 animate__animated animate__fadeIn animate__fast",
                        alterarSucesso: "d-none"
                    })
                }
            })
        }

        this.onDelete =  (e) => {
            e.preventDefault()
            deletarRemedio(this.state).then(res => {
            })
        }
    }


    render() {

        return (


            < div className='row bg-white' >
                <Menu />
                <div className='container col-md-8 col-lg-9'>
                    <h2 className='text-center pt-4 font-weight-light'>ALTERAR MEDICAMENTO</h2>
                    <div>
                        <ul className="nav nav-tabs">
                            <li className="nav-item">
                                <a className="nav-link " href="#/medicamentos" name='abaPesquisar' >Pesquisar</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link " href="#/cadastrar-medicamento" name='abaCadastrar' >Cadastrar</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" href="#/todos-os-medicamentos" name='abaCadastrar'>Ver todos os medicamentos</a>
                            </li>
                        </ul>
                    </div>
                    <div className='row pt-3 animate__animated animate__fadeIn animate__fast'>
                        <div className='col-12'>
                            <div >
                                <div className={this.state.alterarSucesso}>
                                    <AlterarSucesso />
                                </div>
                                <div className={this.state.alterarErro}>
                                    <AlterarErro />
                                </div>

                            </div>
                        </div>
                        <div className="form-group col-4">
                            <label htmlFor="codigoMedicamento" className='mb-0'>Código do medicamento</label>
                            <Input mask='9999' disabled={true} className="form-control" id="codigoMedicamento" name='codigoMedicamento' placeholder="Ex: 001" value={this.state.codigoMedicamento} onChange={this.onChange} />
                        </div>
                        <div className="form-group col-4">
                            <label htmlFor="nomeMedicamento" className='mb-0'>Nome do medicamento</label>
                            <input type="text" className="form-control" id="nomeMedicamento" name='nomeMedicamento' placeholder="Ex: Diazepan" value={this.state.nomeMedicamento} onChange={this.onChange} />
                        </div>
                        <div className="form-group col-4">
                            <label htmlFor="tarjaMedicamento" className='mb-0'>Tarja do medicamento</label>
                            <select className="form-control" id="tarjaMedicamento" name="tarjaMedicamento" value={this.state.tarjaMedicamento} onChange={this.onChange}>
                                <option value="PRETA">Preta</option>
                                <option value="AMARELA">Amarela</option>
                            </select>
                        </div>
                        <div className="form-group col-4">
                            <label htmlFor="fabricanteMedicamento" className='mb-0'>Fabricante</label>
                            <input type="text" className="form-control" id="fabricanteMedicamento" name='fabricanteMedicamento' placeholder='Ex: Eurofarma' value={this.state.fabricanteMedicamento} onChange={this.onChange} />
                        </div>
                        <div className="form-group col-4">
                            <label htmlFor="validadeMedicamento" className='mb-0'>Data de validade</label>
                            <input type="date" className="form-control" id="validadeMedicamento" name='validadeMedicamento' value={this.state.validadeMedicamento} onChange={this.onChange} />
                        </div>
                        <div className="form-group col-2">
                            <label htmlFor="quantidadeMedicamento" className='mb-0'>Quantidade</label>
                            <input type="text" className="form-control" id="quantidadeMedicamento" name='quantidadeMedicamento' placeholder='1' value={this.state.quantidadeMedicamento} onChange={this.onChange} />
                        </div>
                        <div className="form-group col-2">
                            <label htmlFor="precoMedicamento" className='mb-0'>Preço</label>
                            <Input mask='99.99' className="form-control" id="precoMedicamento" name='precoMedicamento' placeholder='R$__.__' value={this.state.precoMedicamento} onChange={this.onChange} />
                        </div>
                        <div className="form-group col-12">
                            <label htmlFor="bula" className='mb-0'>Link da Bula</label>
                            <input type="text" className="form-control" id="bula" name='bula' placeholder='http://link.com.br' value={this.state.bula} onChange={this.onChange} />
                        </div>
                        <div className="form-group col-12">
                            <label htmlFor="descricaoMedicamento" className='mb-0'>Descrição do medicamento</label>
                            <textarea className="form-control" id="descricaoMedicamento" name="descricaoMedicamento" cols="30" rows="5" placeholder='Descreva para que o medicamento é usado.' value={this.state.descricaoMedicamento} onChange={this.onChange}  ></textarea>
                        </div>

                        <div className='text-center col-12'>

                            <button className='btn btn-danger mr-2' onClick={this.onDelete}>DELETAR MEDICAMENTO</button>
                            <button className='btn-roxo' onClick={this.onSubmit}>SALVAR ALTERAÇÕES</button>

                        </div>
                    </div>

                </div>
            </div >


        )
    }

}