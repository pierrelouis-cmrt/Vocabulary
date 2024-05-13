var categories = {
  HeimatUnLieu: [
    { word: "die Heimat", translation: "la patrie" },
    { word: "der Heimatbegriff", translation: "le concept de patrie" },
    { word: "der Geburtsort", translation: "le lieu de naissance" },
    { word: "der Wohnort", translation: "le lieu de résidence" },
    {
      word: "lange irgendwo wohnen",
      translation: "habiter longtemps quelque part",
    },
    { word: "das Bundesland", translation: "l'état fédéré" },
    { word: "die Gegend / die Region", translation: "la région" },
    { word: "die Stadt / das Dorf", translation: "la ville / le village" },
    { word: "die Landschaft", translation: "le paysage" },
    { word: "der Wald", translation: "la forêt" },
    { word: "der Berg", translation: "la montagne" },
    { word: "der See", translation: "le lac" },
  ],

  HeimatUnSentiment: [
    { word: "das Heimweh", translation: "le mal du pays" },
    { word: "die Gemütlichkeit", translation: "la convivialité" },
    { word: "die Verbundenheit", translation: "le sentiment d'appartenance" },
    { word: "die Zusammengehörigkeit", translation: "la solidarité" },
    { word: "die gemeinsamen Werte", translation: "les valeurs communes" },
    { word: "die Sehnsucht", translation: "la nostalgie, le désir ardent" },
    { word: "das Zuhause", translation: "le chez-soi" },
    {
      word: "sich zu Hause fühlen / sich fremd fühlen",
      translation: "se sentir chez soi / se sentir étranger",
    },
    { word: "nach etwas riechen", translation: "sentir quelque chose" },
    {
      word: "sich an etwas erinnern",
      translation: "se souvenir de quelque chose",
    },
    { word: "der Waldspaziergang", translation: "la promenade en forêt" },
  ],

  UneNouvelleNostalgie: [
    {
      word: "Die Sehnsucht nach Heimat",
      translation: "La nostalgie de la patrie",
    },
    { word: "der Trachtenverein", translation: "l'association folklorique" },
    { word: "das Heimatmuseum", translation: "le musée local" },
    { word: "ein missbrauchter Begriff", translation: "un terme abusé" },
    { word: "die Globalisierung", translation: "la mondialisation" },
    { word: "fie Instrumentalisierung", translation: "l'instrumentalisation" },
    { word: "die Abgrenzung", translation: "la délimitation" },
    { word: "eine andere Kultur", translation: "une autre culture" },
  ],

  PasseportEtIdentité: [
    {
      word: "in einem Land geboren / gewachsen sein",
      translation: "être né / avoir grandi dans un pays",
    },
    { word: "der Ausländer -in", translation: "l'étranger, l'étrangère" },
    { word: "die Einwanderung", translation: "l'immigration" },
    { word: "die ursprüngliche Kultur", translation: "la culture d'origine" },
    { word: "der Pass", translation: "le passeport" },
    { word: "das Blut", translation: "le sang" },
  ],
};

var category = "all";
var index = 0;
var mode = "word";
var lastWord = null;
var originalWords = [];
var percentageShown = 0;
var shownWords = [];

function changeCategory() {
  category = document.getElementById("category").value;
  index = 0;
  shuffleButtonClickCount = 0; // Reset the shuffle button click count
  if (category == "all") {
    words = [].concat(
      categories.HeimatUnLieu,
      categories.HeimatUnSentiment,
      categories.UneNouvelleNostalgie,
      categories.PasseportEtIdentité
    );
  } else {
    words = categories[category];
  }
  originalWords = words.slice();
  words = originalWords.slice();

  shownWords = [];

  displayWord();

  // Update total number of words in the selected category
  var totalWords = document.getElementById("total");
  totalWords.innerText = "Total words in category: " + originalWords.length;
}

function displayWord() {
  var word = null;
  var translation = null;

  if (words.length === 0) {
    document.getElementById("summary").innerText = "All words have been shown!";
    document.getElementById("details").innerText = "";
    return;
  }

  do {
    index = Math.floor(Math.random() * words.length);
    word = words[index].word;
    translation = words[index].translation;
  } while (word === lastWord);

  currentWord = word;
  currentTranslation = translation;

  // Display the current word and translation without shuffling
  displayCurrentWord();

  // Remove the shown word from the words array
  words.splice(index, 1);

  percentageShown =
    ((originalWords.length - words.length) / originalWords.length) * 100;
  var percentage = document.getElementById("percentage");
  percentage.innerText =
    "Percentage of words shown from the selected category: " +
    percentageShown.toFixed(2) +
    "%";
}

var currentWord = null;
var currentTranslation = null;

function switchWord() {
  if (mode == "word") {
    mode = "translation";
  } else {
    mode = "word";
  }

  // Display the current word and translation without shuffling
  displayCurrentWord();
}

function displayCurrentWord() {
  var summary = document.getElementById("summary");
  var details = document.getElementById("details");
  var status = document.getElementById("status");

  if (mode == "word") {
    summary.innerText = currentWord;
    details.innerText = currentTranslation;
    status.innerText = "Showing up right now: Word (English)";
  } else {
    summary.innerText = currentTranslation;
    details.innerText = currentWord;
    status.innerText = "Showing up right now: Translation (French)";
  }
}

var shuffleButton = document.getElementById("shuffleButton");
var shuffleButtonClickCount = 0;

function shuffleWord() {
  shuffleButtonClickCount++;

  if (shuffleButtonClickCount === originalWords.length) {
    // If shuffle button clicked x+1 times (where x is the number of words in the category), show congrats screen
    document.getElementById("congratsScreen").style.display = "block";
    return;
  }

  // Shuffle the words in the words array
  for (var i = words.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = words[i];
    words[i] = words[j];
    words[j] = temp;
  }

  index = 0;

  displayWord();
}

window.onload = changeCategory;

document.addEventListener("DOMContentLoaded", function () {
  const toggle = document.querySelector("#switch");

  // Check the user's preferred color scheme
  const preferredTheme = window.matchMedia("(prefers-color-scheme: dark)")
    .matches
    ? "dark"
    : "light";

  // If there's a saved theme, use that instead
  const currentTheme = localStorage.getItem("theme") || preferredTheme;
  document.documentElement.setAttribute("data-theme", currentTheme);

  if (currentTheme === "dark") {
    toggle.checked = true;
  } else {
    toggle.checked = false;
  }

  toggle.addEventListener("change", function () {
    if (this.checked) {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark"); // Save the choice in localStorage
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light"); // Save the choice in localStorage
    }
  });
});
