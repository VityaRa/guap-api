const btn = document.querySelector("button");

function getDay(str) {
  if (str === '0') return 'Понедельник'
  if (str === '1') return 'Вторник'
  if (str === '2') return 'Среда'
  if (str === '3') return 'Четверг'
  if (str === '4') return 'Пятница'
  if (str === '5') return 'Суббота'
}

class BaseComponent {
  constructor(tag, classList) {
    this.element = document.createElement(tag)
    this.element.classList.add(...classList)
  }
  
  remove() {
    this.element.remove()
  }
}



const rootElement = document.getElementById('content')
// ▲
// ▼
class ListItem extends BaseComponent {
  constructor(lessonInfo) {
    super('li', ['list-item']);
    console.log(lessonInfo);
    this.element.innerHTML =  `
      <div class="day-info">
        <p class="lesson__type">${lessonInfo.type}</p>
        ${this.getWeekIcon(lessonInfo)}
        <p class="lesson__number">${lessonInfo.index}</p>
      </div>
     
      <p class="lesson__time">${lessonInfo.time}</p>
      <p class="lesson__title">${lessonInfo.name}</p>
      <div class="lesson__info">
      </div>
    `
  }

  getWeekIcon(weekInfo) {
    let weekClass = 'lesson__default'
    let weekType = ''
    if (weekInfo.weekType === 'upper') {
      weekType = '▲'
      weekClass = 'lesson__week__upper'
    } 
    if (weekInfo.weekType === 'bottom') {
      weekType = '▼'
      weekClass = 'lesson__week__bottom'
    } 
    return `<p class="lesson__week ${weekClass}">${weekType}</p>`
  }
}

class DayList extends BaseComponent {
  constructor(dayName, dayInfo) {
    super('ul', ['day-list']);

    const title = new BaseComponent('h3', ['day-title'])
    title.element.innerHTML = dayName
    this.element.appendChild(title.element)

    dayInfo.forEach(lessonInfo => {
      this.element.appendChild(new ListItem(lessonInfo).element)
    })
  }


}

//List takes data and contains all day lists
class List extends BaseComponent {
  constructor(data) {
    super('div', ['list']);
    for (let dayName in data) {
      this.element.appendChild(new DayList(dayName, data[dayName]).element)
    }

  }
}


const deletePrev = () => {
  if (!rootElement.hasChildNodes) return
  else rootElement.innerHTML = ''
}

const addNew = (data) => {
  const list = new List(data)
  rootElement.appendChild(list.element)
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
            console.log(data);
            render(data)
            
          });
        })
        .catch(function (err) {
          console.log("Fetch Error :-S", err);
          alert('Такой группы нет...')
        });
    } catch (e) {
      console.log("fetch failed...");
      console.log(e);
    }
    console.log(`ended fetching...`);
  })();
});



