require("cross-fetch/polyfill");

global.fetch = require("jest-fetch-mock");
