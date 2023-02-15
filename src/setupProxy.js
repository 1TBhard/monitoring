const { createProxyMiddleware } = require("http-proxy-middleware");
const { API } = require("./const/PROXY_API_URL");

const WHATAP_OPEN_API_ROOT = "https://api.whatap.io/open";

module.exports = function (app) {
	app.use(
		`/${API}`,
		createProxyMiddleware({
			target: WHATAP_OPEN_API_ROOT,
			changeOrigin: true,
		})
	);
};
