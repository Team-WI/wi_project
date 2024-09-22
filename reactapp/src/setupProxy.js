const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
	app.use(
		createProxyMiddleware('/api', {
			target: 'http://43.203.208.22:5000', 
			changeOrigin: true,
		})
	);
};