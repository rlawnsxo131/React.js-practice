const jwtSecret = process.env.JWT_SECRET;
const jwt = require('jsonwebtoken');

/**
 * JWT 토큰 생성
 * @param {any} payload
 * @returns {string} token
 */
function generateToken(payload) {
  return new Promise(
    (resolve, reject) => {
      jwt.sign(
        payload,
        jwtSecret,
        {
          expiresIn: '7d'
        }, (error, token) => {
            if(error) reject(error);
            resolve(token, 'account');
        }
      );
    }
  );
};

// 토큰 검증
function decodeToken(token) {
  return new Promise(
    (resolve, reject) => {
      jwt.verify(token, jwtSecret, (error, decoded) => {
        if(error) reject(error);
        resolve(decoded);
      });
    }
  );
}
  




// 토큰 검증 미들웨어
exports.jwtMiddleware = async (req, res, next) => {
  const token = req.cookies.access_token; // req에서 access_token을 읽어온다.

  if(!token) return next(); // 토큰이 없다면 바로 다음작업을 진행.

  try {
    const decoded = await decodeToken(token); // 토큰을 디코딩
    // 토큰 만료일이 하루밖에 안남으면 토큰을 재발급한다.
    if(Date.now() / 1000 - decoded.iat > 60 * 60 * 24) {
      // 하루가 지나면 갱신해준다.
      const { _id, profile } = decoded;
      const freshToken = await generateToken({ _id, profile}, 'account');
      res.cookie('access_token', freshToken, {
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7days,
        httpOnly: true
      });
    }

    //req.user에 디코딩된 값을 넣어준다.
    req.user = decoded;
  } catch (e) {
    // token validate 실패
    req.user = null;
  }

  return next();
}

exports.generateToken = generateToken;
