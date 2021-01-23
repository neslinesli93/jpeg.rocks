import ffi from "@neslinesli93/mozjpeg-wasm/lib/mozjpeg-wasm.js";

// https://stackoverflow.com/questions/60987493/h3-js-in-a-web-worker-document-is-not-defined
global.document = {};

export class JpegConverter {
  constructor() {
    this.Module = null;
    this.initialized = false;
  }

  async init() {
    if (!this.initialized) {
      const Module = await ffi();

      this.Module = Module;
      this.initialized = true;
    }
  }

  async convert(data, orientation, quality) {
    const input = new Uint8Array(data);
    const inputBuffer = this.Module._malloc(
      input.length * input.BYTES_PER_ELEMENT
    );
    this.Module.HEAPU8.set(input, inputBuffer);

    // Deal with possibly different versions of the WASM module:
    // 1) [New] Returns a struct with two u32 fields: pointer and size
    // 2) [Deprecated] Returns a string with "pointer|size"
    try {
      const convert = this.Module.cwrap("new_convert", "number", [
        "number",
        "number",
        "number",
        "number",
      ]);
      const result = convert(inputBuffer, input.length, quality, orientation);

      const outputBuffer = this.Module.HEAPU32[result / 4];
      const resultSize = this.Module.HEAPU32[result / 4 + 1];

      const resultData = new Uint8Array(
        this.Module.HEAPU8.subarray(outputBuffer, outputBuffer + resultSize)
      );

      this.Module._free(inputBuffer);
      this.Module._free(outputBuffer);

      return { resultData, resultSize };
    } catch (error) {
      const convert = this.Module.cwrap("convert", "string", [
        "number",
        "number",
        "number",
        "number",
      ]);
      const result = convert(inputBuffer, input.length, quality, orientation);

      const splitted = result.split("|");
      const outputBuffer = parseInt(splitted[0], 16);
      const resultSize = parseInt(splitted[1], 10);

      const resultData = new Uint8Array(
        this.Module.HEAPU8.subarray(outputBuffer, outputBuffer + resultSize)
      );

      this.Module._free(inputBuffer);

      return { resultData, resultSize };
    }
  }
}
