//require('browser-env')();
const render = require('./render').default;
const manifest = require('../../../blog-frontend/build/asset-manifest.json');
const fs = require('fs');
const path = require('path');


// client용으로 빌드된 react app
const indexHtml = fs.readFileSync(
  path.join(__dirname, '../../../blog-frontend/build/index.html'),
  { encoding: 'utf8'}
);

/* index.html에 변화를 일으킨다 */
function buildHtml(rootHtml, preloadedState) {
  // client용으로 빌드된 react app
  let html = indexHtml;
  // manifest 파일의 key 값을 배열로 변환, 미리 불러온 manifest[key]로 매칭
  const manifestArr = Reflect.ownKeys(manifest)

  // 스플리팅된 자바스크립트
  const chunkScripts = manifestArr
    .filter(script => script.match(/js$/))
    .map(script => `<script src="${manifest[script]}"></script>`)
    .join('\n');

  // 스플리팅된 스타일
  const chunkStyles = manifestArr
    .filter(style => style.match(/.css$/))
    .map(style => `<link href="${manifest[style]}" rel="stylesheet">`)
    .join('\n');
  
  // 렌더링된 결과를 root안에 집어넣기
  html = html.replace(
    '<div id="root"></div>',
    `<div id="root">${rootHtml}</div>`
  );
  
  // 메타테그 설정 ( +스플리팅 된 스타일 로딩)
  html = html.replace('</head>', `${chunkStyles}</head>`);

  // 커스텀 스크립트 정의
  const customScripts = `<script>window.__PRELOADED_STATE__ = ${preloadedState}</script>`;


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

module.exports = async (ctx) => {
  try {
    // yarn build:server 빌드결과의 return값 html을 rendered이름으로 사용한다.
    // client쪽 ssr.js 에는 ctx값을 받아 url과 origin 값을 사용하는 것이 명시되어 있다.
    // 즉, render 모듈의 인자로 ctx를 넣어주면 url과 origin 값을 각각 바인딩해 사용한다.
    const { html: rendered, preloadedState } = await render(ctx);
    const page = buildHtml(rendered, preloadedState);
    ctx.body = page;
  } catch(e) {
    console.error(e)
    // 오류가 발생하면 일반 html 응답
    ctx.body = buildHtml({});
  }
}
