import axios from 'axios';

export const baseURL = 'https://test001.testnet.mobiliz.com.tr/interview';
axios.defaults.headers.common['Authorization'] = 'Basic Y2loYW55eXVrc2VsQGdtYWlsLmNvbToxMjM0NQ==';
// axios.defaults.headers.get['Content-Type'] ='application/x-www-form-urlencoded'

export default axios.create({baseURL});

export const URL = {
    vehicles: '/vehicles',
    models: '/models',
    modelsBrand: '/models/brand',
    locations: '/locations'
}