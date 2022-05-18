import axios from 'axios';
import {BASE_URLS} from 'src/apiRequests/urls';
const initial = axios.create({
  baseURL: `${BASE_URLS.CARDS}auth/`,
});

export class apiAuthorization {
  static setLoginUser(values) {
    return initial.post('login', values);
  }
  static registerUser(values) {
    return initial.post('register', values);
  }
  static updateUserParam(param) {
    return initial.put('me', param);
  }
  static logOutUser() {
    return initial.delete('me');
  }
}
