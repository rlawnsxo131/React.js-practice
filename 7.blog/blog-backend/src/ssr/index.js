//require('browser-env')();
const render = require('./render').default;
const fs = require('fs');

const indexHtml = fs.readFileSync(
  path.resolve(__dirname, render),
  'utf8'
);

function createPage(rootHtml, bundles, state) {
  let html = indexHtml;

  //스플리팅된 자바스크립트
  const chunkScripts = bundles
    .filter(bundle => bundle.file.match(/.js$/))
    .map(bundle => `<script src="${bundle.publickPath}"></script>`)
    .join('\n');
}
