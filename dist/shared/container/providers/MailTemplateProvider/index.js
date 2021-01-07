"use strict";

var _tsyringe = require("tsyringe");

var _HandlebarsMailTemplateProviders = _interopRequireDefault(require("./implementations/HandlebarsMailTemplateProviders"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const providers = {
  handlebars: _HandlebarsMailTemplateProviders.default
};

_tsyringe.container.registerSingleton('MailTemplateProvider', providers.handlebars);