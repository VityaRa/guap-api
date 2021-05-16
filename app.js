'use strict';

const e = React.createElement;

function getDay(str) {
    if (str === '0') return 'Понедельник'
    if (str === '1') return 'Вторник'
    if (str === '2') return 'Среда'
    if (str === '3') return 'Четверг'
    if (str === '4') return 'Пятница'
    if (str === '5') return 'Суббота'
}
  

class Content extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return e(
        <div>
            <h2>HELLO</h2>
        </div>
    )
  }
}

const domContainer = document.querySelector('#content');
ReactDOM.render(e(LikeButton), domContainer);