"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _emailService = require("./emailService");
var _lodash = _interopRequireWildcard(require("lodash"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return r; }; var t, r = {}, e = Object.prototype, n = e.hasOwnProperty, o = "function" == typeof Symbol ? Symbol : {}, i = o.iterator || "@@iterator", a = o.asyncIterator || "@@asyncIterator", u = o.toStringTag || "@@toStringTag"; function c(t, r, e, n) { return Object.defineProperty(t, r, { value: e, enumerable: !n, configurable: !n, writable: !n }); } try { c({}, ""); } catch (t) { c = function c(t, r, e) { return t[r] = e; }; } function h(r, e, n, o) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype); return c(a, "_invoke", function (r, e, n) { var o = 1; return function (i, a) { if (3 === o) throw Error("Generator is already running"); if (4 === o) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var u = n.delegate; if (u) { var c = d(u, n); if (c) { if (c === f) continue; return c; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (1 === o) throw o = 4, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = 3; var h = s(r, e, n); if ("normal" === h.type) { if (o = n.done ? 4 : 2, h.arg === f) continue; return { value: h.arg, done: n.done }; } "throw" === h.type && (o = 4, n.method = "throw", n.arg = h.arg); } }; }(r, n, new Context(o || [])), !0), a; } function s(t, r, e) { try { return { type: "normal", arg: t.call(r, e) }; } catch (t) { return { type: "throw", arg: t }; } } r.wrap = h; var f = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var l = {}; c(l, i, function () { return this; }); var p = Object.getPrototypeOf, y = p && p(p(x([]))); y && y !== e && n.call(y, i) && (l = y); var v = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(l); function g(t) { ["next", "throw", "return"].forEach(function (r) { c(t, r, function (t) { return this._invoke(r, t); }); }); } function AsyncIterator(t, r) { function e(o, i, a, u) { var c = s(t[o], t, i); if ("throw" !== c.type) { var h = c.arg, f = h.value; return f && "object" == _typeof(f) && n.call(f, "__await") ? r.resolve(f.__await).then(function (t) { e("next", t, a, u); }, function (t) { e("throw", t, a, u); }) : r.resolve(f).then(function (t) { h.value = t, a(h); }, function (t) { return e("throw", t, a, u); }); } u(c.arg); } var o; c(this, "_invoke", function (t, n) { function i() { return new r(function (r, o) { e(t, n, r, o); }); } return o = o ? o.then(i, i) : i(); }, !0); } function d(r, e) { var n = e.method, o = r.i[n]; if (o === t) return e.delegate = null, "throw" === n && r.i["return"] && (e.method = "return", e.arg = t, d(r, e), "throw" === e.method) || "return" !== n && (e.method = "throw", e.arg = new TypeError("The iterator does not provide a '" + n + "' method")), f; var i = s(o, r.i, e.arg); if ("throw" === i.type) return e.method = "throw", e.arg = i.arg, e.delegate = null, f; var a = i.arg; return a ? a.done ? (e[r.r] = a.value, e.next = r.n, "return" !== e.method && (e.method = "next", e.arg = t), e.delegate = null, f) : a : (e.method = "throw", e.arg = new TypeError("iterator result is not an object"), e.delegate = null, f); } function w(t) { this.tryEntries.push(t); } function m(r) { var e = r[4] || {}; e.type = "normal", e.arg = t, r[4] = e; } function Context(t) { this.tryEntries = [[-1]], t.forEach(w, this), this.reset(!0); } function x(r) { if (null != r) { var e = r[i]; if (e) return e.call(r); if ("function" == typeof r.next) return r; if (!isNaN(r.length)) { var o = -1, a = function e() { for (; ++o < r.length;) if (n.call(r, o)) return e.value = r[o], e.done = !1, e; return e.value = t, e.done = !0, e; }; return a.next = a; } } throw new TypeError(_typeof(r) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, c(v, "constructor", GeneratorFunctionPrototype), c(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = c(GeneratorFunctionPrototype, u, "GeneratorFunction"), r.isGeneratorFunction = function (t) { var r = "function" == typeof t && t.constructor; return !!r && (r === GeneratorFunction || "GeneratorFunction" === (r.displayName || r.name)); }, r.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, c(t, u, "GeneratorFunction")), t.prototype = Object.create(v), t; }, r.awrap = function (t) { return { __await: t }; }, g(AsyncIterator.prototype), c(AsyncIterator.prototype, a, function () { return this; }), r.AsyncIterator = AsyncIterator, r.async = function (t, e, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(h(t, e, n, o), i); return r.isGeneratorFunction(e) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, g(v), c(v, u, "Generator"), c(v, i, function () { return this; }), c(v, "toString", function () { return "[object Generator]"; }), r.keys = function (t) { var r = Object(t), e = []; for (var n in r) e.unshift(n); return function t() { for (; e.length;) if ((n = e.pop()) in r) return t.value = n, t.done = !1, t; return t.done = !0, t; }; }, r.values = x, Context.prototype = { constructor: Context, reset: function reset(r) { if (this.prev = this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(m), !r) for (var e in this) "t" === e.charAt(0) && n.call(this, e) && !isNaN(+e.slice(1)) && (this[e] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0][4]; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(r) { if (this.done) throw r; var e = this; function n(t) { a.type = "throw", a.arg = r, e.next = t; } for (var o = e.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i[4], u = this.prev, c = i[1], h = i[2]; if (-1 === i[0]) return n("end"), !1; if (!c && !h) throw Error("try statement without catch or finally"); if (null != i[0] && i[0] <= u) { if (u < c) return this.method = "next", this.arg = t, n(c), !0; if (u < h) return n(h), !1; } } }, abrupt: function abrupt(t, r) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var n = this.tryEntries[e]; if (n[0] > -1 && n[0] <= this.prev && this.prev < n[2]) { var o = n; break; } } o && ("break" === t || "continue" === t) && o[0] <= r && r <= o[2] && (o = null); var i = o ? o[4] : {}; return i.type = t, i.arg = r, o ? (this.method = "next", this.next = o[2], f) : this.complete(i); }, complete: function complete(t, r) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && r && (this.next = r), f; }, finish: function finish(t) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var e = this.tryEntries[r]; if (e[2] === t) return this.complete(e[4], e[3]), m(e), f; } }, "catch": function _catch(t) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var e = this.tryEntries[r]; if (e[0] === t) { var n = e[4]; if ("throw" === n.type) { var o = n.arg; m(e); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(r, e, n) { return this.delegate = { i: x(r), r: e, n: n }, "next" === this.method && (this.arg = t), f; } }, r; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var _require = require("sequelize"),
  where = _require.where;
var db = require("../models/index");
var _require2 = require("body-parser"),
  raw = _require2.raw;
var getTopDoctorHome = function getTopDoctorHome(limit) {
  return new Promise(/*#__PURE__*/function () {
    var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(resolve, reject) {
      var doctor;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return db.User.findAll({
              limit: limit,
              where: {
                roleID: "R2"
              },
              order: [["createdAt", "DESC"]],
              attributes: {
                exclude: ["password"]
              },
              include: [{
                model: db.Allcodes,
                as: "roleData",
                attributes: ["value_VI", "value_EN"]
              }, {
                model: db.Allcodes,
                as: "positionData",
                attributes: ["value_VI", "value_EN"]
              }, {
                model: db.Allcodes,
                as: "genderData",
                attributes: ["value_VI", "value_EN"]
              }],
              raw: false
            });
          case 3:
            doctor = _context.sent;
            resolve(doctor);
            _context.next = 10;
            break;
          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            reject(_context.t0);
          case 10:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[0, 7]]);
    }));
    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
};
var getAllDoctorService = function getAllDoctorService() {
  return new Promise(/*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(resolve, reject) {
      var doctors;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return db.User.findAll({
              where: {
                roleID: "R2"
              },
              attributes: {
                exclude: ["password", "image"]
              },
              include: [{
                model: db.Allcodes,
                as: "roleData",
                attributes: ["value_VI", "value_EN"]
              }, {
                model: db.Allcodes,
                as: "positionData",
                attributes: ["value_VI", "value_EN"]
              }, {
                model: db.Allcodes,
                as: "genderData",
                attributes: ["value_VI", "value_EN"]
              }],
              raw: false
            });
          case 3:
            doctors = _context2.sent;
            resolve(doctors);
            _context2.next = 10;
            break;
          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](0);
            reject(_context2.t0);
          case 10:
          case "end":
            return _context2.stop();
        }
      }, _callee2, null, [[0, 7]]);
    }));
    return function (_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }());
};
var checkRequiredFields = function checkRequiredFields(dataInput) {
  var requiredFields = ["contentMarkdown", "contentHTML", "priceID", "provinceID", "paymentID", "nameClinic", "addressClinic", "doctorID", "specialtyID"];
  for (var _i = 0, _requiredFields = requiredFields; _i < _requiredFields.length; _i++) {
    var field = _requiredFields[_i];
    if (!dataInput[field] || dataInput[field] === "") {
      return {
        isValid: false,
        missing: field
      };
    }
  }
  return {
    isValid: true
  };
};
var createInfoDoctor = function createInfoDoctor(dataInput) {
  return new Promise(/*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(resolve, reject) {
      var isValid, infoDoctor;
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            console.log("Check dataInput creaate: ", dataInput);
            isValid = checkRequiredFields(dataInput);
            if (isValid.isValid) {
              _context3.next = 7;
              break;
            }
            resolve({
              errCode: 1,
              message: "Missing ".concat(isValid.missing, "!")
            });
            _context3.next = 20;
            break;
          case 7:
            _context3.next = 9;
            return db.Markdown.create({
              contentHTML: dataInput.contentHTML,
              contentMarkdown: dataInput.contentMarkdown,
              description: dataInput.description,
              doctorID: dataInput.doctorID,
              specialtyID: dataInput.specialtyID,
              clinicID: dataInput.clinicID
            });
          case 9:
            _context3.next = 11;
            return db.Doctor_Info.findOne({
              where: {
                doctorID: dataInput.doctorID
              }
            });
          case 11:
            infoDoctor = _context3.sent;
            if (infoDoctor) {
              _context3.next = 17;
              break;
            }
            _context3.next = 15;
            return db.Doctor_Info.create({
              doctorID: dataInput.doctorID,
              priceID: dataInput.priceID,
              provinceID: dataInput.provinceID,
              paymentID: dataInput.paymentID,
              addressClinic: dataInput.addressClinic,
              nameClinic: dataInput.nameClinic,
              specialtyID: dataInput.specialtyID,
              clinicID: dataInput.clinicID,
              note: dataInput.note
            });
          case 15:
            _context3.next = 19;
            break;
          case 17:
            _context3.next = 19;
            return db.Doctor_Info.update({
              priceID: dataInput.priceID,
              provinceID: dataInput.provinceID,
              paymentID: dataInput.paymentID,
              addressClinic: dataInput.addressClinic,
              nameClinic: dataInput.nameClinic,
              specialtyID: dataInput.specialtyID,
              clinicID: dataInput.clinicID,
              note: dataInput.note
            }, {
              where: {
                doctorID: dataInput.doctorID
              }
            });
          case 19:
            resolve({
              errCode: 0,
              message: "Create info doctor success"
            });
          case 20:
            _context3.next = 25;
            break;
          case 22:
            _context3.prev = 22;
            _context3.t0 = _context3["catch"](0);
            reject(_context3.t0);
          case 25:
          case "end":
            return _context3.stop();
        }
      }, _callee3, null, [[0, 22]]);
    }));
    return function (_x5, _x6) {
      return _ref3.apply(this, arguments);
    };
  }());
};
var getInfoDoctor = function getInfoDoctor(id) {
  return new Promise(/*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(resolve, reject) {
      var info;
      return _regeneratorRuntime().wrap(function _callee4$(_context4) {
        while (1) switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            if (id) {
              _context4.next = 5;
              break;
            }
            reject({
              errCode: 2,
              message: "ID doctor is not exists !"
            });
            _context4.next = 11;
            break;
          case 5:
            _context4.next = 7;
            return db.User.findOne({
              where: {
                id: id
              },
              attributes: {
                exclude: ["password"]
              },
              include: [{
                model: db.Markdown,
                attributes: ["id", "contentHTML", "contentMarkdown", "description"]
              }, {
                model: db.Allcodes,
                as: "roleData",
                attributes: ["value_VI", "value_EN"]
              }, {
                model: db.Allcodes,
                as: "positionData",
                attributes: ["value_VI", "value_EN"]
              }, {
                model: db.Allcodes,
                as: "genderData",
                attributes: ["value_VI", "value_EN"]
              }, {
                model: db.Doctor_Info,
                attributes: {
                  exclude: ["id", "doctorID", "count", "updatedAt", "createdAt"]
                },
                include: [{
                  model: db.Allcodes,
                  as: "priceData",
                  attributes: ["key", "value_VI", "value_EN"]
                }, {
                  model: db.Allcodes,
                  as: "paymentData",
                  attributes: ["key", "value_VI", "value_EN"]
                }, {
                  model: db.Allcodes,
                  as: "provinceData",
                  attributes: ["key", "value_VI", "value_EN"]
                }],
                raw: false
              }],
              raw: false
            });
          case 7:
            info = _context4.sent;
            if (!info) {
              resolve({
                errCode: 3,
                message: "Doctor not found"
              });
            }
            if (info && info.image) {
              info.image = new Buffer(info.image, "base64").toString("binary");
            }
            resolve({
              errCode: 0,
              data: info
            });
          case 11:
            _context4.next = 16;
            break;
          case 13:
            _context4.prev = 13;
            _context4.t0 = _context4["catch"](0);
            reject({
              errCode: 1,
              message: "get detail doctor failed !"
            });
          case 16:
          case "end":
            return _context4.stop();
        }
      }, _callee4, null, [[0, 13]]);
    }));
    return function (_x7, _x8) {
      return _ref4.apply(this, arguments);
    };
  }());
};
var getContentMarkdown = function getContentMarkdown(doctorId) {
  return new Promise(/*#__PURE__*/function () {
    var _ref5 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5(resolve, reject) {
      var content;
      return _regeneratorRuntime().wrap(function _callee5$(_context5) {
        while (1) switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            if (doctorId) {
              _context5.next = 5;
              break;
            }
            reject({
              errCode: 2,
              message: "doctor is not exists !"
            });
            _context5.next = 9;
            break;
          case 5:
            _context5.next = 7;
            return db.Markdown.findOne({
              where: {
                doctorID: doctorId
              }
            });
          case 7:
            content = _context5.sent;
            resolve({
              errCode: 0,
              data: content
            });
          case 9:
            _context5.next = 14;
            break;
          case 11:
            _context5.prev = 11;
            _context5.t0 = _context5["catch"](0);
            reject(_context5.t0);
          case 14:
          case "end":
            return _context5.stop();
        }
      }, _callee5, null, [[0, 11]]);
    }));
    return function (_x9, _x0) {
      return _ref5.apply(this, arguments);
    };
  }());
};
var handleUpdateContentMarkdown = function handleUpdateContentMarkdown(dataInput) {
  return new Promise(/*#__PURE__*/function () {
    var _ref6 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6(resolve, reject) {
      var isValid, content, infoDoctor;
      return _regeneratorRuntime().wrap(function _callee6$(_context6) {
        while (1) switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            console.log("Check dataInput Update: ", dataInput);
            isValid = checkRequiredFields(dataInput);
            if (isValid.isValid) {
              _context6.next = 7;
              break;
            }
            resolve({
              errCode: 1,
              message: "Missing ".concat(isValid.missing, "!")
            });
            _context6.next = 24;
            break;
          case 7:
            _context6.next = 9;
            return db.Markdown.findOne({
              where: [{
                id: dataInput.id
              }, {
                doctorID: dataInput.doctorID
              }]
            });
          case 9:
            content = _context6.sent;
            if (!content) {
              _context6.next = 13;
              break;
            }
            _context6.next = 13;
            return db.Markdown.update({
              contentHTML: dataInput.contentHTML,
              contentMarkdown: dataInput.contentMarkdown,
              description: dataInput.description,
              doctorID: dataInput.doctorID,
              specialtyID: dataInput.specialtyID,
              clinicID: dataInput.clinicID
            }, {
              where: {
                id: dataInput.id
              }
            });
          case 13:
            _context6.next = 15;
            return db.Doctor_Info.findOne({
              where: {
                doctorID: dataInput.doctorID
              }
            });
          case 15:
            infoDoctor = _context6.sent;
            if (infoDoctor) {
              _context6.next = 21;
              break;
            }
            _context6.next = 19;
            return db.Doctor_Info.create({
              doctorID: dataInput.doctorID,
              priceID: dataInput.priceID,
              provinceID: dataInput.provinceID,
              paymentID: dataInput.paymentID,
              specialtyID: dataInput.specialtyID,
              clinicID: dataInput.clinicID,
              addressClinic: dataInput.addressClinic,
              nameClinic: dataInput.nameClinic,
              note: dataInput.note
            });
          case 19:
            _context6.next = 23;
            break;
          case 21:
            _context6.next = 23;
            return db.Doctor_Info.update({
              priceID: dataInput.priceID,
              provinceID: dataInput.provinceID,
              paymentID: dataInput.paymentID,
              addressClinic: dataInput.addressClinic,
              specialtyID: dataInput.specialtyID,
              clinicID: dataInput.clinicID,
              nameClinic: dataInput.nameClinic,
              note: dataInput.note
            }, {
              where: {
                doctorID: dataInput.doctorID
              }
            });
          case 23:
            resolve({
              errCode: 0,
              message: "update content markdown is success"
            });
          case 24:
            _context6.next = 29;
            break;
          case 26:
            _context6.prev = 26;
            _context6.t0 = _context6["catch"](0);
            reject(_context6.t0);
          case 29:
          case "end":
            return _context6.stop();
        }
      }, _callee6, null, [[0, 26]]);
    }));
    return function (_x1, _x10) {
      return _ref6.apply(this, arguments);
    };
  }());
};
var handleCreateSchedules = function handleCreateSchedules(data) {
  return new Promise(/*#__PURE__*/function () {
    var _ref7 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7(resolve, reject) {
      var existingTime, toCreate, schedules;
      return _regeneratorRuntime().wrap(function _callee7$(_context7) {
        while (1) switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            if (data) {
              _context7.next = 5;
              break;
            }
            reject({
              errCode: 2,
              message: "schedules is not exists !"
            });
            _context7.next = 14;
            break;
          case 5:
            _context7.next = 7;
            return db.Schedule.findAll({
              where: {
                doctorID: data[0].doctorID,
                date: data[0].date
              },
              attributes: ["maxNumber", "date", "timeType", "doctorID"],
              raw: false
            });
          case 7:
            existingTime = _context7.sent;
            if (existingTime && existingTime.length > 0) {
              existingTime = existingTime.map(function (item) {
                item.date = new Date(item.date).getTime();
                return item;
              });
            }
            toCreate = _lodash["default"].differenceWith(data, existingTime, function (a, b) {
              return a.timeType === b.timeType && a.date === b.date;
            });
            _context7.next = 12;
            return db.Schedule.bulkCreate(toCreate);
          case 12:
            schedules = _context7.sent;
            if (schedules) {
              console.log("Check schedules: ", schedules);
              resolve({
                errCode: 0,
                message: "Create schedule is success"
              });
            }
          case 14:
            _context7.next = 19;
            break;
          case 16:
            _context7.prev = 16;
            _context7.t0 = _context7["catch"](0);
            reject(_context7.t0);
          case 19:
          case "end":
            return _context7.stop();
        }
      }, _callee7, null, [[0, 16]]);
    }));
    return function (_x11, _x12) {
      return _ref7.apply(this, arguments);
    };
  }());
};
var handleGetScheduleByDate = function handleGetScheduleByDate(doctorID) {
  return new Promise(/*#__PURE__*/function () {
    var _ref8 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee8(resolve, reject) {
      var schedule;
      return _regeneratorRuntime().wrap(function _callee8$(_context8) {
        while (1) switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;
            if (doctorID) {
              _context8.next = 5;
              break;
            }
            reject({
              errCode: -2,
              message: "Missing parameter !"
            });
            _context8.next = 9;
            break;
          case 5:
            _context8.next = 7;
            return db.Schedule.findAll(_defineProperty(_defineProperty({
              where: {
                doctorID: doctorID
              },
              raw: false,
              include: [{
                model: db.Allcodes,
                as: "timeTypeData",
                attributes: ["value_VI", "value_EN"]
              }, {
                model: db.User,
                as: "doctorData",
                attributes: ["firstName", "lastName"]
              }]
            }, "raw", true), "nest", true));
          case 7:
            schedule = _context8.sent;
            if (schedule && schedule.length > 0) {
              console.log("Check schedules: ", schedule);
              resolve({
                errCode: 0,
                data: schedule
              });
            }
          case 9:
            _context8.next = 14;
            break;
          case 11:
            _context8.prev = 11;
            _context8.t0 = _context8["catch"](0);
            reject(_context8.t0);
          case 14:
          case "end":
            return _context8.stop();
        }
      }, _callee8, null, [[0, 11]]);
    }));
    return function (_x13, _x14) {
      return _ref8.apply(this, arguments);
    };
  }());
};
var handleGetDoctorInfo = function handleGetDoctorInfo(doctorID) {
  return new Promise(/*#__PURE__*/function () {
    var _ref9 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee9(resolve, reject) {
      var doctorInfo;
      return _regeneratorRuntime().wrap(function _callee9$(_context9) {
        while (1) switch (_context9.prev = _context9.next) {
          case 0:
            _context9.prev = 0;
            if (!doctorID) {
              reject({
                errCode: -1,
                message: "Missing parameter !"
              });
            }
            _context9.next = 4;
            return db.Doctor_Info.findOne({
              where: {
                doctorID: doctorID
              },
              attributes: ["priceID", "provinceID", "paymentID", "addressClinic", "nameClinic", "note"],
              include: [{
                model: db.Allcodes,
                as: "priceData",
                attributes: ["key", "value_VI", "value_EN"]
              }, {
                model: db.Allcodes,
                as: "paymentData",
                attributes: ["key", "value_VI", "value_EN"]
              }, {
                model: db.Allcodes,
                as: "provinceData",
                attributes: ["key", "value_VI", "value_EN"]
              }],
              raw: false
            });
          case 4:
            doctorInfo = _context9.sent;
            resolve({
              errCode: 0,
              data: doctorInfo
            });
            _context9.next = 11;
            break;
          case 8:
            _context9.prev = 8;
            _context9.t0 = _context9["catch"](0);
            reject(_context9.t0);
          case 11:
          case "end":
            return _context9.stop();
        }
      }, _callee9, null, [[0, 8]]);
    }));
    return function (_x15, _x16) {
      return _ref9.apply(this, arguments);
    };
  }());
};
var handleGetProfileDoctor = function handleGetProfileDoctor(doctorID) {
  return new Promise(/*#__PURE__*/function () {
    var _ref0 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee0(resolve, reject) {
      var info;
      return _regeneratorRuntime().wrap(function _callee0$(_context0) {
        while (1) switch (_context0.prev = _context0.next) {
          case 0:
            _context0.prev = 0;
            if (doctorID) {
              _context0.next = 5;
              break;
            }
            reject({
              errCode: 2,
              message: "ID doctor is not exists !"
            });
            _context0.next = 10;
            break;
          case 5:
            _context0.next = 7;
            return db.User.findOne({
              where: {
                id: doctorID
              },
              attributes: {
                exclude: ["password"]
              },
              include: [{
                model: db.Markdown,
                attributes: ["contentHTML", "contentMarkdown", "description"]
              }, {
                model: db.Allcodes,
                as: "roleData",
                attributes: ["value_VI", "value_EN"]
              }, {
                model: db.Allcodes,
                as: "positionData",
                attributes: ["value_VI", "value_EN"]
              }, {
                model: db.Allcodes,
                as: "genderData",
                attributes: ["value_VI", "value_EN"]
              }, {
                model: db.Doctor_Info,
                attributes: {
                  exclude: ["id", "doctorID", "count", "updatedAt", "createdAt"]
                },
                include: [{
                  model: db.Allcodes,
                  as: "priceData",
                  attributes: ["key", "value_VI", "value_EN"]
                }, {
                  model: db.Allcodes,
                  as: "paymentData",
                  attributes: ["key", "value_VI", "value_EN"]
                }, {
                  model: db.Allcodes,
                  as: "provinceData",
                  attributes: ["key", "value_VI", "value_EN"]
                }]
              }],
              raw: false
            });
          case 7:
            info = _context0.sent;
            if (info && info.image) {
              info.image = new Buffer(info.image, "base64").toString("binary");
            }
            resolve({
              errCode: 0,
              data: info
            });
          case 10:
            _context0.next = 15;
            break;
          case 12:
            _context0.prev = 12;
            _context0.t0 = _context0["catch"](0);
            reject(_context0.t0);
          case 15:
          case "end":
            return _context0.stop();
        }
      }, _callee0, null, [[0, 12]]);
    }));
    return function (_x17, _x18) {
      return _ref0.apply(this, arguments);
    };
  }());
};
var getInfoPatient = function getInfoPatient(doctorID, date) {
  return new Promise(/*#__PURE__*/function () {
    var _ref1 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee1(resolve, reject) {
      var data;
      return _regeneratorRuntime().wrap(function _callee1$(_context1) {
        while (1) switch (_context1.prev = _context1.next) {
          case 0:
            _context1.prev = 0;
            if (!(!doctorID || !date)) {
              _context1.next = 5;
              break;
            }
            resolve({
              errCode: -2,
              message: "Missing parameter !"
            });
            _context1.next = 9;
            break;
          case 5:
            _context1.next = 7;
            return db.Bookings.findAll(_defineProperty({
              where: {
                doctorID: doctorID,
                statusID: "S2",
                date: date
              },
              raw: false,
              attributes: {
                exclude: ["access_token"]
              },
              include: [{
                model: db.User,
                as: "patientData",
                attributes: ["email", "firstName", "lastName", "address", "gender", "phoneNumber"],
                include: [{
                  model: db.Allcodes,
                  as: "genderData",
                  attributes: ['value_VI', 'value_EN']
                }]
              }, {
                model: db.Allcodes,
                as: "timetypeData",
                attributes: ['value_VI', 'value_EN']
              }, {
                model: db.Allcodes,
                as: "timetypeData",
                attributes: ["value_VI", "value_EN"]
              }, {
                model: db.Doctor_Info,
                as: "priceData",
                attributes: ["priceID"],
                // Lấy priceID
                include: [{
                  model: db.Allcodes,
                  as: "priceData",
                  attributes: ["value_VI", "value_EN"] // Giá trị tiền khám
                }]
              }]
            }, "raw", false));
          case 7:
            data = _context1.sent;
            resolve({
              errCode: 0,
              data: data
            });
          case 9:
            _context1.next = 14;
            break;
          case 11:
            _context1.prev = 11;
            _context1.t0 = _context1["catch"](0);
            reject(_context1.t0);
          case 14:
          case "end":
            return _context1.stop();
        }
      }, _callee1, null, [[0, 11]]);
    }));
    return function (_x19, _x20) {
      return _ref1.apply(this, arguments);
    };
  }());
};
var handleSendInvoice = function handleSendInvoice(data) {
  return new Promise(/*#__PURE__*/function () {
    var _ref10 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee10(resolve, reject) {
      var appointment;
      return _regeneratorRuntime().wrap(function _callee10$(_context10) {
        while (1) switch (_context10.prev = _context10.next) {
          case 0:
            _context10.prev = 0;
            if (!(!data.doctorID || !data.patientID || !data.timeType)) {
              _context10.next = 5;
              break;
            }
            resolve({
              errCode: 2,
              message: "Missing parameter !"
            });
            _context10.next = 14;
            break;
          case 5:
            _context10.next = 7;
            return db.Bookings.findOne({
              where: {
                doctorID: data.doctorID,
                patientID: data.patientID,
                timeType: data.timeType,
                statusID: "S2"
              },
              raw: false
            });
          case 7:
            appointment = _context10.sent;
            if (!appointment) {
              _context10.next = 14;
              break;
            }
            appointment.statusID = "S3";
            _context10.next = 12;
            return appointment.save();
          case 12:
            (0, _emailService.sendEmailInvoice)(data);
            resolve({
              errCode: 0,
              message: "Update status booking successfully!"
            });
          case 14:
            _context10.next = 19;
            break;
          case 16:
            _context10.prev = 16;
            _context10.t0 = _context10["catch"](0);
            reject(_context10.t0);
          case 19:
          case "end":
            return _context10.stop();
        }
      }, _callee10, null, [[0, 16]]);
    }));
    return function (_x21, _x22) {
      return _ref10.apply(this, arguments);
    };
  }());
};
module.exports = {
  getTopDoctorHome: getTopDoctorHome,
  getAllDoctorService: getAllDoctorService,
  createInfoDoctor: createInfoDoctor,
  getInfoDoctor: getInfoDoctor,
  getContentMarkdown: getContentMarkdown,
  handleUpdateContentMarkdown: handleUpdateContentMarkdown,
  handleCreateSchedules: handleCreateSchedules,
  handleGetScheduleByDate: handleGetScheduleByDate,
  handleGetDoctorInfo: handleGetDoctorInfo,
  handleGetProfileDoctor: handleGetProfileDoctor,
  getInfoPatient: getInfoPatient,
  handleSendInvoice: handleSendInvoice
};