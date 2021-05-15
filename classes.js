const fetch = require("node-fetch");
const cheerio = require("cheerio");
const express = require("express");

const app = express();
const PORT = process.env.PORT || 80;

const urlToParse = "http://rasp.guap.ru/?g=";
const groupNumber = "222";

const fullUrl = urlToParse + groupNumber;

function isDay(str) {
  return (
    str === "Понедельник" ||
    str === "Вторник" ||
    str === "Среда" ||
    str === "Четверг" ||
    str === "Пятница" ||
    str === "Суббота"
  );
}

function isClassNumber(str) {
  return (
    str[0] === "1" ||
    str[0] === "2" ||
    str[0] === "3" ||
    str[0] === "4" ||
    str[0] === "5" ||
    str[0] === "6" ||
    str[0] === "7" ||
    str[0] === "8" ||
    str[0] === "9"
  );
}

function getTime(str) {
  let array = str.split("");
  let leftBracketIndex = array.indexOf("(");
  return array.slice(leftBracketIndex + 1, array.length - 1).join("");
}

function getClasses(content) {
  const fetchedInfo = {};

  const $ = cheerio.load(content);
  const classList = $("h3, h4, .study");

  let currentDay = "";
  let currentIndex = "";

  classList.each((id, elem) => {
    const htmlElem = $(elem).html();
    const currentElem = $(elem).text();

    if (isDay(currentElem)) {
      currentDay = currentElem;
      fetchedInfo[currentDay] = [];
    } else if (isClassNumber(currentElem)) {
      currentIndex = currentElem[0];

      fetchedInfo[currentDay].push({
        index: currentIndex,
        time: getTime(currentElem),
      });
    } else {
      const classInfo = {};
      currentElem.slice(currentElem.indexOf(": ") + 2).split("; ");

      classInfo.groups = currentElem
        .slice(currentElem.indexOf(": ") + 2)
        .split("; ");
      const leftBorder = currentElem.indexOf("–") + 2;
      const rightBorder = currentElem.lastIndexOf("–") - 2;
      classInfo.name = currentElem.slice(leftBorder, rightBorder);

      if (currentElem.includes("▲")) classInfo.weekType = "upper";
      else if (currentElem.includes("▼")) classInfo.weekType = "bottom";
      else classInfo.weekType = "default";

      if (classInfo.weekType === "default") {
        classInfo.type = $(htmlElem).find("b").text();

        const place = $(htmlElem)
          .find("b:nth-child(1)")
          .next()
          .text()
          .toString()
          .split(", ");
        classInfo.corps = place[0].slice(3);
        classInfo.aud = place[1];
      } else {
        classInfo.type = $(htmlElem).find("b:nth-child(2)").text();
        const place = $(htmlElem)
          .find("b:nth-child(2)")
          .next()
          .text()
          .toString()
          .split(", ");
        classInfo.corps = place[0].slice(3);
        classInfo.aud = place[1];
      }
      fetchedInfo[currentDay][fetchedInfo[currentDay].length - 1] =
        {...fetchedInfo[currentDay][fetchedInfo[currentDay].length - 1], ...classInfo}

    }
  });
  return fetchedInfo;
}

app.get("/", (req, res) => {
  console.log("server started fetching");
  fetch(fullUrl)
    .then((ans) => ans.text())
    .then((ans) => {
      res.status(200).send(getClasses(ans));
      console.log("server ended fetching");
    });
});

app.listen(PORT);
