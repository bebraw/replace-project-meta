#!/usr/bin/env node
'use strict';
var prompt = require('prompt');
var replace = require('replace');

if(require.main === module) {
  cli();
}
else {
  module.exports = replaceValues;
}

function cli() {
  var path = require('path');
  var VERSION = require('./package.json').version;
  var cwd = process.cwd();

  var replacementPaths = [
    'LICENSE',
    'README.md',
    'package.json'
  ];

  try {
    var meta = require(path.join(cwd, 'package.json'));
    var originals = {
      author: meta.author,
      user: meta.user,
      project: meta.name
    };
    var schema = {
      properties: {
        author: {
          description: 'Enter package author',
          default: originals.author,
          required: true
        },
        user: {
          description: 'Enter GitHub user/organization name',
          default: originals.user,
          required: true
        },
        project: {
          description: 'Enter GitHub project name',
          default: originals.project,
          required: true
        }
      }
    };

    prompt.start();

    prompt.get(schema, function(err, replacements) {
      if(err) {
        return console.error(err);
      }

      replaceValues(originals, replacements, replacementPaths);
    });
  }
  catch(err) {
    console.error(err);
  }
}

function replaceValues(originals, replacements, replacementPaths) {
  Object.keys(originals).forEach(function(k) {
    var originalValue = originals[k];
    var replacementValue = replacements[k];

    if(originalValue !== replacementValue) {
      console.log('\nreplacing ' + k);

      replace({
        regex: originalValue,
        replacement: replacementValue,
        paths: replacementPaths,
        recursive: false,
        silent: false,
        count: true
      });
    }
  });
}
