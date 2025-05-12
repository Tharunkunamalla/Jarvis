// This is for Female voice assistant
const btn = document.querySelector(".talk");
const content = document.querySelector(".content");
let openedWindow = null; // Reference to store the opened window
let selectedVoice = null; // Reference to store the selected voice

function speak(text) {
  const text_speak = new SpeechSynthesisUtterance(text);

  text_speak.voice = selectedVoice; // Set the selected voice
  text_speak.rate = 1;
  text_speak.volume = 1; // Volume should be between 0 and 1
  text_speak.pitch = 1;

  window.speechSynthesis.speak(text_speak);
}

function wishMe() {
  const day = new Date();
  const hour = day.getHours();

  if (hour >= 0 && hour < 12) {
    speak("Good Morning Boss...");
  } else if (hour >= 12 && hour < 17) {
    speak("Good Afternoon Master...");
  } else {
    speak("Good Evening Sir...");
  }
}

function setVoice() {
  const voices = window.speechSynthesis.getVoices();
  // Choose a female voice based on your preference
  selectedVoice =
    voices.find(
      (voice) =>
        voice.name.includes("Female") ||
        voice.name.includes("Woman") ||
        voice.gender === "female"
    ) || voices[0];
  // Example: you can use specific names like "Google UK English Female" if available
  // You can list all available voices and choose one by checking voice.name or voice.lang
  // Example: console.log(voices);
}

window.addEventListener("load", () => {
  window.speechSynthesis.onvoiceschanged = setVoice; // Ensure voices are loaded before setting
  speak("Initializing JARVIS...");
  wishMe();
});

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onresult = (event) => {
  const currentIndex = event.resultIndex;
  const transcript = event.results[currentIndex][0].transcript;
  content.textContent = transcript;
  takeCommand(transcript.toLowerCase());
};

btn.addEventListener("click", () => {
  content.textContent = "Listening...";
  recognition.start();
});

function takeCommand(message) {
  if (
    message.includes("hey") ||
    message.includes("hello") ||
    message.includes("hii")
  ) {
    speak("Hello Sir, How May I Help You?");
  } else if (message.includes("can you say about yourself....")) {
    speak("Im jarvis , virtual Assistant for Tharun ...");
  } else if (message.includes("open google")) {
    openedWindow = window.open("https://google.com", "_blank");
    speak("Opening Google...");
  } else if (message.includes("open youtube")) {
    openedWindow = window.open("https://youtube.com", "_blank");
    speak("Opening Youtube...");
  } else if (message.includes("open facebook")) {
    openedWindow = window.open("https://facebook.com", "_blank");
    speak("Opening Facebook...");
  } else if (
    message.includes("what is") ||
    message.includes("who is") ||
    message.includes("what are")
  ) {
    openedWindow = window.open(
      `https://www.google.com/search?q=${message.replace(" ", "+")}`,
      "_blank"
    );
    const finalText =
      "This is what I found on the internet regarding " + message;
    speak(finalText);
  } else if (message.includes("wikipedia")) {
    openedWindow = window.open(
      `https://en.wikipedia.org/wiki/${message
        .replace("wikipedia", "")
        .trim()}`,
      "_blank"
    );
    const finalText = "This is what I found on Wikipedia regarding " + message;
    speak(finalText);
  } else if (message.includes("time")) {
    const time = new Date().toLocaleString(undefined, {
      hour: "numeric",
      minute: "numeric",
    });
    const finalText = "The current time is " + time;
    speak(finalText);
  } else if (message.includes("date")) {
    const date = new Date().toLocaleString(undefined, {
      month: "short",
      day: "numeric",
    });
    const finalText = "Today's date is " + date;
    speak(finalText);
  } else if (message.includes("calculator")) {
    openedWindow = window.open("Calculator:///");
    const finalText = "Opening Calculator";
    speak(finalText);
  } else if (message.includes("close")) {
    if (openedWindow) {
      speak("Closing the opened window...");
      openedWindow.close();
      openedWindow = null; // Reset the reference after closing
    } else {
      speak("No window is currently open.");
    }
  } else {
    openedWindow = window.open(
      `https://www.google.com/search?q=${message.replace(" ", "+")}`,
      "_blank"
    );
    const finalText = "I found some information for " + message + " on Google";
    speak(finalText);
  }
}
