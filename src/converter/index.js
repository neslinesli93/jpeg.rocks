import Worker from "comlink-loader!./wasm.worker";

let instance = null;

export async function init() {
  if (instance === null) {
    const worker = new Worker();
    const converter = await new worker.JpegConverter();
    await converter.init();

    instance = converter;
  }
}

export function convert(data, orientation, quality) {
  return instance.convert(data, orientation, quality);
}
