const loggerMiddleware = store => next => action => {
    //현재 스토어 상태 값 기록
    console.log('현재 상태', store.getState());
    //액션 기록
    console.log('액션', action);

    //액션을 다음 미들웨어 또는 리듀서로 넘긴다.
    const result = next(action);

    //액션 처리 후의 스토어 상태를 기록한다
    console.log('다음 상태', store.getState());
    console.log('\n'); //기록을 구분하려고 비어 있는 줄 프린트

    return result; //여기에서 반환하는 값은 store.dispatch(ACTION_TYPE)했을 때 결과로 설정한다.
}

export default loggerMiddleware; //불러와 사용할 수 있도록 내보낸다.