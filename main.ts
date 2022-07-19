import {fileURLToPath} from 'url';
import path from 'path';
import {encode} from 'cbor-x';
import fetch from 'node-fetch';

const headers = { 'content-type': 'application/json', authorization: 'Basic ' + Buffer.from('elastic:changeme').toString('base64') };

(async function main() {
  try {
    await fetch('http://localhost:9200/test1', {method: 'DELETE', headers });
    const res = await fetch('http://localhost:9200/test1', {method: 'PUT', headers, body: JSON.stringify({ mappings: { properties: { data: { type: 'binary'} } }}) });
    console.log('setup result', await res.json())
  } catch(e) {
    console.log('setup failed', e);
  }

  {
    // const body = encode({ data: 'yes' });
    const body = encode({ data: Buffer.from('yes') });
    const res = await fetch('http://localhost:9200/test1/_doc/1', {
      method: 'POST',
      headers: {
        ...headers,
        'content-type': 'application/cbor',
        'accept': 'application/json'
      },
      body
    });
    console.log('response', await res.json())
  }
})();