'use strict';
var util = require('util');
var path = require('path');
var spawn = require('child_process').spawn;
var yeoman = require('yeoman-generator');
var _ = require('underscore.string');

var AppGenerator = module.exports = function Appgenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  // setup the test-framework property, Gruntfile template will need this
  this.testFramework = options['test-framework'] || 'mocha';

  // for hooks to resolve on mocha by default
  if (!options['test-framework']) {
    options['test-framework'] = 'mocha';
  }

  // resolved to mocha by default (could be switched to jasmine for instance)
  this.hookFor('test-framework', { as: 'app' });

  //this.indexFile = this.readFileAsString(path.join(this.sourceRoot(), 'index.html'));
  this.mainCoffeeFile = 'console.log "\'Allo from CoffeeScript!"';

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(AppGenerator, yeoman.generators.Base);

AppGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // welcome message
  console.log(this.yeoman);
  console.log('Out of the box I include HTML5 Boilerplate, jQuery and Modernizr.');

  var prompts = [{
    name: 'masterName',
    message: 'What is the name of your master file?'
  },
  {
    type: 'confirm',
    name: 'compassBootstrap',
    message: 'Would you like to include Twitter Bootstrap for Sass?',
    default: true
  },
  {
    name: 'webDav',
    message: "Where would you like to deploy to? (/path/to/WebDav or ENV_VARIABLE)"
  }
  ];

  this.prompt(prompts, function (props) {
    // manually deal with the response, get back and store the results.
    // we change a bit this way of doing to automatically do this in the self.prompt() method.
    this.compassBootstrap = props.compassBootstrap;
    this.masterName = props.masterName;
    this.masterSlug = _.slugify(this.masterName);
    this.webDav = props.webDav ? {
      type: (/^[A-Z]+(_[A-Z]+)*$/.test(props.webDav) ? "env" : "path"),
      value: props.webDav
    } : null;

    cb();
  }.bind(this));
};

AppGenerator.prototype.gruntfile = function gruntfile() {
  this.template('Gruntfile.coffee');
};

AppGenerator.prototype.packageJSON = function packageJSON() {
  this.template('_package.json', 'package.json');
};

AppGenerator.prototype.git = function git() {
  this.copy('gitignore', '.gitignore');
  this.copy('gitattributes', '.gitattributes');
};

AppGenerator.prototype.bower = function bower() {
  this.copy('bowerrc', '.bowerrc');
  this.copy('_bower.json', 'bower.json');
};

AppGenerator.prototype.jshint = function jshint() {
  this.copy('jshintrc', '.jshintrc');
};

AppGenerator.prototype.editorConfig = function editorConfig() {
  this.copy('editorconfig', '.editorconfig');
};

AppGenerator.prototype.h5bp = function h5bp() {
  this.copy('favicon.ico', 'app/images/favicon.ico');
};

AppGenerator.prototype.bootstrapImg = function bootstrapImg() {
  if (this.compassBootstrap) {
    this.copy('glyphicons-halflings.png', 'app/images/glyphicons-halflings.png');
    this.copy('glyphicons-halflings-white.png', 'app/images/glyphicons-halflings-white.png');
  }
};

AppGenerator.prototype.bootstrapJs = function bootstrapJs() {
  // TODO: create a Bower component for this
  if (this.compassBootstrap) {
    this.copy('bootstrap.js', 'app/scripts/vendor/bootstrap.js');
  }
};

AppGenerator.prototype.mainStylesheet = function mainStylesheet() {
  if (this.compassBootstrap) {
    this.copy('main.scss', 'app/styles/main.scss');
  } else {
    this.copy('main.css', 'app/styles/main.css');
  }
};

AppGenerator.prototype.jadeFiles = function jadeFiles() {
  this.template('master.jade', 'app/jade/' + this.masterSlug + '.jade');
  this.template('layout.jade', 'app/jade/layout.jade');
  this.template('_s4-containers.jade', 'app/jade/includes/_s4-containers.jade');
};

AppGenerator.prototype.app = function app() {
  this.mkdir('app');
  this.mkdir('app/scripts');
  this.mkdir('app/styles');
  this.mkdir('app/images');
  this.mkdir('app/jade');
  this.mkdir('app/jade/includes');
  this.write('app/scripts/hello.coffee', this.mainCoffeeFile);
};
