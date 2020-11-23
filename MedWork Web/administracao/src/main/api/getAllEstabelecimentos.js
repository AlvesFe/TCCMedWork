import Axios from 'axios'
import getFarmacias from './getFarmacias';
import getHospital from './getHospital';
import variables from "./variables";

const env = variables()
const { API_URL } = env

export default function getAllEstabelecimentos() {

    const token = localStorage.getItem('current_user')


    return getHospital().then(hosp => {
        return getFarmacias().then(farm => {
            const farmacia = farm
            const hospital = hosp
            const Estabelecimentos = {
                farmacia,
                hospital
            }
            return Estabelecimentos
        })
    })
}