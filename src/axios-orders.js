import axios from 'axios';
const instance=axios.create({
    baseURL: 'https://myburger-react-6c170.firebaseio.com/'

});
export default instance;