const button = document.querySelector(".button-circle");
button.addEventListener("click", calculateAge);

function calculateAge() {
    this.style.backgroundColor = "black";
    const day = parseInt(document.getElementById("day").value);
    const month = parseInt(document.getElementById("month").value);
    const year = parseInt(document.getElementById("year").value);
  
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
  