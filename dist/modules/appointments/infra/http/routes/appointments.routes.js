"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _ensureAuthenticated = _interopRequireDefault(require("../../../../users/infra/http/middlewares/ensureAuthenticated"));

var _AppointmentsController = _interopRequireDefault(require("../controllers/AppointmentsController"));

var _ProviderAppointmentsController = _interopRequireDefault(require("../controllers/ProviderAppointmentsController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import { celebrate, Segments, Joi } from 'celebrate';
const appointmentsRouter = (0, _express.Router)();
const appointmentsController = new _AppointmentsController.default();
const providerAppointmentsController = new _ProviderAppointmentsController.default();
appointmentsRouter.use(_ensureAuthenticated.default);
/*appointmentsRouter.post(
    '/',
    celebrate({
        [Segments.BODY]:{
            provider_id: Joi.string().uuid().required(),
            date: Joi.date(),
        },
    }),
    appointmentsController.create,
);*/

appointmentsRouter.post('/', appointmentsController.create);
appointmentsRouter.get('/me', providerAppointmentsController.index);
var _default = appointmentsRouter;
exports.default = _default;