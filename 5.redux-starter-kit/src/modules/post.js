import { handleActions, createAction } from 'redux-actions';

import axios from 'axios';
import { pender } from 'redux-pender/lib/utils';

function getPostAPI(postId) {
    return axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`);
}

const GET_POST = 'GET_POST';
/*
 redux-pender의 액션 구조는 Flux standard action(https://github.com/acdlite/flux-standard-action)
 를 따르기 때문에, createAction으로 액션을 만들 수 있다.
 두 번째로 들어가는 파라미터는 Promise를 반환하는 함수여야 한다.
*/
export const getPost = createAction(GET_POST, getPostAPI);

const initialState = {
    //요청이 진행중인지, 오류가 발생했는지 여부는 더이상 직접 관리할 필요가 없다.
    //penderReducer가 담당하기 때문이다.
    data: {
        title: '',
        doby: ''
    }
}

export default handleActions({
    ...pender({
        type: GET_POST, //type이 주어지면 이 type에 접미사를 붙인
                        //액션 핸들러들이 담긴 객체를 만든다.
        /*요청 중일 때와 실패했을 때 추가로 해야 할 작업이 있다면
          이렇게 onPending 과 onFailure를 추가하면 된다.
          onPending: (state, action) => state,
          onFailure: (state, action) => state
        */
       onSuccess: (state, action) => {
           //성공했을 때 해야 할 작업이 따로 없으면 이 함수 또한 생략해도 된다.
           const { title, body } = action.payload.data;
           return {
               data: {
                   title,
                   body
               }
           }
       }
       //함수를 생략했을 때 기본 값으로는 (state, action) => state를 설정한다.
       //(state를 그대로 반환한다는 것이다.)
    })
}, initialState);


//redux-thunk && react-promise-middleware
/* 
const GET_POST = 'GET_POST'; // react-promise-middleware
const GET_POST_PENDING = 'GET_POST_PENDING';
const GET_POST_SUCCESS = 'GET_POST_SUCCESS';
const GET_POST_FAILURE = 'GET_POST_FAILURE';

const getPostPending = createAction(GET_POST_PENDING);
const getPostSuccess = createAction(GET_POST_SUCCESS);
const getPostFailure = createAction(GET_POST_FAILURE);

export const getPost = (postId) => ({ //react-promise-middleware
    type: GET_POST,
    payload: getPostAPI(postId)
});
*/

//redux-thunk
/*
export const getPost = (postId) => dispatch => {
    //먼저 요청이 시작했다는 것을 알린다.
    dispatch(getPostPending());

    //요청을 시작한다. 여기에서 만든 promise를 return해야 나중에 컴포넌트에서
    //호출할 때 getPost().then(...)을 할 수 있다.
    return getPostAPI(postId).then((response) => {
        
        //요청이 성공했다면 서버 응답 내용을 payload로 설정하여
        //GET_POST_SUCCESS 액션을 디스패치한다.
        dispatch(getPostSuccess(response))

        //나중에 getPostAPI.then을 했을 때 then에 전달하는
        //함수에서 response에 접근할 수 있게 한다.
        return response;
    
    }).catch(error => {
        //오류가 발생하면 오류 내용을 payload로 설정하여
        //GET_POST_FAILURE 액션을 디스패치 한다.
        dispatch(getPostFailure(error));
        
        //error를 throw하여 이 함수를 실행한 후
        //다시 한 번 catch를 할 수 있게 한다.
        throw(error);
    })
}
*/

//redux-thunk && redux-promise-middleware
/* 
export default handleActions({
    [GET_POST_PENDING]: (state, action) => {
        return {
            ...state,
            pending: true,
            error: false
        };
    },
    [GET_POST_SUCCESS]: (state, action) => {
        const { title, body } = action.payload.data;

        return {
            ...state,
            pending: false,
            data: {
                title,
                body
            }
        };
    },
    [GET_POST_FAILURE]: (state, action) => {
        return {
            ...state,
            pending: false,
            error: true
        }
    }
}, initialState);
*/