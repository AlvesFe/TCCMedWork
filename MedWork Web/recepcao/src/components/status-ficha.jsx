import React, { Component } from 'react';
import Menu from './template/menu'
import FichaSucesso from './template/FichaSucesso'
import FichaErro from './template/FichaErro'
import { jsPDF } from 'jspdf/dist/jspdf.umd';

import Logo from '../images/logotipo.png';
import Event from '../event/Alerts';
export default class StatusFicha extends Component {

    constructor(props) {
        super(props)
        this.state = {
            fichaSucesso: "col-12 animate__animated animate__fadeIn animate__fast animate__delay-1s",
            fichaErro: "d-none"
        }

        this.onSubmit = (e) => {
            e.preventDefault();

            const dadosStf = localStorage.getItem('ficha_data')
            const dados = JSON.parse(dadosStf)          

            let data = dados.dataNascimento;
            data = Date.parse(data);
            data = new Date(data);
            data = ((data.getDate())) + "/" + ((data.getMonth() + 1)) + "/" + data.getFullYear();

            let fotoPaciente = new Image();
            fotoPaciente.src = `/api/uploads/paciente/${dados.foto}`;
            
            const doc = new jsPDF('p');
            doc.addImage(Logo, 'png', 80, 0, 50, 50);
            doc.addImage(fotoPaciente, 'png', 150, 60, 50, 50);
            doc.text(70, 50, 'ATENDIMENTO MEDWORK');
            doc.text(20, 70, 'Paciente: ' + dados.nomePaciente);
            doc.text(20, 80, 'CPF: ' + dados.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4"));
            doc.text(20, 90, 'Nascimento: ' + data);
            doc.text(20, 100, 'Alergias: ' + dados.alergia);
            doc.save(`${dados.nomePaciente}-atendimento-${Date.now()}`);
            Event("Ficha Gerada");
        }
    }

    render() {
        return (
            <div className='row bg-white'>
                <Menu />
                <div className='container col-md-8 col-lg-9 pt-4 animate__animated animate__fadeIn animate__fast'>
                    <h2 className='text-center font-weight-light'>FINALIZAÇÃO DE ATENDIMENTO</h2>
                    <div className='row justify-content-center py-5'>
                        <div className='col-12 '>
                            <div className={this.state.fichaSucesso}>
                                <FichaSucesso />
                            </div>
                            <div className={this.state.fichaErro}>
                                <FichaErro />
                            </div>
                            <div className='col-12 text-center py-5'>
                                <a href='#/pesquisar-paciente' className='btn-roxo mr-2' onClick={this.onSubmit}>BAIXAR FICHA</a>
                                <a href='#/pesquisar-paciente' className='btn-roxo'>FINALIZAR ATENDIMENTO</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}