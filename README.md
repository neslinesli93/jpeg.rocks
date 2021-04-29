# [JPEG.rocks](https://jpeg.rocks)

Browser-based JPEG optimizer, using Web Workers and WebAssembly.

[`mozjpeg-wasm`](https://github.com/neslinesli93/mozjpeg-wasm) does the heavy lifting; [`Preact`](https://preactjs.com/) and [`Water.css`](https://watercss.kognise.dev/) do the rest.

## Build from source

Clone the repo, then install the dependencies:

```sh
$ yarn
```

Run a dev server, listening on [http://0.0.0.0:8080](http://0.0.0.0:8080):

```sh
$ yarn dev
```

Or build a static and immediately deployable artifact (in `build/` folder):

```sh
$ yarn build
```
