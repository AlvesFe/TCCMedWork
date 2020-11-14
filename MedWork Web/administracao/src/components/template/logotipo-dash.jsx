import React, {Component} from 'react';

import Logo from '../../images/logotipo-dash.png'

class logotipo extends Component {
    render() {
        return (
            <div className='text-center'>
                <img src={Logo} alt="Logotipo" className='img-fluid' />
            </div>
        );
    }
}

export default logotipo