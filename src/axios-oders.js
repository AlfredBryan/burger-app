import axios  from 'axios';

const instance = axios.create({
    baseURL: 'https://react-bryan-burger-app.firebaseio.com/'

});

export default instance;