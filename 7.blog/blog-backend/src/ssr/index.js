//require('browser-env')();
const render = require('./render').default;
const manifest = require('../../../blog-frontend/build/asset-manifest.json');
const fs = require('fs');
const path = require('path');
const sirialize = require('serialize-javascript');

// client용으로 빌드된 react app
const indexHtml = fs.readFileSync(
  path.join(__dirname, '../../../blog-frontend/build/index.html'),
  { encoding: 'utf8'}
);

function createPage(rootHtml, state) {
  // client용으로 빌드된 react app
  let html = indexHtml;
  // manifest 파일의 key 값을 배열로 변환
  const manifestArr = Reflect.ownKeys(manifest)

  // 스플리팅된 자바스크립트
  const chunkScripts = manifestArr
    .filter(script => script.match(/js$/))
    .map(script => `<script src="${script}"></script>`)
    .join('\n');

  // 스플리팅된 스타일
  const chunkStyles = manifestArr
    .filter(style => style.match(/.css$/))
    .map(style => `<link href="${style}" rel="stylesheet">`)
    .join('\n');
  
  // 렌더링된 결과를 root안에 집어넣기
  html = html.replace(
    '<div id="root"></div>',
    `<div id="root">${rootHtml}</div>`
  );
  
  // 메타테그 설정 ( +스플리팅 된 스타일 로딩)
  html = html.replace('</head>', `${chunkStyles}</head>`);

  // 커스텀 스크립트 정의
  const customScripts = `<script>window.__PRELOADED_STATE__ = ${sirialize(state)}</script>`;

  // 커스텀 스크립트 적용 + 스플리팅된 스크립트 로딩
  const mainScript = html.match(
    /<script src="\/static\/js\/main..*.chunk.js"><\/script>/
  )[0];
  
  html = html.replace(
    mainScript,
    `${customScripts}${chunkScripts}${mainScript}`
  );
  return html;
}

module.exports = (ctx) => {
  const location = ctx.path;
  const { html, state } = render(location);
  const page = createPage(html, state);
  ctx.body = page;
}