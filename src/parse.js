const btn = document.querySelector("button");

function getDay(str) {
  if (str === '0') return 'Понедельник'
  if (str === '1') return 'Вторник'
  if (str === '2') return 'Среда'
  if (str === '3') return 'Четверг'
  if (str === '4') return 'Пятница'
  if (str === '5') return 'Суббота'
}



// const LessonCard = (props) => {
//   return (  
//     <div className="lesson-card">
//       <h3 className="lesson__number">{props.lessonInfo.index}</h3>
//       <h3 className="lesson__time">{props.lessonInfo.time}</h3>
//       <h3 className="lesson__title">{props.lessonInfo.name}</h3>
//       <h4 className="lesson__week">{props.lessonInfo.weekType}</h4>
//       <div className="lesson__info">

//       </div>
//     </div>
//   )
// }

// const DayItem = (props) => {
//   return (
//     <div className="lesson-day">
//       <h2>{props.title}</h2>
//       {props.dayInfo.map(lesson => (
//         <LessonCard lessonInfo={lesson} key={lesson.index}></LessonCard>
//       ))}
//     </div>
//   )
// }

// const DayList = (props) => {
//   return (
//     <div className="lesson-list">
//       {Object.keys(props.lessonsInfo).map(dayName => (
//         <DayItem key={dayName} dayInfo={props.lessonsInfo[dayName]} title={dayName}></DayItem>
//       ))}
//     </div>
//   )
// }

const rootElement = document.querySelector('#info')

const dayElement = () => {

}

const createElem = (tag, classList) => {
  const element = document.createElement(tag)
  classList.forEach(className => element.classList.add)
}

const deletePrev = () => {
  if (!rootElement.hasChildNodes) return
  else rootElement.innerHTML = 'No info))'
}

const addNew = (data) => {

}

const render = (data) => {
  deletePrev()
  addNew(data)
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
            alert(`Error: ${response.status}`)
            return;
          }
          response.json().then(data => {

            render(data)

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



