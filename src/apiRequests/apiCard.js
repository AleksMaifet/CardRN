import axios from 'axios';
import {BASE_URLS} from 'src/apiRequests/urls';

const initial = axios.create({
  baseURL: `${BASE_URLS.CARDS}cards/card/`,
});

export class apiCard {
  static getUserCards(params) {
    return initial.get('', {
      params,
    });
  }

  static setUserCard(card) {
    return initial.post('', {
      card,
    });
  }

  static updateUserCard(card) {
    return initial.put('', {card});
  }

  static deleteUserCard(id) {
    return initial.delete('', {
      params: {
        id,
      },
    });
  }
}
