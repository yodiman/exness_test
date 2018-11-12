# Requirements

* [NodeJS](https://nodejs.org) >=8.10
* [Yarn](https://yarnpkg.com/lang/en/docs/install) >= 1.10.0
* [Compass](http://compass-style.org/install/) >= 1.0.3


# Installation

```bash
yarn
yarn run tsc
```


# Build and Run

## Local dev server

```bash
yarn run dev
```

### Watch and compile typescript files on changes

```bash
yarn run tsw
```


## Build and run Production server

```bash
yarn run production
```


# TSLint

```bash
yarn run tslint
```


# Structure

- `/env` - folder for environment configs
- `/scripts` - sh scripts for building
- `/src` - source code
- `/static` - static server assets and js, css files
- `/webpack` - webpack config files

## SRC folder
- `/client` - client entry point
- `/server` - server entry point
- `/helpers` - some client and server helpers

- `/app/config` - config files
- `/app/interfaces` - common interfaces
- `/app/routes` - app routes
- `/app/theme` - common app styles and scss variables
- `/app/modules` - app modules: DTO, services, interfaces, redux actions and reducers
- `/app/redux` - redux core: main reducer, store, middlewares, some redux helpers
- `/app/ui` - react components: `containers` - routes entry points, `modules` - app modules components, `shared` - common app components
