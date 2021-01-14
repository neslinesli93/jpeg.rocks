import { h } from "preact";
import Helmet from "preact-helmet";

const About = ({ title }) => {
  return (
    <main>
      <Helmet title={title} />

      <section>
        <h2>How it works?</h2>

        <p>
          JPEG.rocks re-encodes images using a lossy algorithm, so the quality
          looks exactly the same for a human eye, but the size can be reduced by
          a big factor. Under the hood it uses{" "}
          <a href="https://github.com/mozilla/mozjpeg">mozjpeg</a>, a rock solid
          tool that has been in development for many years, and brings it inside
          the browser thanks to{" "}
          <a href="https://webassembly.org/">WebAssembly</a>.
        </p>

        <h2>Why a lossy conversion?</h2>

        <p>
          Because it's a good fit for most usages: the resulting images cannot
          be distinguished from the originals, and the image size improves
          drammatically. However, if you need pixel-perfect results this tool is
          not for you. But we are planning to add lossless re-encoding soon :)
        </p>

        <h2>How can I be sure that images never leave my device?</h2>

        <p>
          JPEG.rocks is{" "}
          <a href="https://github.com/neslinesli93/jpeg.rocks">open source</a>,
          so you can always have a look at how it works and what it does.
          Furthermore, it does not use any kind of persistence storage: no
          cookies, no local storage; it doesn't implement shady techniques using
          service workers.
        </p>

        <p>
          If you want to be 100% sure, you can make a test. Wait for the app to
          be loaded and then unplug your cable or put your device in airplane
          mode. Since JPEG.rocks is implemented entirely as a client-side
          application, it will works as well even without an internet
          connection.
        </p>
      </section>
    </main>
  );
};

export default About;
