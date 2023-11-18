# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.4.2](https://github.com/damingerdai/ngx-apexcharts/compare/v0.4.1...v0.4.2) (2023-11-18)


### Features

* **schematics:** ng update command support update apexcharts version ([d34c90b](https://github.com/damingerdai/ngx-apexcharts/commit/d34c90bc5af9b3853e8455f71f5f1d675252ee42))
* **schematics:** ngx-apexcharts should be dependencies for ng-add schematics ([75a9fa7](https://github.com/damingerdai/ngx-apexcharts/commit/75a9fa7789185d58a3f69646f93723a83e95a977))

### [0.4.1](https://github.com/damingerdai/ngx-apexcharts/compare/v0.4.0...v0.4.1) (2023-11-15)


### Features

* **schematics:** set packageGroupName ngx-apexcharts for ng-update schematics ([074f3b4](https://github.com/damingerdai/ngx-apexcharts/commit/074f3b45aa77b1949d4b72dfc10714d495ca5c22))

## [0.4.0](https://github.com/damingerdai/ngx-apexcharts/compare/v0.3.3...v0.4.0) (2023-11-15)


### ⚠ BREAKING CHANGES

* stop supporting angular v13. v14 is the mini supported version now.
* stop support for node v16.

### Features

* add standalone component support ([#69](https://github.com/damingerdai/ngx-apexcharts/issues/69)) ([d3605f1](https://github.com/damingerdai/ngx-apexcharts/commit/d3605f1803455de1ed3e8e82d9b4891722faa2af))
* bump angular from 16.2.7 to 17.0.2 ([#70](https://github.com/damingerdai/ngx-apexcharts/issues/70)) ([98fe0b3](https://github.com/damingerdai/ngx-apexcharts/commit/98fe0b38470e633b720058c3b95519a143a34292))
* bump apexcharts to 3.44.0 ([#74](https://github.com/damingerdai/ngx-apexcharts/issues/74)) ([b2d0f9b](https://github.com/damingerdai/ngx-apexcharts/commit/b2d0f9bf1d4913b589dbac8406a81b3bc6ee1a3a))
* **schematics:** schematics will not included unit test code ([58e7373](https://github.com/damingerdai/ngx-apexcharts/commit/58e7373551af0f1f01273dc879ee52be3e9605c4))


### Bug Fixes

* **deps:** update dependency @schematics/angular to v16.1.5 ([#40](https://github.com/damingerdai/ngx-apexcharts/issues/40)) ([e4abe6a](https://github.com/damingerdai/ngx-apexcharts/commit/e4abe6a77b0452a467caa0723c67685c0b3b6cca))
* **deps:** update dependency apexcharts to v3.42.0 ([#56](https://github.com/damingerdai/ngx-apexcharts/issues/56)) ([7126276](https://github.com/damingerdai/ngx-apexcharts/commit/7126276534aaac4ba6e6ee516f1233dc72cb47ed))
* **deps:** update dependency tslib to v2.6.2 ([#53](https://github.com/damingerdai/ngx-apexcharts/issues/53)) ([9715573](https://github.com/damingerdai/ngx-apexcharts/commit/97155739540e6c2b57ba57d5b56034ffaeab6499))


### build

* drop node 16 support ([#72](https://github.com/damingerdai/ngx-apexcharts/issues/72)) ([6b5bbaa](https://github.com/damingerdai/ngx-apexcharts/commit/6b5bbaa7c2d9d682b9e96d83ecd19c7f9309572f)), closes [#71](https://github.com/damingerdai/ngx-apexcharts/issues/71)

### [0.3.3](https://github.com/damingerdai/ngx-apexcharts/compare/v0.3.2...v0.3.3) (2023-07-21)


### Features

* bump angular from 16.1.1 to 16.1.6 ([fac4f89](https://github.com/damingerdai/ngx-apexcharts/commit/fac4f89e69264140c2e48d9a9902b1b5e0916a76))
* update model type ([da86f1f](https://github.com/damingerdai/ngx-apexcharts/commit/da86f1f8fb75beec483cfb03994de69beb312994))


### Bug Fixes

* **deps:** update dependency rxjs to v7 ([#38](https://github.com/damingerdai/ngx-apexcharts/issues/38)) ([f169d36](https://github.com/damingerdai/ngx-apexcharts/commit/f169d36043e56eb6a8e5f82d2378c862451f60ab))
* **deps:** update dependency tslib to v2.6.0 ([#44](https://github.com/damingerdai/ngx-apexcharts/issues/44)) ([b07f7f7](https://github.com/damingerdai/ngx-apexcharts/commit/b07f7f7f24420f4a6e3d19714a4e6e182f5e701b))

### [0.3.2](https://github.com/damingerdai/ngx-apexcharts/compare/v0.3.1...v0.3.2) (2023-06-15)


### Bug Fixes

* add schema.json into library ([99cbf5f](https://github.com/damingerdai/ngx-apexcharts/commit/99cbf5f1a64c805ef13f14eed50cb8522099d64c))

### [0.3.1](https://github.com/damingerdai/ngx-apexcharts/compare/v0.3.0...v0.3.1) (2023-06-15)


### Bug Fixes

* copy collection.json to dist folder to fix ng add error ([fb8a5f4](https://github.com/damingerdai/ngx-apexcharts/commit/fb8a5f4e6ea6da9fe038df227c750dcbaf821043))
* **deps:** update dependency rxjs to ~6.6.0 ([#27](https://github.com/damingerdai/ngx-apexcharts/issues/27)) ([859709c](https://github.com/damingerdai/ngx-apexcharts/commit/859709c85624fd68f74a6f6efe6dd3956d3b032b))

## [0.3.0](https://github.com/damingerdai/ngx-apexcharts/compare/v0.2.0...v0.3.0) (2023-06-14)


### Features

* add ng-add schematics support ([#19](https://github.com/damingerdai/ngx-apexcharts/issues/19)) ([c9aa42a](https://github.com/damingerdai/ngx-apexcharts/commit/c9aa42a1e4bcf1abbdad9502ec868a95321e2a68))
* add node20 support ([#20](https://github.com/damingerdai/ngx-apexcharts/issues/20)) ([90db1e0](https://github.com/damingerdai/ngx-apexcharts/commit/90db1e0abfedc8079f6d5779b6e7c13d1722bcc5))
* bump angular from 16.0.1 to 16.1.0 ([f896be8](https://github.com/damingerdai/ngx-apexcharts/commit/f896be8b751f1afa0ff0dadcaebbf740fc8b6081))
* update ApexChart type with ng-apexcharts@v1.7.7 ([96a180d](https://github.com/damingerdai/ngx-apexcharts/commit/96a180dfaf8777ef582beeb9617fe2e96159385e))

## [0.2.0](https://github.com/damingerdai/ngx-apexcharts/compare/v0.1.2...v0.2.0) (2023-05-28)


### Features

* bump angular from 15.0.0 to 16.0.0 ([#5](https://github.com/damingerdai/ngx-apexcharts/issues/5)) ([4bf7ea5](https://github.com/damingerdai/ngx-apexcharts/commit/4bf7ea5a7611d5c6ce643099374f7faae263fc4f))

### [0.1.2](https://github.com/damingerdai/ngx-apexcharts/compare/v0.1.1...v0.1.2) (2023-05-17)

### [0.1.1](https://github.com/damingerdai/ngx-apexcharts/compare/v0.1.0...v0.1.1) (2022-11-17)


### Features

* bump angular v15 ([0835382](https://github.com/damingerdai/ngx-apexcharts/commit/0835382c089bafad9058210b0e92dbf9e156c8dc))
* bump apexcharts from 3.30.0 to 3.36.3 ([405a4a0](https://github.com/damingerdai/ngx-apexcharts/commit/405a4a04dd7bc31292a5ae5c5c7899d183577d83))

## [0.1.0](https://github.com/damingerdai/ngx-apexcharts/compare/v0.0.1...v0.1.0) (2022-08-08)


### Features

* add `forecastDataPoints` ([c393ab7](https://github.com/damingerdai/ngx-apexcharts/commit/c393ab7fdd0f3216dc794b52ed085ab0966c7db6))
* add `group` type ofr apex type ([cb85453](https://github.com/damingerdai/ngx-apexcharts/commit/cb85453c3e8753987de0b58a71a29a930b3e2394))
* add fill options in stroke ([86a21da](https://github.com/damingerdai/ngx-apexcharts/commit/86a21da62fe43f989c246e6215c6c96892819a65))
* add types for the locale option ([603b394](https://github.com/damingerdai/ngx-apexcharts/commit/603b39426199c604e7d2411a6cb42d38507090b7))
* bump angular eslint from 12.7.0 to 13.5.0 ([#2](https://github.com/damingerdai/ngx-apexcharts/issues/2)) ([d8fa7e6](https://github.com/damingerdai/ngx-apexcharts/commit/d8fa7e66628c85fbad4909869959a1ceb379ea84))
* Run all methods outside of ngZone ([3bbb912](https://github.com/damingerdai/ngx-apexcharts/commit/3bbb912c21d2396e72abd4060767cee569d17c0f))
* update types for ApexFill ([d661a5b](https://github.com/damingerdai/ngx-apexcharts/commit/d661a5b58d1429a1d2d4e75b957e2c4c8725b248))


### Bug Fixes

* fix types for xaxis group ([119409e](https://github.com/damingerdai/ngx-apexcharts/commit/119409ee1313cfc707ed2bd718b7da13295e3ce1))

### 0.0.1 (2022-01-25)


### Features

* Added support for type 'string'  ([1b15d71](https://github.com/damingerdai/ngx-apexcharts/commit/1b15d7182a86f09adce60be7b95c808ed335908a))
