#include <WiFi.h>
#include <ESPAsyncWebServer.h>

const char *ssid = "your-ssid";
const char *password = "your-password";

const int ledPin = 13; // Pin for the LED
const int buzzerPin = 14; // Pin for the buzzer
const int buttonPin = 15; // Pin for the physical button on the website

bool isBlinking = false;

AsyncWebServer server(80);

void setup() {
  Serial.begin(115200);

  // Connect to Wi-Fi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }

  // Print the ESP32's IP address
  Serial.print("Connected to WiFi. IP Address: ");
  Serial.println(WiFi.localIP());

  // Serve the HTML page
  server.on("/", HTTP_GET, [](AsyncWebServerRequest *request){
    request->send(200, "text/html", "<html><body><button onclick=\"startBlinking()\">Start</button><script>function startBlinking(){var xhr=new XMLHttpRequest();xhr.open('GET','/startBlinking',true);xhr.send();}</script></body></html>");
  });

  // Handle the button click
  server.on("/startBlinking", HTTP_GET, [](AsyncWebServerRequest *request){
    startBlinking();
    request->send(200, "text/plain", "Blinking started");
  });

  // Start server
  server.begin();

  // Setup pins
  pinMode(ledPin, OUTPUT);
  pinMode(buzzerPin, OUTPUT);
  pinMode(buttonPin, INPUT);
}

void loop() {
  // Check if the button is pressed
  if (digitalRead(buttonPin) == HIGH) {
    startBlinking();
    delay(1000); // Debounce delay
  }

  // No need to handleClient in the loop for AsyncWebServer
  // AsyncWebServer handles requests asynchronously in the background

  // Add any other non-blocking code here
}

void startBlinking() {
  if (!isBlinking) {
    isBlinking = true;
    for (int i = 0; i < 5; i++) {
      digitalWrite(ledPin, HIGH);
      tone(buzzerPin, 1000); // Beep at 1000Hz
      delay(500);
      digitalWrite(ledPin, LOW);
      noTone(buzzerPin);
      delay(500);
    }
    isBlinking = false;
  }
}