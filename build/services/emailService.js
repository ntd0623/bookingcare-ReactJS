"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return r; }; var t, r = {}, e = Object.prototype, n = e.hasOwnProperty, o = "function" == typeof Symbol ? Symbol : {}, i = o.iterator || "@@iterator", a = o.asyncIterator || "@@asyncIterator", u = o.toStringTag || "@@toStringTag"; function c(t, r, e, n) { return Object.defineProperty(t, r, { value: e, enumerable: !n, configurable: !n, writable: !n }); } try { c({}, ""); } catch (t) { c = function c(t, r, e) { return t[r] = e; }; } function h(r, e, n, o) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype); return c(a, "_invoke", function (r, e, n) { var o = 1; return function (i, a) { if (3 === o) throw Error("Generator is already running"); if (4 === o) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var u = n.delegate; if (u) { var c = d(u, n); if (c) { if (c === f) continue; return c; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (1 === o) throw o = 4, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = 3; var h = s(r, e, n); if ("normal" === h.type) { if (o = n.done ? 4 : 2, h.arg === f) continue; return { value: h.arg, done: n.done }; } "throw" === h.type && (o = 4, n.method = "throw", n.arg = h.arg); } }; }(r, n, new Context(o || [])), !0), a; } function s(t, r, e) { try { return { type: "normal", arg: t.call(r, e) }; } catch (t) { return { type: "throw", arg: t }; } } r.wrap = h; var f = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var l = {}; c(l, i, function () { return this; }); var p = Object.getPrototypeOf, y = p && p(p(x([]))); y && y !== e && n.call(y, i) && (l = y); var v = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(l); function g(t) { ["next", "throw", "return"].forEach(function (r) { c(t, r, function (t) { return this._invoke(r, t); }); }); } function AsyncIterator(t, r) { function e(o, i, a, u) { var c = s(t[o], t, i); if ("throw" !== c.type) { var h = c.arg, f = h.value; return f && "object" == _typeof(f) && n.call(f, "__await") ? r.resolve(f.__await).then(function (t) { e("next", t, a, u); }, function (t) { e("throw", t, a, u); }) : r.resolve(f).then(function (t) { h.value = t, a(h); }, function (t) { return e("throw", t, a, u); }); } u(c.arg); } var o; c(this, "_invoke", function (t, n) { function i() { return new r(function (r, o) { e(t, n, r, o); }); } return o = o ? o.then(i, i) : i(); }, !0); } function d(r, e) { var n = e.method, o = r.i[n]; if (o === t) return e.delegate = null, "throw" === n && r.i["return"] && (e.method = "return", e.arg = t, d(r, e), "throw" === e.method) || "return" !== n && (e.method = "throw", e.arg = new TypeError("The iterator does not provide a '" + n + "' method")), f; var i = s(o, r.i, e.arg); if ("throw" === i.type) return e.method = "throw", e.arg = i.arg, e.delegate = null, f; var a = i.arg; return a ? a.done ? (e[r.r] = a.value, e.next = r.n, "return" !== e.method && (e.method = "next", e.arg = t), e.delegate = null, f) : a : (e.method = "throw", e.arg = new TypeError("iterator result is not an object"), e.delegate = null, f); } function w(t) { this.tryEntries.push(t); } function m(r) { var e = r[4] || {}; e.type = "normal", e.arg = t, r[4] = e; } function Context(t) { this.tryEntries = [[-1]], t.forEach(w, this), this.reset(!0); } function x(r) { if (null != r) { var e = r[i]; if (e) return e.call(r); if ("function" == typeof r.next) return r; if (!isNaN(r.length)) { var o = -1, a = function e() { for (; ++o < r.length;) if (n.call(r, o)) return e.value = r[o], e.done = !1, e; return e.value = t, e.done = !0, e; }; return a.next = a; } } throw new TypeError(_typeof(r) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, c(v, "constructor", GeneratorFunctionPrototype), c(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = c(GeneratorFunctionPrototype, u, "GeneratorFunction"), r.isGeneratorFunction = function (t) { var r = "function" == typeof t && t.constructor; return !!r && (r === GeneratorFunction || "GeneratorFunction" === (r.displayName || r.name)); }, r.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, c(t, u, "GeneratorFunction")), t.prototype = Object.create(v), t; }, r.awrap = function (t) { return { __await: t }; }, g(AsyncIterator.prototype), c(AsyncIterator.prototype, a, function () { return this; }), r.AsyncIterator = AsyncIterator, r.async = function (t, e, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(h(t, e, n, o), i); return r.isGeneratorFunction(e) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, g(v), c(v, u, "Generator"), c(v, i, function () { return this; }), c(v, "toString", function () { return "[object Generator]"; }), r.keys = function (t) { var r = Object(t), e = []; for (var n in r) e.unshift(n); return function t() { for (; e.length;) if ((n = e.pop()) in r) return t.value = n, t.done = !1, t; return t.done = !0, t; }; }, r.values = x, Context.prototype = { constructor: Context, reset: function reset(r) { if (this.prev = this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(m), !r) for (var e in this) "t" === e.charAt(0) && n.call(this, e) && !isNaN(+e.slice(1)) && (this[e] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0][4]; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(r) { if (this.done) throw r; var e = this; function n(t) { a.type = "throw", a.arg = r, e.next = t; } for (var o = e.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i[4], u = this.prev, c = i[1], h = i[2]; if (-1 === i[0]) return n("end"), !1; if (!c && !h) throw Error("try statement without catch or finally"); if (null != i[0] && i[0] <= u) { if (u < c) return this.method = "next", this.arg = t, n(c), !0; if (u < h) return n(h), !1; } } }, abrupt: function abrupt(t, r) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var n = this.tryEntries[e]; if (n[0] > -1 && n[0] <= this.prev && this.prev < n[2]) { var o = n; break; } } o && ("break" === t || "continue" === t) && o[0] <= r && r <= o[2] && (o = null); var i = o ? o[4] : {}; return i.type = t, i.arg = r, o ? (this.method = "next", this.next = o[2], f) : this.complete(i); }, complete: function complete(t, r) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && r && (this.next = r), f; }, finish: function finish(t) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var e = this.tryEntries[r]; if (e[2] === t) return this.complete(e[4], e[3]), m(e), f; } }, "catch": function _catch(t) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var e = this.tryEntries[r]; if (e[0] === t) { var n = e[4]; if ("throw" === n.type) { var o = n.arg; m(e); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(r, e, n) { return this.delegate = { i: x(r), r: e, n: n }, "next" === this.method && (this.arg = t), f; } }, r; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
require("dotenv").config();
var nodemailer = require("nodemailer");
var sendEmailDemo = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(dataSend) {
    var transporter, info;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
              user: process.env.EMAIL_APP,
              pass: process.env.EMAIL_APP_PASSWORD
            }
          });
          _context.next = 3;
          return transporter.sendMail({
            from: '"Bệnh Viện Đa Khoa Đô Học IT" <thanhdo062305@gmail.com>',
            to: dataSend.reciverEmail,
            subject: subjectLanguage(dataSend.language),
            html: htmlBodyLanguage(dataSend)
          });
        case 3:
          info = _context.sent;
        case 4:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function sendEmailDemo(_x) {
    return _ref.apply(this, arguments);
  };
}();
var sendEmailInvoice = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(dataSend) {
    var transporter, info;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
              user: process.env.EMAIL_APP,
              pass: process.env.EMAIL_APP_PASSWORD
            }
          });
          _context2.next = 3;
          return transporter.sendMail({
            from: '"Bệnh Viện Đa Khoa Đô Học IT" <thanhdo062305@gmail.com>',
            to: dataSend.email,
            subject: subjectLanguageInvoice(dataSend.language),
            html: htmlBodyLanguageInvoice(dataSend),
            attachments: [{
              filename: "perscription.png",
              content: dataSend.image.split("base64,")[1],
              encoding: "base64"
            }]
          });
        case 3:
          info = _context2.sent;
        case 4:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function sendEmailInvoice(_x2) {
    return _ref2.apply(this, arguments);
  };
}();
var htmlBodyLanguageInvoice = function htmlBodyLanguageInvoice(dataSend) {
  var result = "";
  if (dataSend.language === "vi") {
    result = "\n        <p>\uD83D\uDC4B Xin ch\xE0o <strong>".concat(dataSend.patientName, "</strong>,</p>\n        <p>\u2705 B\u1EA1n \u0111\xE3 ho\xE0n t\u1EA5t kh\xE1m b\u1EC7nh v\u1EDBi th\xF4ng tin nh\u01B0 sau:</p>\n        <ul>\n            <li>\uD83D\uDC64 <strong>T\xEAn b\u1EC7nh nh\xE2n:</strong> ").concat(dataSend.patientName, "</li>\n            <li>\uD83D\uDCE7 <strong>Email:</strong> ").concat(dataSend.email, "</li>\n            <li>\uD83D\uDCAC <strong>L\xFD do kh\xE1m:</strong> ").concat(dataSend.reason, "</li>\n            <li>\uD83D\uDCC5 <strong>Ng\xE0y kh\xE1m:</strong> ").concat(dataSend.date, "</li>\n            <li>\uD83D\uDC68\u200D\u2695\uFE0F <strong>B\xE1c s\u0129:</strong> ").concat(dataSend.doctorName, "</li>\n            <li>\u23F0 <strong>Ca kh\xE1m:</strong> ").concat(dataSend.time, "</li>\n            <li>\uD83D\uDCB5 <strong>Gi\xE1 kh\xE1m:</strong> ").concat(dataSend.price, " VN\u0110</li>\n        </ul>\n        <p>\uD83E\uDDFE H\xF3a \u0111\u01A1n v\xE0 \u0111\u01A1n thu\u1ED1c \u0111\xE3 \u0111\u01B0\u1EE3c \u0111\xEDnh k\xE8m. B\u1EA1n c\xF3 th\u1EC3 ra nh\xE0 thu\u1ED1c g\u1EA7n nh\u1EA5t \u0111\u1EC3 c\xF3 th\u1EC3 mua theo h\u01B0\u1EDBng d\u1EABn c\u1EE7a b\xE1c s\u0129.</p>\n        <p>\uD83D\uDCDE N\u1EBFu c\u1EA7n h\u1ED7 tr\u1EE3 th\xEAm, vui l\xF2ng li\xEAn h\u1EC7 <strong>hotline: 0981 321 319</strong>.</p>\n        <p>Tr\xE2n tr\u1ECDng,<br><strong>\uD83C\uDFE5 B\u1EC7nh Vi\u1EC7n \u0110a Khoa \u0110\xF4 H\u1ECDc IT</strong></p>\n        ");
  } else {
    result = "\n        <p>\uD83D\uDC4B Dear <strong>".concat(dataSend.patientName, "</strong>,</p>\n        <p>\u2705 Your medical consultation has been completed with the following details:</p>\n        <ul>\n            <li>\uD83D\uDC64 <strong>Patient Name:</strong> ").concat(dataSend.patientName, "</li>\n            <li>\uD83D\uDCE7 <strong>Email:</strong> ").concat(dataSend.email, "</li>\n            <li>\uD83D\uDCAC <strong>Reason:</strong> ").concat(dataSend.reason, "</li>\n            <li>\uD83D\uDCC5 <strong>Date:</strong> ").concat(dataSend.date, "</li>\n            <li>\uD83D\uDC68\u200D\u2695\uFE0F <strong>Doctor:</strong> ").concat(dataSend.doctorName, "</li>\n            <li>\u23F0 <strong>Time:</strong> ").concat(dataSend.time, "</li>\n            <li>\uD83D\uDCB5 <strong>Fee:</strong> ").concat(dataSend.price, " VND</li>\n        </ul>\n        <p>\uD83E\uDDFE Your invoice and prescription are now available. Please visit the nearest pharmacy to obtain your medications as per the doctor's instructions..</p>\n        <p>\uD83D\uDCDE If you need further assistance, please contact our <strong>hotline: 0981 321 319</strong>.</p>\n        <p>Sincerely,<br><strong>\uD83C\uDFE5 Do Hoc IT General Hospital</strong></p>\n        ");
  }
  return result;
};
var subjectLanguageInvoice = function subjectLanguageInvoice(language) {
  var result = "";
  if (language === 'vi') {
    result = "Xác Nhận Hóa Đơn Và Đơn Thuốc";
  } else {
    result = "Confirm Invoice And Perscription";
  }
  return result;
};
var htmlBodyLanguage = function htmlBodyLanguage(dataSend) {
  var result = "";
  if (dataSend.language === "vi") {
    result = "\n        <p>Xin ch\xE0o <strong>[".concat(dataSend.patientName, "]</strong>,</p>\n    <p>B\u1EA1n \u0111\xE3 \u0111\u1EB7t l\u1ECBch kh\xE1m b\u1EC7nh th\xE0nh c\xF4ng v\u1EDBi th\xF4ng tin nh\u01B0 sau:</p>\n    <ul>\n      <li><strong>B\xE1c s\u0129:</strong> [").concat(dataSend.doctorName, "]</li>\n      <li><strong>Chuy\xEAn khoa:</strong> [Chuy\xEAn khoa]</li>\n      <li><strong>Th\u1EDDi gian kh\xE1m:</strong> [").concat(dataSend.time, "]</li>\n    </ul>\n    <p>Vui l\xF2ng \u0111\u1EBFn \u0111\xFAng gi\u1EDD v\xE0 mang theo gi\u1EA5y t\u1EDD t\xF9y th\xE2n \u0111\u1EC3 ho\xE0n t\u1EA5t th\u1EE7 t\u1EE5c.</p>\n    <p>N\u1EBFu th\xF4ng tin tr\xEAn l\xE0 \u0111\xFAng, vui l\xF2ng <a href=\"").concat(dataSend.redirectLink, "\">nh\u1EA5n v\xE0o \u0111\xE2y</a> \u0111\u1EC3 x\xE1c nh\u1EADn.</p>\n    <p>N\u1EBFu c\u1EA7n h\u1ED7 tr\u1EE3, li\xEAn h\u1EC7 <strong>hotline: 0981 321 319</strong>.</p>\n    <p>Tr\xE2n tr\u1ECDng,<br>B\u1EC7nh Vi\u1EC7n \u0110a Khoa \u0110\xF4 H\u1ECDc IT</p>\n        ");
  } else {
    result = "\n    <p>Dear <strong>[".concat(dataSend.patientName, "]</strong>,</p>\n<p>Your medical appointment has been successfully booked with the following details:</p>\n<ul>\n  <li><strong>Doctor:</strong> [").concat(dataSend.doctorName, "]</li>\n  <li><strong>Department:</strong> [Specialty]</li>\n  <li><strong>Appointment Time:</strong> [").concat(dataSend.time, "]</li>\n</ul>\n<p>Please arrive on time and bring your identification documents to complete the check-in procedure.</p>\n<p>If the information above is correct, please <a href=\"").concat(dataSend.redirectLink, "\">click here</a> to confirm.</p>\n<p>If you need assistance, please contact our <strong>hotline: 0981 321 319</strong>.</p>\n<p>Sincerely,<br>Do Hoc IT General Hospital</p>\n    ");
  }
  return result;
};
var subjectLanguage = function subjectLanguage(language) {
  var result = "";
  if (language === 'vi') {
    result = "Xác nhận lịch khám bệnh";
  } else {
    result = "Medical Appointment Confirmation";
  }
  return result;
};
module.exports = {
  sendEmailDemo: sendEmailDemo,
  sendEmailInvoice: sendEmailInvoice
};