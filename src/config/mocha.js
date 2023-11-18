require('@babel/register')({ configFile: './config/babel.json' });

function noop() {
  return null;
}

require.extensions['.svg'] = noop;
require.extensions['.ttf'] = noop;
require.extensions['.bmp'] = noop;
require.extensions['.jpg'] = noop;
require.extensions['.jpeg'] = noop;
require.extensions['.png'] = noop;
require.extensions['.gif'] = noop;
