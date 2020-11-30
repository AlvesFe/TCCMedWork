import React, { Component } from 'react';
import InputMask from 'react-input-mask';
import cadastrarReceita from '../main/api/cadastrarReceita';
import getPaciente from '../main/api/getPaciente';
import getRemedio from '../main/api/getRemedio';
import Menu from './template/menu'

export default class Atendimento extends Component {

    constructor() {
        super()
        this.state = {
            cpf: "",
            codigoMedicamento: "",
            dosagem: "",
            quantidade: "",
            validade: "",
            orientacoes: "",
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
            getPaciente(this.state.cpf).then(response => {
                getRemedio(this.state.codigoMedicamento).then(result => {
                    cadastrarReceita(this.state, response, result).then(res => {
                        if (res) {
                            this.setState({
                                ...this.state,
                                cpf: "",
                                codigoMedicamento: "",
                                dosagem: "",
                                quantidade: "",
                                validade: "",
                                orientacoes: ""
                            })
                        }
                    });
                })
            })

        }
    }

    render() {

        return (
            <div className='row bg-white'>
                <Menu />
                <div className='container col-md-8 col-lg-9 pt-4 animate__animated animate__fadeIn animate__fast'>
                    <h2 className='text-center font-weight-light'>ATENDIMENTO</h2>

                    <div className='row justify-content-center'>
                        <div className="col-12 form-row">
                            <div className='form-group col-12 py-1'>
                                <label htmlFor="cpf" className='font-weight-bold mb-0'>CPF</label>
                                <InputMask mask="999.999.999-99" className="form-control form-control-sm" id="cpf" placeholder='xxx.xxx.xxx-xx' name='cpf' value={this.state.cpf} onChange={this.onChange} />
                            </div>
                            <div className='col-12'>
                                <hr />
                            </div>
                            <div className='form-group col-4 py-1'>
                                <label htmlFor="codigoMedicamento" className='font-weight-bold mb-0'>Codigo do medicamento</label>
                                <input type="text" className=" form-control form-control-sm" id="codigoMedicamento" placeholder='Codigo do medicamento' name="codigoMedicamento" value={this.state.codigoMedicamento} onChange={this.onChange} />
                            </div>
                            <div className='form-group col-3 py-1'>
                                <label htmlFor="dosagem" className='font-weight-bold mb-0'>Dosagem</label>
                                <input type="text" className="form-control form-control-sm" id="dosagem" placeholder='Ex: 100mg' name="dosagem" value={this.state.dosagem} onChange={this.onChange} />
                            </div>
                            <div className='form-group col-3 py-1'>
                                <label htmlFor="quantidade" className='font-weight-bold mb-0'>Quantidade</label>
                                <input type="text" className="form-control form-control-sm" id="quantidade" placeholder='3 caixas' name="quantidade" value={this.state.quantidade} onChange={this.onChange} />
                            </div>
                            <div className='form-group col-2 py-1'>
                                <label htmlFor="crm" className='font-weight-bold mb-0'>Validade</label>
                                <InputMask mask="99/99/9999" className="form-control form-control-sm" id="validade" placeholder='dd/mm/aaaa' name="validade" value={this.state.validade} onChange={this.onChange} />
                            </div>

                            <div className='form-group col-12 py-1'>
                                <label htmlFor="orientacoes" className='font-weight-bold mb-0'>Orientações</label>
                                <textarea className="form-control form-control-sm" id="orientacoes" rows='5' placeholder='Ex: tomar a cada 8 horas durante 3 dias' name='orientacoes' value={this.state.orientacoes} onChange={this.onChange} />
                            </div>

                        </div>
                        <div className='col-12 text-center py-2'>
                            <button className='btn-roxo' onClick={this.onSubmit} >GERAR PRESCRIÇÃO</button>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}