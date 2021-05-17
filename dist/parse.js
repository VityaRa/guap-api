import _regeneratorRuntime from "babel-runtime/regenerator";

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var btn = document.querySelector("button");
var textField = document.querySelector(".info");

function getDay(str) {
  if (str === '0') return 'Понедельник';
  if (str === '1') return 'Вторник';
  if (str === '2') return 'Среда';
  if (str === '3') return 'Четверг';
  if (str === '4') return 'Пятница';
  if (str === '5') return 'Суббота';
}

var LessonCard = function LessonCard(props) {
  return React.createElement(
    "div",
    { className: "lesson-card" },
    React.createElement(
      "h3",
      { className: "lesson__number" },
      props.lessonInfo.index
    ),
    React.createElement(
      "h3",
      { className: "lesson__time" },
      props.lessonInfo.time
    ),
    React.createElement(
      "h3",
      { className: "lesson__title" },
      props.lessonInfo.name
    ),
    React.createElement(
      "h4",
      { className: "lesson__week" },
      props.lessonInfo.weekType
    ),
    React.createElement("div", { className: "lesson__info" })
  );
};

var DayItem = function DayItem(props) {
  return React.createElement(
    "div",
    { className: "lesson-day" },
    React.createElement(
      "h2",
      null,
      props.title
    ),
    props.dayInfo.map(function (lesson) {
      return React.createElement(LessonCard, { lessonInfo: lesson, key: lesson.index });
    })
  );
};

var DayList = function DayList(props) {
  return React.createElement(
    "div",
    { className: "lesson-list" },
    Object.keys(props.lessonsInfo).map(function (dayName) {
      return React.createElement(DayItem, { key: dayName, dayInfo: props.lessonsInfo[dayName], title: dayName });
    })
  );
};

btn.addEventListener("click", function () {
  _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log("started fetching...");

            try {
              fetch("https://vicorp-node-server.herokuapp.com/", {
                method: "GET"
              }).then(function (response) {
                if (response.status !== 200) {
                  ReactDOM.render(React.createElement(
                    "h2",
                    null,
                    "Error"
                  ), document.getElementById('content'));
                  return;
                }
                response.json().then(function (data) {

                  console.log("lessonsInfo: ");
                  console.log(data['Понедельник']);
                  ReactDOM.render(React.createElement(DayList, { lessonsInfo: data }), document.getElementById('content'));
                });
              }).catch(function (err) {
                alert('Такой группы нет...');
                console.log("Fetch Error :-S", err);
              });
            } catch (e) {
              console.log("fetch failed...");
              console.log(e);
            }
            console.log("ended fetching...");

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }))();
});