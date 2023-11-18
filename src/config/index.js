module.exports = {
  name: 'INDILUX',
  shortName: 'INDILUX',
  description: 'INDILUX application.',
  apiHost: process.env.REACT_APP_API_HOST,
  webSocketHost: process.env.REACT_APP_WEB_SOCKET_HOST,
  basename: process.env.BASENAME || '/',
  noscript: 'You need to enable JavaScript to run this application.',
  activeTheme: process.env.REACT_APP_ACTIVE_THEME || 'bespun',
};
