// 리덕스와 연동된 컨테이너 컴포넌트 작성
import React, { Component } from 'react';
import Counter from 'components/Counter';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as counterActions from 'store/modules/counter';

class CounterContainer extends Component {
  handleIncrement = () => {
    const { CounterActions } = this.props;
    CounterActions.increment();
  }

  handleDecrement = () => {
    // 여러 모듈에서 액션 생성 함수를 참조해야 하게 될 경우
    // 다음과 같이 bindActionCreators 의 결과물을 
    // CounterActions라는 props로 넣어주는 식으로 사용할 수도 있다.
    const { CounterActions } = this.props;
    CounterActions.decrement();
  }
  render() {
    const { handleIncrement, handleDecrement } = this;
    const { number } = this.props;
    return (
      <Counter 
        onIncrement={handleIncrement}
        onDecrement={handleDecrement}
        number={number}
      />
    );
  }
}

// 스토어의 상태를 매개변수로 받아오는 함수
// 컴포넌트에 상태로 넣어줄 props를 반환한다.
// const mapStateToProps = (state) => ({
//   number: state.counter.number
// });

// // dispatch를 매개변수로 받아오는 함수
// // 컴포넌트에 넣어줄 액션 함수들을 반환한다.
// const mapDispatchToProps = (dispatch) => ({
//   increment: () => dispatch(counterActions.increment()),
//   decrement: () => dispatch(counterActions.decrement())
// })
// export default connect(mapStateToProps, mapDispatchToProps)(CounterContainer);

export default connect(
  state => ({
    number: state.counter.number
  }),
  // (dispatch) => ({
  //   increment: () => dispatch(counterActions.increment()),
  //   decrement: () => dispatch(counterActions.decrement()),
  // })

  // bindActionCreators: 여러 모듈에서 액션 생성 함수를 참조해야할 경우 
  // dispatch => bindActionCreators(counterActions, dispatch)
  dispatch => ({
    CounterActions: bindActionCreators(counterActions, dispatch)
  })
)(CounterContainer);