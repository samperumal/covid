# CCSSA Triage Guidelines (2 April 2020)

_This tool has not been validated or approved by the CCSSA._
It is intended solely for the use of qualified doctors who are already familiar with the guidelines, and who need an electronic aid to speed up the calculation of Priority Scores for triage management.

This application provides an interactive version of the triage flowchart presented in [1]. Images from [2] are used along with the corresponding Frailty assessment scale.

## Setup

Initialise yarn

```
yarn
```

## Run local

The following command starts a local dev server on http://localhost:1234, with Parcel building, serving and watching.

```
yarn dev
```

## Build

Build a static version of the site to the `dist/` folder.

```
yarn build
```

## Test

Run jest test suite

```
yarn test
```

## Prettier

Run prettier to autoformat all code files changed since the last commit

```
yarn pretty-quick
```

This should mostly be unnecessary since the pre-commit hook will take care of any files staged in git on each commit
