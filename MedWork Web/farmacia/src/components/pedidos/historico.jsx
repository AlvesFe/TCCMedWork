import React, { Component } from 'react'

export default class HistoricoPedidos extends Component {

    constructor() {
        super()
        this.state = {
            pendentes: "nav-link",
            confirmados: "nav-link",
            historico: "nav-link",
        }

        this.mudarAba = (e) => {
            e.preventDefault()
            switch (this.state) {
                case this.state.pendentes:
                    this.setState({
                        pendentes: "nav-link active",
                        confirmados: "nav-link",
                        historico: "nav-link",
                    })
                    break;
                case this.state.confirmados:
                    this.setState({
                        pendentes: "nav-link",
                        confirmados: "nav-link active",
                        historico: "nav-link",
                    })
                    break;
                case this.state.historico:
                    this.setState({
                        pendentes: "nav-link",
                        confirmados: "nav-link",
                        historico: "nav-link active",
                    })
                    break;

            }
        }
    }


    render() {

        return (
            <div>
                <h1>
                    LISTAR HISTÓRICO
                </h1>
            </div>
        )
    }

}