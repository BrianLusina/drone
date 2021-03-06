#!/usr/bin/env node
'use strict';

const Chalk = require('chalk');
const log = console.log;
const hive = require('../handlers/hive');
const Utils = require('../utils/utils');
const Log = require('../utils/log_utils');
const QuickSearch = require('../handlers/quick_search');

// Main code //
const self = module.exports = {
  init: (input) => {

    const term = input[0]
    QuickSearch.searchWithMatches(term)
      .then(result => {
        if (result.bestMatch.rating === 1) {
          hive.getWithVersions(result.bestMatch.target)
            .then(info => {
              Utils.printInfo(info);          
            });
        } else {
          QuickSearch.showSuggestionsIfPresent(result.ratings, term)
        }
      });
  },
  print: pair => {
    hive.get(pair)
      .then(info => {
        Utils.printInfo(info);
      })
      .catch(err => {
        Utils.suggestCreation(pair);
      });
  }
};
