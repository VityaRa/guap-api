const btn = document.querySelector("button");
const textField = document.querySelector(".info");

function getDay(str) {
  if (str === '0') return 'Понедельник'
  if (str === '1') return 'Вторник'
  if (str === '2') return 'Среда'
  if (str === '3') return 'Четверг'
  if (str === '4') return 'Пятница'
  if (str === '5') return 'Суббота'
}



const LessonCard = (props) => {
  return (  
    <div className="lesson-card">
      <h3 className="lesson__number">{props.lessonInfo.index}</h3>
      <h3 className="lesson__time">{props.lessonInfo.time}</h3>
      <h3 className="lesson__title">{props.lessonInfo.name}</h3>
      <h4 className="lesson__week">{props.lessonInfo.weekType}</h4>
      <div className="lesson__info">

      </div>
    </div>
  )
}

const DayItem = (props) => {
  return (
    <div className="lesson-day">
      <h2>{props.title}</h2>
      {props.dayInfo.map(lesson => (
        <LessonCard lessonInfo={lesson} key={lesson.index}></LessonCard>
      ))}
    </div>
  )
}

const DayList = (props) => {
  return (
    <div className="lesson-list">
      {Object.keys(props.lessonsInfo).map(dayName => (
        <DayItem key={dayName} dayInfo={props.lessonsInfo[dayName]} title={dayName}></DayItem>
      ))}
    </div>
  )
}

btn.addEventListener("click", () => {
  (async function () {
    console.log("started fetching...");

    try {
      fetch("https://vicorp-node-server.herokuapp.com/", {
        method: "GET",
      })
        .then(response => {
          if (response.status !== 200) {
            ReactDOM.render(
              <h2>Error</h2>,
              document.getElementById('content')
            );
            return;
          }
          response.json().then(data => {

            console.log(`lessonsInfo: `);
            console.log(data['Понедельник']);
            ReactDOM.render(
              <DayList lessonsInfo={data}></DayList>,
              document.getElementById('content')
            );

          });
        })
        .catch(function (err) {
          alert('Такой группы нет...')
          console.log("Fetch Error :-S", err);
        });
    } catch (e) {
      console.log("fetch failed...");
      console.log(e);
    }
    console.log(`ended fetching...`);
  })();
});



