import React, {Component} from 'react';

import Logo from '../../images/logotipo.png'

class logotipo extends Component {
    render() {
        return (
            <div className='text-center'>
                <img src={Logo} alt="Logotipo" width='200px'/>
            </div>
        );
    }
}

export default logotipo