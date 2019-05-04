const log = require("npmlog");
const path = require('path');
const { readJsonFile } = require("./lib/fs");
const { copyFolders, executeCommand } = require('./lib/fs');
const { rootPath, distPath } = require('./definitions');

function LoadPackageJsonFiles(libraries) {
  libraries.forEach(library =>  {
    library.pkg = readJsonFile(path.resolve(library.sourcePath, 'package.json'));
  })
}

function grabSelectedlibraries(filterByName = null) {
  let adapters = new Set();

  log.verbose('', `grab user selected libraries (${filterByName || 'all libraries'})`);
  if (filterByName) {
    const adapter = Array.from(repositoryLibraries).find(adapter => adapter.name === filterByName);

    if (adapter) {
      adapters.add(adapter);
    } else {
      log.error(`unknown library requested '${filterByName}'`);
    }
  } else {
    adapters = repositoryLibraries;
  }

  return adapters;
}

async function executeNGBuild(libraryName) {
  executeCommand('ng', ['build', libraryName]);
}

async function buildLibraries(libraries) {
  const librariesNames = Array.from(libraries).reduce((result, {name}) => {result.push(name); return result;}, []).join(', ');
  log.verbose('build libraries', librariesNames);
  for (var it = libraries.values(), library= null; library=it.next().value; ) {
    await buildLibrary(library);

  }
  return Promise.resolve();
}

async function buildLibrary(library) {
  const libraryName = library? library.name : null;
  log.info(`build library`, libraryName);
  switch (libraryName) {
    case "@vidiun-ng/vidiun-logger":
      await executeNGBuild('@vidiun-ng/vidiun-logger');
      break;
    case "@vidiun-ng/vidiun-common":
      await executeNGBuild('@vidiun-ng/vidiun-common');
      break;
    case "@vidiun-ng/vidiun-ui": {
      await executeNGBuild('@vidiun-ng/vidiun-ui');
      const source = path.resolve(rootPath, 'projects/vidiun-ng/vidiun-ui/src/styles');
      const target = path.resolve(distPath, 'vidiun-ng/vidiun-ui/styles');
      await copyFolders(source, target);
    }
      break;
    case "@vidiun-ng/vidiun-primeng-ui": {
      await executeNGBuild('@vidiun-ng/vidiun-primeng-ui');
      const source = path.resolve(rootPath, 'projects/vidiun-ng/vidiun-primeng-ui/src/styles');
      const target = path.resolve(distPath, 'vidiun-ng/vidiun-primeng-ui/styles');
      await copyFolders(source, target);
    }
      break;
    case "@vidiun-ng/mc-shared":
      await executeNGBuild('@vidiun-ng/mc-shared');
      break;
    case "@vidiun-ng/mc-theme":
      const cwd = path.resolve(rootPath, 'projects/vidiun-ng/mc-theme');
      executeCommand('node', ['./scripts/build.js'], {cwd});
      break;
    default:
      throw new Error(`missing build instructions for '${libraryName}' (did you forget to add instructions in 'scripts/libraries.js' file?)`);
      break;
  }
}


const vidiunLogger = {
  name: '@vidiun-ng/vidiun-logger',
  sourcePath: path.resolve(rootPath, 'projects/vidiun-ng/vidiun-logger'),
  distPath: path.resolve(distPath, 'vidiun-ng/vidiun-logger'),
  dependencies: new Set(),
  dependents: new Set()
};

const vidiunCommon = {
  name: '@vidiun-ng/vidiun-common',
  sourcePath: path.resolve(rootPath, 'projects/vidiun-ng/vidiun-common'),
  distPath: path.resolve(distPath, 'vidiun-ng/vidiun-common'),
  dependencies: new Set(),
  dependents: new Set()
};

const vidiunUI = {
  name: '@vidiun-ng/vidiun-ui',
  sourcePath: path.resolve(rootPath, 'projects/vidiun-ng/vidiun-ui'),
  distPath: path.resolve(distPath, 'vidiun-ng/vidiun-ui'),
  dependencies: new Set(),
  dependents: new Set()

};

const vidiunPrimeUI = {
  name: '@vidiun-ng/vidiun-primeng-ui',
  sourcePath: path.resolve(rootPath, 'projects/vidiun-ng/vidiun-primeng-ui'),
  distPath: path.resolve(distPath, 'vidiun-ng/vidiun-primeng-ui'),
  dependencies: new Set(),
  dependents: new Set()
}

const mcShared = {
  name: '@vidiun-ng/mc-shared',
  sourcePath: path.resolve(rootPath, 'projects/vidiun-ng/mc-shared'),
  distPath: path.resolve(distPath, 'vidiun-ng/mc-shared'),
  dependencies: new Set(),
  dependents: new Set()
}

const mcTheme = {
  name: '@vidiun-ng/mc-theme',
  sourcePath: path.resolve(rootPath, 'projects/vidiun-ng/mc-theme'),
  distPath: path.resolve(distPath, 'vidiun-ng/mc-theme'),
  dependencies: new Set(),
  dependents: new Set()
}

function updateDependencies(library, dependencies) {
  library.dependencies = dependencies;

  dependencies.forEach(dependency => {
    dependency.dependents.add(library);
  })
}

// TODO should extract peer depenedencies and build order automatically from package.json of libraries
updateDependencies(vidiunUI, [vidiunCommon]);
updateDependencies(vidiunPrimeUI, [vidiunCommon, vidiunUI]);
updateDependencies(mcShared, [vidiunCommon, vidiunUI, vidiunLogger]);

const repositoryLibraries = new Set([vidiunLogger, vidiunCommon, vidiunUI, vidiunPrimeUI, mcShared, mcTheme]);

LoadPackageJsonFiles(repositoryLibraries);

module.exports = { repositoryLibraries, grabSelectedlibraries, buildLibrary, buildLibraries };
