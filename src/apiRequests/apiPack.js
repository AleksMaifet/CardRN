import axios from 'axios';
import {BASE_URLS} from 'src/apiRequests/urls';

const initial = axios.create({
  baseURL: `${BASE_URLS.CARDS}cards/pack/`,
});

export class apiPack {
  static getUserPacks(params) {
    return initial.get('', {params});
  }

  static setUserPack(name) {
    return initial.post('', {
      cardsPack: {
        name,
      },
    });
  }

  static updateUserPack(_id, name) {
    return initial.put('', {
      cardsPack: {
        _id,
        name,
      },
    });
  }

  static deleteUserPack(id) {
    return initial.delete('', {
      params: {
        id,
      },
    });
  }
}
