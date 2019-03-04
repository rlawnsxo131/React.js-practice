//require('browser-env')();
const render = require('./render').default;
const fs = require('fs');
const path = require('path');

const indexHtml = fs.readFileSync(
  path.join(__dirname, '../../../blog-frontend/build/index.html'),
  { encoding: 'utf8'}
);

function createPage(rootHtml, bundles, state) {
 

}

module.exports = async (ctx) => {
  const location = ctx.path;
  const rendered = render(location);
  ctx.body = indexHtml; // 임시코드 추후 구현 예정
}