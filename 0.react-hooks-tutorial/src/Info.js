import React from 'react';
import useInputs from './useInputs';

const Info = () => {
  /**
   * useReducer를 분리시킨 hooks에서 내보낸 state, onChange를 가져온다.(useInputs 함수를 내보냄);
   * initialState(initialForm) 값으로 name, nickname 값을 넣어준다.
   */
  const [state, onChange] = useInputs({
    name: '',
    nickname: ''
  });
  /**
   * state에 초깃 값으로 입력한 name과 state를 가져와 input태그에 value 값으로 연결 해준다.
   * 아울러 상단에서 가져온 onChange값도 연결해준다.(onChange 안에 dispatch로 action을 전달해주는 로직이 있다.)
   */
  const { name, nickname } = state;

  return (
    <div>
      <div>
        <input name="name" value={name} onChange={onChange} />
        <input name="nickname" value={nickname} onChange={onChange} />
      </div>
      <div>
        <div>
          <b>이름:</b> {name}
        </div>
        <div>
          <b>닉네임: </b>
          {nickname}
        </div>
      </div>
    </div>
  );
};

export default Info;
