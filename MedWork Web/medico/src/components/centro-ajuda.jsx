import React from 'react';
import Menu from './template/menu'

export default props => (
    <div className='row bg-white'>
        <Menu />
        <div className='container col-md-8 col-lg-9 pt-4 animate__animated animate__fadeIn animate__fast'>
            <h2 className='text-center font-weight-light'>CENTRO DE AJUDA</h2>
            <div className='container'>
                <div className="accordion" id="accordionExample">
                    <div className="card">
                        <div className="" id="headingOne">
                            <h2 className="mb-0">
                                <button className="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                                    Sobre a MedWork
                            </button>
                            </h2>

                        </div>

                        <div id="collapseOne" className="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
                            <div className="card-body">
                                A MedWork é um facilitador de compras de remédios! Funciona assim: Seu médico te prescreve a receita, você a partir dessa receita escolhe a farmácia de sua escolha pelo aplicativo, e pode pedir para a farmácia entregar no seu endereço ou você pode ir lá retirá-los!
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div className="" id="headingTwo">
                            <h2 className="mb-0">
                                <button className="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                    Como usar a MedWork
                                </button>
                            </h2>
                        </div>
                        <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
                            <div className="card-body">
                                Acesse o site ou baixe o aplicativo, efetue o login utilizando o seu e-mail e senha cadastrados, você será direcionado para o seu painel, de lá clique nas suas últimas prescrições (ou histórico de prescrição se estiver utilizando o site), clique em buscar medicamento, escolha a farmácia de preferência, verifique o preço e a quantidade e escolha se deseja retirar e que seja entregue. Após isso é só esperar a entrega ou ir buscá-lo na farmácia de escolha!
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div className="" id="headingThree">
                            <h2 className="mb-0">
                                <button className="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                    Como entrar em contato
                                </button>
                            </h2>
                        </div>
                        <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
                            <div className="card-body">
                                Você pode nos enviar um e-mail pelo endereço "........" ou se quiser pode nos contatar pelas redes sociais ....
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div className="" id="headingFour">
                            <h2 className="mb-0">
                                <button className="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                                    Vantagens de usar MedWok
                                </button>
                            </h2>
                        </div>
                        <div id="collapseFour" className="collapse" aria-labelledby="headingFour" data-parent="#accordionExample">
                            <div className="card-body">
                                Com a MedWork você tem 3 grandes vantagens: A  primeira é saber o que está comprando, já que sua receita online exibe a bula do medicamento que você foi receitado, a segunda é poder escolher o melhor estabelecimento pelo preço, sem precisar de horas de busca, e a terceira é pode pedir o remédio no conforto da sua casa, sem precisar ir para drogaria toda vez que necessita de um remédio!                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div className="" id="headingFive">
                            <h2 className="mb-0">
                                <button className="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                                    Relação dos hospitais com as drogarias

                                </button>
                            </h2>
                        </div>
                        <div id="collapseFive" className="collapse" aria-labelledby="headingFive" data-parent="#accordionExample">
                            <div className="card-body">
                                Nenhum hospital tem relação direta com drogarias pela MedWork, nós tomamos o papel de mostrar os melhores estabelecimentos, e assim não há nenhuma chance de acontecerem os famosos “preços combinados”
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div className="" id="headingSix">
                            <h2 className="mb-0">
                                <button className="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapseSix" aria-expanded="false" aria-controls="collapseSix">
                                    Segurança e privacidade
                                </button>
                            </h2>
                        </div>
                        <div id="collapseSix" className="collapse" aria-labelledby="headingSix" data-parent="#accordionExample">
                            <div className="card-body">
                                Mussum Ipsum, cacilds vidis litro abertis. Interessantiss quisso pudia ce receita de bolis, mais bolis eu num gostis. Mais vale um bebadis conhecidiss, que um alcoolatra anonimis. Copo furadis é disculpa de bebadis, arcu quam euismod magna. Mauris nec dolor in eros commodo tempor. Aenean aliquam molestie leo, vitae iaculis nisl.                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
)

