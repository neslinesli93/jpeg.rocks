import Worker from "comlink-loader!./wasm.worker";

const worker = new Worker();
let instance = null;

export async function init() {
  if (instance === null) {
    instance = await new worker.JpegConverter();
    await instance.init();
  }
}

export function convert(data) {
  return instance.convert(data);
}
