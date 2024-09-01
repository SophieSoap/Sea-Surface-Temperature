let table;
let years;
let months;
let anomalies; 

let zeroRadius = 100;
let oneRadius = 150;

// Daten von 1850-2023
let selectedYear = "1850";

function preload() {
  table = loadTable("HadSST_monthly_GLOBE_1850-2023.csv", "csv", "header");
}

function setup() {
  let canvas = createCanvas(400, 400);
  canvas.parent('canvas-container');

  // Extrahiere die ersten drei Spalten (year, month, anomaly)
  years = table.getColumn('year');
  months = table.getColumn('month');
  anomalies = table.getColumn('anomaly');
  noLoop ();

  setupYearSlider();
}

function draw() {
  background("white");
  //background("LightSteelBlue");
  translate(width / 2, height / 2); // Ursprung ins Zentrum verschieben
  textAlign(CENTER, CENTER); // Textausrichtung

  // Nullpunkt-Zirkel zeichnen
  stroke(0); 
  noFill();
  circle(0, 0, zeroRadius * 2);

  // Großer äußerer Zirkel für die Monate
  //circle(0, 0, 350);

  // +1 Grad-Zirkel zeichnen
  stroke("OrangeRed");
  strokeWeight(2);
  circle(0, 0, oneRadius * 2);

  //Beschriftung
  fill(0);
  noStroke();
  textSize(14);
  text("0°", zeroRadius + 10, 0);
  fill("OrangeRed");
  text("1°", oneRadius + 10, 0);

  // Platziere die Monate um den Kreis
  let monthNames = ["Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb"];
  fill(0);
  for (let i = 0; i < 12; i++) {
    let angle = map(i, 0, 12, 0, TWO_PI);
    let x = 185 * cos(angle);
    let y = 185 * sin(angle);
    text(monthNames[i], x, y);
  }

  // Aktuelles Jahr in der Mitte anzeigen
  fill("blue");
  textSize(32);
  text(selectedYear, 0, 0);

  // Visualisierung für das ausgewählte Jahr
  beginShape();
  noFill();
  stroke("blue");
  for (let i = 0; i < months.length; i++) {
    // Daten für das ausgewählte Jahr filtern
    if (years[i] === selectedYear) {
      // Anomalie und Winkel berechnen
      let anomaly = parseFloat(anomalies[i]);
      let angle = map(months[i], 0, 12, 0, TWO_PI) - PI / 2;

      // Radius basierend auf der Anomalie
      let r = map(anomaly, 0, 1, zeroRadius, oneRadius);

      // Koordinaten für den Punkt berechnen und hinzufügen
      let x = r * cos(angle);
      let y = r * sin(angle);
      vertex(x, y);
    }
  }
  endShape(CLOSE);
}

// Funktion Slider
function setupYearSlider() {
  let yearSlider = document.getElementById('yearSlider');
  yearSlider.addEventListener('input', function() {
    selectedYear = yearSlider.value;
    redraw(); // Canvas wird mit dem neuen Jahr aktualisiert
  });
}