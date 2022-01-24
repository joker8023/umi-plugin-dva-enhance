"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getClassModels;

function _umi() {
  const data = require("umi");

  _umi = function _umi() {
    return data;
  };

  return data;
}

function _path() {
  const data = require("path");

  _path = function _path() {
    return data;
  };

  return data;
}

function _fs() {
  const data = require("fs");

  _fs = function _fs() {
    return data;
  };

  return data;
}

var _getNamespace = _interopRequireDefault(require("./getNamespace"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getClassModels(opts) {
  return _umi().utils.lodash.uniq(_umi().utils.glob.sync(opts.pattern || "**/*.{ts,tsx,js,jsx}", {
    cwd: opts.base
  }).map(f => (0, _path().join)(opts.base, f)).concat(opts.extraModels || []).map(_umi().utils.winPath)).reduce((target, path) => {
    if (/\.d.ts$/.test(path)) return target;
    if (/\.(test|e2e|spec).(j|t)sx?$/.test(path)) return target;
    const namespace = opts.skipClassModelValidate ? (0, _path().basename)(path, (0, _path().extname)(path)) : (0, _getNamespace.default)({
      content: (0, _fs().readFileSync)(path, {
        encoding: "utf-8"
      })
    });
    if (!namespace) return target;
    target[namespace] = path;
    return target;
  }, {});
}