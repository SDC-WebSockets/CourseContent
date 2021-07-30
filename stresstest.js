import http from 'k6/http';
import { check, group, sleep } from 'k6';

export let options = {
  stages: [
    // { duration: '1m', target: 60 } // rps = 1/s below normal load
    { duration: '1m', target: 600 } // rps = 10/s normal load
    // { duration: '1m', target: 6000 } // rps = 100/s breaking point
    // { duration: '10m', target: 0 } // scale down. Recovery stage
  ]
};

export default function() {
  const BASE_URL = 'http://localhost:9800';

  let responses = http.batch([
    [
      'GET',
      `${BASE_URL}/?courseId=1`,
      null,
      { tags: { name: 'PublicCrocs' }},
    ],
    [
      'GET',
      `${BASE_URL}/?courseId=1`,
      null,
      { tags: { name: 'PublicCrocs' }},
    ],
    [
      'GET',
      `${BASE_URL}/?courseId=10000`,
      null,
      { tags: { name: 'PublicCrocs' }},
    ],
    [
      'GET',
      `${BASE_URL}/?courseId=100000`,
      null,
      { tags: { name: 'PublicCrocs' }},
    ],
    [
      'GET',
      `${BASE_URL}/?courseId=1000000`,
      null,
      { tags: { name: 'PublicCrocs' }},
    ]
  ]);

  sleep(1);

}