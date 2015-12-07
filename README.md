# Flickr Gallery

## Installation instructions

Install Node.js 4 or newer; run:

```
npm -g install grunt-cli
```

To build the project and run the server, invoke:

```
grunt serve
```

This runs linters & unit tests on each file modification. To skip the unit tests use:

```
grunt serve:notTested
```

To just build the app:

```
grunt build
```

After building, the app can be run via a static server in the directory `app`.

To run tests in Chrome & Firefox use:

```
grunt test
```
