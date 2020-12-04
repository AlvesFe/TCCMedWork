import React, { Component } from 'react'
import Menu from './template/menu'
import Logotipo from '../images/logotipo.png'
import { jsPDF } from 'jspdf/dist/jspdf.umd';
import getDetalhesReceita from '../main/api/getDetalhesReceita'
import Logo from '../images/logotipo.png'

export default class VisualizarPrescricao extends Component {

    constructor() {

        super()
        this.state = {
            receita: {}
        }

        getDetalhes().then(res => {
            this.setState({
                receita: res
            })
        })
        
    }

    

    render() {
        return (
            <div className='row bg-white'>
                <Menu />
                <div className='container col-md-8 col-lg-9 animate__animated animate__fadeIn animate__fast '>
                    <div className='row justify-content-center'>

                        <div className='col-12'>
                            <h1 className='text-center font-weight-light py-4 '>PRESCRIÇÃO</h1>
                        </div>
                        <div className='border border-muted rounded col-8  py-3'>
                            <div className='text-center'>
                                <img src={Logotipo} alt="" width='150px' />
                            </div>
                            <div className='row'>
                                <div className='col-12 text-center py-3'>
                                    <p className='font-weight-bold'>INFORMAÇÕES DO PACIENTE</p>
                                </div>
                                <div className='col-6'>
                                    <p><b>PACIENTE: </b>{this.state.receita.Paciente}</p>
                                    <p><b>DATA DE NASCIMENTO: </b>{ConverterData(this.state.receita.dt_Nascimento)}</p>
                                </div>
                                <div className='col-6 text-right'>
                                    <p><b>CPF: </b>{cpfMask(`${this.state.receita.cpf}`)}</p>
                                    <p><b>ALERGIA: </b>{this.state.receita.alergia}</p>
                                </div>
                                <div className='col-12 py-3'>
                                    <p className='font-weight-bold text-center'>MEDICAMENTO</p>
                                </div>
                                <div className='col-6'>
                                    <p><b>MEDICAMENTO: </b>{this.state.receita.Remedio}</p>
                                    <p><b>DESCRIÇÃO: </b>{this.state.receita.descricao}</p>
                                </div>
                                <div className='col-6 text-right'>
                                    <p><b>TARJA: </b>{this.state.receita.tarja}</p>
                                    <p><b>PREÇO: </b>R${this.state.receita.preco}</p>
                                </div>
                                <div className='col-12 py-3'>
                                    <p className='font-weight-bold text-center'>MÉDICO</p>
                                </div>
                                <div className='col-6'>
                                    <p><b>MÉDICO: </b>{this.state.receita.Medico}</p>
                                    <p><b>CRM: </b>{this.state.receita.crm}</p>
                                </div>
                                <div className='col-6 text-right'>
                                    <p><b>ESPECIALIDADE: </b>{this.state.receita.especialidade}</p>
                                    <p><b>DATA DE NASCIMENTO: </b>{ConverterData(this.state.receita.dt_Medico)}</p>
                                </div>
                            </div>

                        </div>
                        <div className='col-12 pt-2 text-center'>
                            <a target="_Blank" href={this.state.receita.bula} className='btn-roxo'><i className="file alternate outline icon"></i> Acessar bula</a>
                            <button onClick={() => GerarPdf(this.state.receita)} className='btn-roxo mx-2'><i className="download icon"></i> Baixar prescrição</button>
                            <button onClick={() => BuscarRemedio(this.state.receita)} className='btn-roxo'><i className="search icon"></i> Buscar medicamento</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function ConverterData(data) {
    data = Date.parse(data);
    data = new Date(data);
    return ((data.getDate())) + "/" + ((data.getMonth() + 1)) + "/" + data.getFullYear();
}

function cpfMask(value){
    return value
        .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
        .replace(/(\d{3})(\d)/, '$1.$2') // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})/, '$1-$2')
        .replace(/(-\d{2})\d+?$/, '$1') // captura 2 numeros seguidos de um traço e não deixa ser digitado mais nada
}

function getDetalhes() {
    const id_Receita = localStorage.getItem('receita');
    return getDetalhesReceita(id_Receita).then(res => {
        return res.data[0]
    })
}

const GerarPdf = (Data) => {

    const stringData = localStorage.getItem('user_data')
    const userData = JSON.parse(stringData)
    let fotoPaciente = new Image();
    fotoPaciente.src = `/api/uploads/paciente/${Data.foto}`;

    const doc = new jsPDF('p');
    doc.addImage(Logo, 'png', 80, 0, 50, 50);
    doc.addImage(fotoPaciente, 'png', 150, 60, 50, 50);
    doc.text(90, 50, 'PACIENTE');
    doc.text(20, 70, 'Paciente: ' + Data.Paciente);
    doc.text(20, 80, 'CPF: ' + cpfMask(Data.cpf));
    doc.text(20, 90, 'Nascimento: ' + ConverterData(Data.dt_Nascimento));
    doc.text(20, 100, 'Alergias: ' + Data.alergia);
    doc.text(85, 120, 'MEDICAMENTO');
    doc.text(20, 140, 'Remédio: ' + Data.Remedio);
    doc.text(20, 150, 'Tarja: ' + Data.tarja);
    doc.text(20, 160, 'Descrição: ' + Data.descricao);
    doc.text(20, 170, 'Orientações: ' + Data.orientacoes);
    doc.text(95, 190, 'MEDICO');
    doc.text(20, 220, 'Medico: ' + Data.Medico);
    doc.text(20, 230, 'CRM: ' + Data.crm);
    doc.text(20, 240, 'Especialidade: ' + Data.especialidade);
    doc.text(20, 250, 'Data Nascimento: ' + ConverterData(Data.dt_Medico));
    doc.text(30, 270, '______________________  ______________________');
    doc.text(55, 280, 'Assinatura');
    doc.text(128, 280, 'Carimbo');
    doc.output('blob');
    doc.save(`${Data.Paciente}-Receita-${Date.now()}`);
}

function BuscarRemedio(item){
    localStorage.setItem('remedio', item.id_Remedio);
    window.location.assign('#/buscar-medicamento')
}