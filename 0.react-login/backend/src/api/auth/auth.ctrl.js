const Joi = require('joi');
const Account = require('models/Account');

// 로컬 회원 가입
exports.localRegister = async (req, res, next) => {
  const schema = Joi.object().keys({
    username: Joi.string().alphanum().min(4).max(15).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6)
  });

  const result = Joi.validate(req.body, schema);
  
  //스키마 검증 실패
  if(result.error) {
    res.status(400);
    return;
  }

  // 아이디 / 이메일 중복 체크
  let existing = null;
  try {
    existing = await Account.findByEmailOrUsername(req.body);
  } catch (e) {
    res.status(500);
    throw new Error(e);
  }

  let account = null;
  try {
    account = await Account.localRegister(req.body);
  } catch (e) {
    res.status(500);
    throw new Error(e);
  }

  let token = null;
  try {
    token = await account.generateToken();
  } catch (e) {
    res.status(500);
    throw new Error(e);
  }
  
  res.cookie('access_token', token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 7});
  res.send(account.profile); // 프로필 정보로 응답한다.
}

// 로컬 로그인
exports.localLogin = async (req, res, next) => {
  const schema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  });

  const result = Joi.validate(req.body, schema);

  if(result.error) {
    res.status(400); // Bad Request
    return;
  }

  const { email, password } = req.body;

  let account = null;
  try {
    account = await Account.findByEmail(email);
  } catch (e) {
    res.status(500);
    throw new Error(e);
  }

  if(!account || !account.validatePassword(password)) {
    // 유저가 존재하지 않거나 || 비밀번호가 일치하지 않으면
    res.status(403); // Forbidden
    return;
  }

  let token = null;
  try {
    token = await account.generateToken();
  } catch (e) {
    res.status(500);
    throw new Error(e);
  }
  res.cookie('access_token', token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 7});
  res.send(account.profile); // 프로필 정보로 응답한다.
}

// 이메일 / 아이디 존재유무 확인
exports.exists = async (req, res, next) => {
  const { key, value } = req.params;
  let account = null;

  try {
    // key에 따라 findByEmail 혹은 findByUsername을 실행한다.
    account = await (key === 'email'? Account.findByEmail(value) : Account.findByUsername(value));
  } catch (e) {
    res.status(500);
    throw new Error(e);
  }
  res.send({
    exists: account !== null
  });
}

// 로그아웃
exports.logout = async (req, res, next) => {
  res.cookie('access_token', null, {
    maxAge: 0,
    httpOnly: true
  });
  res.status(204);
}

exports.check = (req, res, next) => {
  const { user } = req;

  if(!user) {
    res.status(403); // Forbidden
    res.send('user undefined');
    return
  }
  res.send(user.profile);
}

