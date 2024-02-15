const apiKey = "StZKwTscb8mOL3YAP0oyAvTiOF2jN4UC";
const apiUrl = "https://calendarific.com/api/v2/holidays?&country=RU&year=2024&type=national&month=";

const holidayInput = document.querySelector(".show_holidays select");
const holidayButton = document.querySelector(".show_holidays button");
const monthList = [];
const holidays = document.querySelector(".holidays_info");
const holidaysBlock = document.querySelector('.holidays');
const errorText = document.querySelector(".error");

function updateHolidaysInfo(data) {
    console.log("updateHolidays", data);
    const holidaysInfo=data.response.holidays;
    holidaysInfo.forEach(function(holiday) {
        console.log(holiday)
        const name = holiday.name;
        const date = holiday.date.iso;
        const li = document.createElement("li");
        li.innerHTML = 'Дата:' + ' ' + date + ' ' + 'Праздник:' + ' ' + name;
        holidays.appendChild(li);
    })


  holidaysBlock.style.display = "block";
  errorText.style.display = "none";
}

// Метод GET
async function checkHolidays(month) {
  try {
    const response = await fetch(`${apiUrl}${month}&api_key=${apiKey}`, {
      method: "GET",
    });
    if (response.status === 404) {
      errorText.style.display = "block";
      holidaysBlock.style.display = "none";
    } else {
      const data = await response.json();
      console.log(data);
      if (data.response.length !=0) {
        updateHolidaysInfo(data);
      } else {
        errorText.style.display = "block";
        errorText.innerText = "Праздники не найдены";
      }

    }
  } catch (error) {
    console.error("Error", error);
  }
}

function updateHolidayList() {
    const monthListElement = document.getElementById("month-list");
    monthListElement.innerHTML = "";
  
    for (const monthName of monthList) {
      const listItem = document.createElement("li");
      listItem.textContent = monthName;
      monthListElement.appendChild(listItem);
    }
  }

function handleSearch() {
  checkHolidays(holidayInput.value);
}

function handleClear() {
  holidays.innerHTML = '';
}

holidayButton.addEventListener("click", handleClear);
holidayInput.addEventListener("change", (event) => {
    handleSearch();
});

