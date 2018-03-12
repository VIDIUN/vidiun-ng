# Change Log

All notable changes to this project will be documented in this file.
See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="2.0.0"></a>
# [2.0.0](https://github.com/kaltura/kaltura-ng/compare/@kaltura-ng/kaltura-logger@1.0.0...@kaltura-ng/kaltura-logger@2.0.0) (2018-03-04)


### Features

* upgrade stack to angular@5 ([80736ff](https://github.com/kaltura/kaltura-ng/commit/80736ff))


### BREAKING CHANGES

* upgrading from v4 to v5 required multiple changes in build scripts and some code adjustments




<a name="1.0.0"></a>
# [1.0.0](https://github.com/kaltura/kaltura-ng/compare/@kaltura-ng/kaltura-logger@0.1.0...@kaltura-ng/kaltura-logger@1.0.0) (2018-02-05)


### Features

* extend tooltip component api, logger api and filters service api ([fb8c332](https://github.com/kaltura/kaltura-ng/commit/fb8c332))
* improve server polling logic and extend kaltura logger ([#73](https://github.com/kaltura/kaltura-ng/issues/73)) ([bc11630](https://github.com/kaltura/kaltura-ng/commit/bc11630))


### BREAKING CHANGES

* Server polling now requires an override of method '_canExecute'
* previously the list filter item and group filter item held the tooltip and label of the filtered item. Now the list filter item hold the id/value only.




<a name="0.1.0"></a>
# 0.1.0 (2017-12-19)


### Features

* add list filters infrastructure ([a209512](https://github.com/kaltura/kaltura-ng/commit/a209512))
