function updateClock() {
    let now = new Date()

    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();


    const status = hours >= 12 ? "pm" : "am";


    hours = hours.toString().padStart(2, "0")
    minutes = minutes.toString().padStart(2, "0")
    seconds = seconds.toString().padStart(2, "0")
  
    
if (hours >=6 && hours <=11) {
    document.getElementById("greeting").textContent =  "Good Morning Sir" 
} else if (hours >=12 && hours <=16)  {
       document.getElementById("greeting").textContent = "Good Afternoon Sir"
} else if (hours >=12 && hours <=16)  {
} else if  (hours >=17 && hours <=20) {
       document.getElementById("greeting").textContent = "Good Evening Sir"
}else {
     document.getElementById("greeting").textContent = "Good Night Sir"
}

    document.getElementById("time").textContent = `${hours} : ${minutes} : ${seconds} ${status}`

    let date = now.toDateString();
    document.getElementById("date").textContent = date;


}

setInterval(() => {
    updateClock()
}, 1000);




// Grab DOM elements
const alarmTimeInput = document.getElementById('alarmTime');
const setBtn = document.getElementById('setBtn');
const clearBtn = document.getElementById('clearBtn');
const statusText = document.getElementById('status');
const alarmAudio = document.getElementById('alarmAudio');

let timerId = null; // Stores our active interval reference

// Function to set the alarm
setBtn.addEventListener('click', () => {
  const alarmTime = alarmTimeInput.value;
  if (!alarmTime) {
    statusText.innerText = "Please select a valid time.";
    return;
  }

  statusText.innerText = `Alarm set for ${alarmTime}`;
  
  // Clear any existing active alarm before setting a new one
  if (timerId) clearInterval(timerId);

  // Check the time every second
  timerId = setInterval(() => {
    const now = new Date();
    const currentHours = String(now.getHours()).padStart(2, '0');
    const currentMinutes = String(now.getMinutes()).padStart(2, '0');
    const currentTime = `${currentHours}:${currentMinutes}`;

    if (currentTime === alarmTime) {
      alarmAudio.play();
      statusText.innerText = "⏰ Time's up!";
      clearInterval(timerId); // Stop checking once it triggers
    }
  }, 1000);
});

// ────────── THE CLEAR ALARM FUNCTIONALITY ──────────
clearBtn.addEventListener('click', () => {
  // 1. Stop the interval checking loop
  if (timerId) {
    clearInterval(timerId);
    timerId = null;
  }

  // 2. Pause the audio and reset its playback position
  alarmAudio.pause();
  alarmAudio.currentTime = 0;

  // 3. Clear UI text and inputs
  statusText.innerText = "Alarm cleared.";
  alarmTimeInput.value = "";
});





