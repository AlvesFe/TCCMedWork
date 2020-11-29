import React, { Component } from 'react';
import Perfil from '../../images/default-user.jpg'


class ListarFuncionarios extends Component {

    render() {
        return (
            <div className="col-12 py-5">
                <div className="ui items">
                    <div className="item">
                        <a className="ui tiny image circle">
                            <img className="ui avatar image" src={Perfil} />
                        </a>
                        <div className="content">
                            <a className="header">Felipe Batista</a>
                            <div className="description">
                                <div className="ui label">
                                    <span className='mr-2'>
                                        <i className="user md icon"></i>
                                        Médico
                                    </span>
                                </div>
                                <div className="ui label">
                                    <span>
                                        <i className="address card icon"></i>
                                        CPF 123.456.789-10
                                    </span>
                                </div>
                                <div className="mt-1">
                                <i className="envelope outline icon"></i>
                                 E-mail nathan_rodrigu3s@outlook.com
                            </div>
                            </div>
                        </div>
                    </div>
                    <div className="item">
                        <a className="ui tiny image">
                            <img className="ui avatar image" src={Perfil} />
                        </a>
                        <div className="content">
                            <a className="header">Leonardo Lemos</a>
                            <div className="description">

                                {/* <div className="ui label"> */}
                                <span className='mr-2'>

                                    <i className="user icon"></i> Recepcionista
                                </span>
                                {/* </div> */}
                                {/* <div className="ui label"> */}
                                <span>
                                    <i className="address card icon"></i>
                                        CPF 123.456.789-10
                                    </span>
                                {/* </div> */}
                                <div className="mt-1">
                                    <i className="envelope outline icon"></i>
                                 E-mail nathan_rodrigu3s@outlook.com
                            </div>
                            </div>
                        </div>
                    </div>
                    <div className="item">
                        <a className="ui tiny image">
                            <img className="ui avatar image" src={Perfil} />
                        </a>
                        <div className="content">
                            <a className="header">Nathan Rodrigues</a>
                            <div className="description">
                                <div className="ui label">
                                    <span>
                                        <i className="user icon"></i> Recepcionista
                                </span>
                                </div>
                                <div className="ui label">
                                    <span>
                                        <i className="address card icon"></i>
                                        CPF 123.456.789-10
                                    </span>
                                </div>
                            </div>
                            <div className="mt-1">
                                <i className="envelope outline icon"></i>
                                 E-mail nathan_rodrigu3s@outlook.com
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default ListarFuncionarios