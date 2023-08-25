const button = document.querySelector(".button-circle");
button.addEventListener("click", calculateAge);

function calculateAge() {
  const day = document.getElementById("day").value.trim();
  const month = document.getElementById("month").value.trim();
  const year = document.getElementById("year").value.trim();
  const errorDay = document.querySelector(".error-day");
  const errorMonth = document.querySelector(".error-month");
  const errorYear = document.querySelector(".error-year");

  const inputs = [day, month, year];
  const errors = [errorDay, errorMonth, errorYear];
  const labels = [
    document.getElementById("label-day"),
    document.getElementById("label-month"),
    document.getElementById("label-year"),
  ];
  const lightRed = getComputedStyle(document.documentElement).getPropertyValue(
    "--color-light-red"
  );

  let hasErrors = false;

  // Check for empty fields
  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i] === "" || inputs[i] === null) {
      console.log(`i = ${i}, input = ${inputs[i]}`);
      errors[i].innerHTML = "This field is required";
      labels[i].style.color = "red";
      document.getElementById(labels[i].htmlFor).style.border =
        "1px solid #ff8c8c";

      hasErrors = true;
    } else {
      errors[i].innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;";
      labels[i].style.color = "";
      document.getElementById(labels[i].htmlFor).style.border = "";
    }
  }

  // Check for valid day, month, and year
  const dayNum = parseInt(day);
  const monthNum = parseInt(month);
  const yearNum = parseInt(year);

  if (day !== "" && isNaN(dayNum)) {
    hasErrors = true;
    errors[0].innerHTML = "Must be a valid day";
    labels[0].style.color = "red";
    document.getElementById("day").style.border = "1px solid #ff8c8c";
  } else if (
    (monthNum === 1 ||
      monthNum === 3 ||
      monthNum === 5 ||
      monthNum === 7 ||
      monthNum === 8 ||
      monthNum === 10 ||
      monthNum === 12) &&
    (dayNum < 1 || dayNum > 31)
  ) {
    hasErrors = true;
    errors[0].innerHTML = "Must be a valid day";
    labels[0].style.color = "red";
    document.getElementById("day").style.border = "1px solid #ff8c8c";
  } else if (monthNum === 2 && (dayNum < 1 || dayNum > 29)) {
    hasErrors = true;
    errors[0].innerHTML = "Must be a valid day";
    labels[0].style.color = "red";
    document.getElementById("day").style.border = "1px solid #ff8c8c";
  } else if (
    (monthNum === 4 || monthNum === 6 || monthNum === 9 || monthNum === 11) &&
    (dayNum < 1 || dayNum > 30)
  ) {
    hasErrors = true;
    errors[0].innerHTML = "Must be a valid day";
    labels[0].style.color = "red";
    document.getElementById("day").style.border = "1px solid #ff8c8c";
  }

  if (year !== "" && year.length !== 4) {
    hasErrors = true;
    errors[2].innerHTML = "Must be a valid year";
    labels[2].style.color = "red";
    document.getElementById("year").style.border = "1px solid #ff8c8c";
  } else if (yearNum > new Date().getFullYear()) {
    hasErrors = true;
    errors[2].innerHTML = "Must be in the past";
    labels[2].style.color = "red";
    document.getElementById("year").style.border = "1px solid #ff8c8c";

    return;
  }

  if (monthNum < 1 || monthNum > 12) {
    hasErrors = true;
    errors[1].innerHTML = "Enter valid month";
    labels[1].style.color = "red";
    document.getElementById("month").style.border = "1px solid #ff8c8c";

    return;
  }

  if (!hasErrors) {
    this.style.backgroundColor = "black";

    const now = new Date();
    const birthDate = new Date(year, month - 1, day);

    let years = now.getFullYear() - birthDate.getFullYear();
    let months = now.getMonth() - birthDate.getMonth();
    let days = now.getDate() - birthDate.getDate();

    if (months < 0 || (months === 0 && days < 0)) {
      years--;
      months = 12 - birthDate.getMonth() + now.getMonth() - 1;
      if (days < 0) {
        days += new Date(now.getFullYear(), now.getMonth() - 1, 0).getDate();
      }
    } else {
      months = now.getMonth() - birthDate.getMonth();
    }

    if (days < 0) {
      months--;
      days += new Date(now.getFullYear(), now.getMonth() - 1, 0).getDate();
    }

    // Update output
    document.querySelector("h1:nth-of-type(1) span").innerHTML = years;
    document.querySelector("h1:nth-of-type(2) span").innerHTML = months;
    document.querySelector("h1:nth-of-type(3) span").innerHTML = days;
  }
}
