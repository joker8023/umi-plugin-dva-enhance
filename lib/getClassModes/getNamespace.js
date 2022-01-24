"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getNamespace;

function _umi() {
  const data = require("umi");

  _umi = function _umi() {
    return data;
  };

  return data;
}

const traverse = _umi().utils.traverse;

function getNamespace({
  content
}) {
  const parser = _umi().utils.parser;

  const ast = parser.parse(content, {
    sourceType: "module",
    plugins: ["typescript", "classProperties", "dynamicImport", "exportDefaultFrom", "exportNamespaceFrom", "functionBind", "nullishCoalescingOperator", "objectRestSpread", "optionalChaining", "decorators-legacy"]
  });
  let namespace = "";
  traverse.default(ast, {
    ClassDeclaration(path) {
      if (path.node.decorators && path.node.decorators.length > 0) {
        path.node.decorators.some(decorator => {
          const properties = decorator.expression && decorator.expression.arguments.length === 1 ? decorator.expression.arguments[0].properties : [];
          const property = properties.find(property => property.key.name === "namespace");

          if (property) {
            namespace = property.value.value;
            return !!namespace;
          }

          return false;
        });
      }
    }

  });
  return namespace;
}