
# Kaltura Angular Packages

A set of packages providing common infrastructure for angular based applications connected to the Kaltura platform.

## Packages
Kaltura-ng is a [monorepo](https://developer.atlassian.com/blog/2015/10/monorepos-in-git/) containing several packages:

| Package | Latest Version  |
|:--------|:-------|
| kaltura-client | [![npm version](https://badge.fury.io/js/%40kaltura-ng%2Fkaltura-client.svg)](https://badge.fury.io/js/%40kaltura-ng%2Fkaltura-client) |
| kaltura-common | [![npm version](https://badge.fury.io/js/%40kaltura-ng%2Fkaltura-common.svg)](https://badge.fury.io/js/%40kaltura-ng%2Fkaltura-common) |
| kaltura-ui | [![npm version](https://badge.fury.io/js/%40kaltura-ng%2Fkaltura-ui.svg)](https://badge.fury.io/js/%40kaltura-ng%2Fkaltura-ui) |
| kaltura-primeng-ui | [![npm version](https://badge.fury.io/js/%40kaltura-ng%2Fkaltura-primeng-ui.svg)](https://badge.fury.io/js/%40kaltura-ng%2Fkaltura-primeng-ui) |
**Notes**
- Those packages are being developed along side the [KMC-ng](https://github.com/kaltura/kmc-ng) application.
- The version number listed above represent the latest version deployed to npm for each package. 
  
## Technology stack and conventions
Kaltura Angular libraries use the following technologies and conventions:
* [TypeScript](http://www.typescriptlang.org/) language (superset of Javascript).
* Stylesheets with [SASS](http://sass-lang.com/) (not required, it supports regular css too).
* Error reported with [TSLint](http://palantir.github.io/tslint/) and [Codelyzer](https://github.com/mgechev/codelyzer).
* [Lerna](https://github.com/lerna/lerna) - a tool that optimizes the workflow around managing multi-package repositories with git and npm.
* Best practices in file and application organization for [Angular 2]({https://angular.io/).

## Road map
- [ ] Components Dcoumentation
- [ ] Live demonstration
- [ ] Code documentation
- [ ] Unit-testing

## Quick start

### Prerequisites

- [x] Ensure you have [node.js installed](https://nodejs.org/en/download/current/), version 7.0.0 or above. 
- [x] Ensure you have [git installed](https://git-for-windows.github.io/) 
- [x] Ensure you have npm installed, version 5.0.0 or above.

### Get the sources
Clone the repository and load project dependencies
```bash
# clone our repo
$ git clone https://github.com/kaltura/kaltura-ng.git 

# change directory to your app
$ cd kaltura-ng

# install the dependencies with npm
$ npm install
```


### Setup your repo for local development
As this monorepo holds independent packages that depends on each other, you will need to symlink between them to be able to develop locally.


You need to run the following command to link everything together
```
$ npm run setup
```

this command will run 'lerna' behind the scenes to fetch node_modules for each package and, if needed, create a symlink to dependent packages in this repo.

> To allow this structure and manage complex (dev)op operations without too much hassle we are using '[lerna](https://github.com/lerna/lerna)' which optimizes the workflow around managing multi-package repositories.


# FAQ

## Want to help?
Want to contribute some code?
- Read [CONTRIBUTING.md](CONTRIBUTING.md) to learn more about the contribution process.
- Read [DEVELOPER.md](DEVELOPER.md) for development instructions.

## License and Copyright Information
All code in this project is released under the [AGPLv3 license](http://www.gnu.org/licenses/agpl-3.0.html) unless a different license for a particular library is specified in the applicable library path.

Copyright © Kaltura Inc. All rights reserved.
