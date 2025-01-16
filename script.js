import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  vus: 100, // nombre d'utilisateurs virtuels
  duration: '30s', // durée du test
};

export default function () {
  http.get('https://ecomerce-61a72.web.app/');
  sleep(1);
}
