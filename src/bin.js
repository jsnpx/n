#!/usr/bin/env node

import { cli } from '@jsnpx/u';
import { normalize } from './index.js';

const argv = cli('npx @jsnpx/n',
  {
    src: { describe: 'Url or path of input', type: 'string' },
  },
  {
    s: { describe: 'Save', type: 'string' },
    b: { describe: 'Base URL', type: 'string' },
    e: { describe: 'Encoding', type: 'string' },
  });

(async () => {
  const e = argv.e || (argv.s ? "utf-8" : "base64")
  const output = await normalize(argv.src, {
    baseUrl: argv.b,
    encoding: e,
    save: argv.s
  })

  output && console.log(e !== "base64" ? Buffer.from(output).toString('base64') : output);
  process.exit(0);

})();
