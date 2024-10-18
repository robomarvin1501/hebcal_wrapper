
async function getJSON() {
    return fetch("https://www.hebcal.com/hebcal?v=1&cfg=json&maj=on&yto=on&min=off&mod=off&nx=off&year=now&month=x&ss=off&mf=off&c=off&geo=geoname&geonameid=281184&M=on&s=off")
        .then((response) => response.json())
        .then((json) => json)
}

const jsonData = getJSON()

function extractDates(obj) {
  const dates = [];

  function searchForDates(value) {
    if (typeof value === 'string' && /\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z)?/.test(value)) {
      dates.push(value);
    } else if (Array.isArray(value)) {
      value.forEach(item => searchForDates(item));
    } else if (typeof value === 'object' && value !== null) {
      Object.values(value).forEach(val => searchForDates(val));
    }
  }

  searchForDates(obj);
  return dates;
}

const dateFields = extractDates(jsonData);
console.log(dateFields);
