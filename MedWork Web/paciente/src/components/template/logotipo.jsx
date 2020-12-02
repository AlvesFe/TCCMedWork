import React, {Component} from 'react';

import Logo from '../../images/logotipo.png'

class logotipo extends Component {
    render() {
        return (
            <div className='text-center m-0'>
                <img src={Logo} alt="Logotipo" width='270px'/>
            </div>
        );
    }
}

export default logotipo