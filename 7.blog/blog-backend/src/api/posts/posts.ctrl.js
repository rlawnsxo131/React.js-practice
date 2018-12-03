const Post = require('models/post');

/* POST /api/posts
   { title, body, tags }
*/
exports.write = async (ctx) => {
  const { title, body, tags } = ctx.request.body;

  //새 인스턴스를 만든다.
  const post = new Post({
    title, body, tags
  });

  try {
    await post.save(); //데이터베이스에 등록한다.
    ctx.body = post; //저장된 결과를 반환한다.
  } catch(e) {
      //데이터베이스에 오류가 발생한다.
      ctx.throw(e, 500);
  }
};

/* GET api/posts
*/
exports.list = async (ctx) => {
  try {
      const posts = await Post.find({});
      ctx.body = posts;
  } catch(e) {
      ctx.throw(e, 500)
  }
};

/* GET /api/posts.js -read
 */
exports.read = async (ctx) => {
  const { id } = ctx.params;
  try {
    const post = await Post.findById(id).exec();
    //포스트가 존재하지 않는다.
    if(!post) {
        ctx.status = 404;
        return;
    }
    ctx.body = post;
  } catch(e) {
    ctx.throw(e, 500);
  }
};

exports.remove = (ctx) => {
};

exports.update = (ctx) => {
};
