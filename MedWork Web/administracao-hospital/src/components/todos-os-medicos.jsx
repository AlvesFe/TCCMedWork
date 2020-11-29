import React, {useEffect, useState} from 'react'
import getAllMedicos from '../main/api/getAllMedicos';
import Menu from './template/menu'

export default props => {
    const [medicos, setMedcios] = useState([]);
    useEffect(() => {
        getAllMedicos().then(res => {
            setMedcios(res);
        });
    }, [])

    useEffect(() => {
        medicos ? console.log(medicos): null
    },[medicos])
    return (
        <div className='row bg-white'>
            <Menu />
            <div className='container col-md-8 col-lg-9 pt-4 animate__animated animate__fadeIn animate__fast'>
                <h2 className='text-center font-weight-light'>TODOS OS MÉDICOS</h2>
                <div>
                    {/* {console.log(medicos)} */}
                </div>

            </div>
        </div>
    );
}

