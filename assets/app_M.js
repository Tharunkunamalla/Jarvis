const btn = document.querySelector(".talk");
const content = document.querySelector(".content");
let openedWindow = null;

let selectedVoice = null;

function speak(text) {
  const text_speak = new SpeechSynthesisUtterance(text);

  if (selectedVoice) {
    text_speak.voice = selectedVoice;
  }

  text_speak.rate = 1;
  text_speak.volume = 1; // Volume should be between 0 and 1
  text_speak.pitch = 1;

  window.speechSynthesis.speak(text_speak);
}

function wishMe() {
  const hour = new Date().getHours();

  if (hour >= 0 && hour < 12) {
    speak("Good Morning Boss...");
  } else if (hour >= 12 && hour < 17) {
    speak("Good Afternoon Master...");
  } else {
    speak("Good Evening Sir...");
  }
}

function initVoiceAssistant() {
  const voices = window.speechSynthesis.getVoices();
  selectedVoice =
    voices.find(
      (voice) =>
        voice.name.toLowerCase().includes("male") ||
        voice.name.toLowerCase().includes("english male")
    ) || voices[0];

  speak("Initializing JARVIS...");
  wishMe();
}

window.speechSynthesis.onvoiceschanged = () => {
  initVoiceAssistant();
};

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
  } else if (message.includes("can you say about yourself")) {
    speak("I'm Jarvis, virtual assistant for Tharun.");
  } else if (message.includes("open google")) {
    openedWindow = window.open("https://google.com", "_blank");
    speak("Opening Google...");
  } else if (message.includes("open chat gpt")) {
    openedWindow = window.open("https://chatgpt.com/?oai-dm=1", "_blank");
    speak("Opening Chat GPT...");
  } else if (message.includes("open youtube")) {
    openedWindow = window.open("https://youtube.com", "_blank");
    speak("Opening YouTube...");
  } else if (message.includes("open facebook")) {
    openedWindow = window.open("https://facebook.com", "_blank");
    speak("Opening Facebook...");
  } else if (
    message.includes("what is") ||
    message.includes("who is") ||
    message.includes("what are")
  ) {
    openedWindow = window.open(
      `https://www.google.com/search?q=${message.replace(/ /g, "+")}`,
      "_blank"
    );
    speak("This is what I found on the internet regarding " + message);
  } else if (message.includes("wikipedia")) {
    const searchTerm = message.replace("wikipedia", "").trim();
    openedWindow = window.open(
      `https://en.wikipedia.org/wiki/${searchTerm}`,
      "_blank"
    );
    speak("This is what I found on Wikipedia regarding " + searchTerm);
  } else if (message.includes("time")) {
    const time = new Date().toLocaleString(undefined, {
      hour: "numeric",
      minute: "numeric",
    });
    speak("The current time is " + time);
  } else if (message.includes("date")) {
    const date = new Date().toLocaleString(undefined, {
      month: "short",
      day: "numeric",
    });
    speak("Today's date is " + date);
  } else if (message.includes("calculator")) {
    openedWindow = window.open("Calculator:///");
    speak("Opening Calculator");
  } else if (message.includes("close")) {
    if (openedWindow) {
      speak("Closing the opened window...");
      openedWindow.close();
      openedWindow = null;
    } else {
      speak("No window is currently open.");
    }
  } else {
    openedWindow = window.open(
      `https://www.google.com/search?q=${message.replace(/ /g, "+")}`,
      "_blank"
    );
    speak("I found some information for " + message + " on Google");
  }
}
