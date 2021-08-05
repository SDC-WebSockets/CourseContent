// K6 SERVICE STRESS TESTING
import http from 'k6/http';
import { check, group, sleep } from 'k6';

export let options = {
  vus: 600,
  duration: '30s'
};

export default function() {
  const BASE_URL = 'http://localhost:9800';
  const before = new Date().getTime();
  const T = 6;

  for (let i = 0; i < 10; i++) {
    http.get(`${BASE_URL}/?courseId=${Math.floor(Math.random() * 1000000)}`);
  }

  const after = new Date().getTime();
  const diff = (after - before) / 1000;
  const remainder = T - diff;
  if (remainder > 0) {
    sleep(remainder);
  } else {
    console.warn(`Timer exhausted! The execution time of the test took longer than ${T} seconds.`);
  }
}