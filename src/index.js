import { legacy_createStore as createStore } from 'redux';

const add = document.getElementById('addBtn');
const minus = document.getElementById('minusBtn');
const number = document.querySelector('span');

// reducer는 함수이다.
// 첫번째 인자값은 currentState임. state를 초기화할 수 있음.
// 두번쨰 인자값인 action으로 reducer를 변경할 수 있음.
// 리턴값은 state가 된다.

// 방어 코드
const ADD = 'ADD';
const MINUS = 'MINUS';

// count는 현재의 state를 말함. 즉, 누적됨.
const countModifier = (count = 0, action) => {
  // if else문보다 switch가 가독성도 좋고, 성능도 좋음! => 오....
  switch (action.type) {
    case ADD:
      return count + 1;
    case MINUS:
      return count - 1;
    default:
      return count;
  }
};

// store에 reducer을 저장. (data 저장)
const countStore = createStore(countModifier);

// state 업데이트
const onChange = () => {
  number.innerText = countStore.getState();
};

// store 변화 감지.
countStore.subscribe(onChange);

// console.log(countStore);
// {dispatch: ƒ, subscribe: ƒ, getState: ƒ, replaceReducer: ƒ}

// 1. reducer에게 action 전송 : dispatch(action은 반드시 object여야함!, 그리고 무조건 type이 있어야함. => property 이름을 바꿀 수 없음.)
// 2. subscribe : store 안에 있는 변화들을 알려줌.

// countStore.dispatch({ type: 'ADD' });
// countStore.dispatch({ type: 'ADD' });
// countStore.dispatch({ type: 'ADD' });
// countStore.dispatch({ type: 'ADD' });
// countStore.dispatch({ type: 'ADD' });
// countStore.dispatch({ type: 'MINUS' });

const handleAddBtn = () => {
  countStore.dispatch({ type: 'ADD' });
};

const handleMinusBtn = () => {
  countStore.dispatch({ type: 'MINUS' });
};

add.addEventListener('click', handleAddBtn);
minus.addEventListener('click', handleMinusBtn);
