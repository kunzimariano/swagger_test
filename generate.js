var fs = require('fs');
var CodeGen = require('swagger-js-codegen').CodeGen;

var file = 'swagger.json';
var swagger = JSON.parse(fs.readFileSync(file, 'UTF-8'));
var nodejsSourceCode = CodeGen.getNodeCode({ className: 'Test', swagger: swagger });
var angularjsSourceCode = CodeGen.getAngularCode({ className: 'Test', swagger: swagger });
var tsSourceCode = CodeGen.getTypescriptCode({ className: 'Test', swagger: swagger, imports: ['../../typings/tsd.d.ts'] });

fs.writeFile('output.node.js', nodejsSourceCode);
fs.writeFile('output.angular.js', angularjsSourceCode);
fs.writeFile('output.typescript.ts', tsSourceCode);
