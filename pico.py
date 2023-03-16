import network
import usocket as socket
from machine import Pin
import time

# Set up WiFi connection
sta_if = network.WLAN(network.STA_IF)
sta_if.active(True)
sta_if.connect("Wifi-Name", "Wifi-Password")

# Wait for connection to be established
while not sta_if.isconnected():
    pass

print("Connected to WiFi")

# Server Connection Info
HOST = "IP-Address"
PORT = 3000

# Create connection
try:
    s = socket.socket()
    s.connect((HOST, PORT))
    print("Connected to Server")
except:
    print("Failed to connect to server")
    print("  Make sure the server is online")
    print("  Try updating the host IP")

def send_key(key):
    print("Sending " + key)
    attempts = 0
    max_attempts = 3
    while attempts < max_attempts:
        try:
            s.send(key.encode())
            return
        except:
            attempts += 1
            print("Connection error, attempt", attempts, "of", max_attempts)
            # reconnect to server
            try:
                s = socket.socket()
                s.connect((HOST, PORT))
                print("Reconnected to Server")
            except:
                print("Failed to reconnect to server")
    print("Max number of attempts reached, could not send key")

# Listen for button presses
# Configure each GP pin as an input with pull-up resistor
GP2 = Pin(2, Pin.IN, Pin.PULL_UP)
GP3 = Pin(3, Pin.IN, Pin.PULL_UP)
GP4 = Pin(4, Pin.IN, Pin.PULL_UP)
GP5 = Pin(5, Pin.IN, Pin.PULL_UP)
GP6 = Pin(6, Pin.IN, Pin.PULL_UP)
GP7 = Pin(7, Pin.IN, Pin.PULL_UP)
GP8 = Pin(8, Pin.IN, Pin.PULL_UP)
GP9 = Pin(9, Pin.IN, Pin.PULL_UP)
GP10 = Pin(10, Pin.IN, Pin.PULL_UP)
GP11 = Pin(11, Pin.IN, Pin.PULL_UP)
GP12 = Pin(12, Pin.IN, Pin.PULL_UP)
GP13 = Pin(13, Pin.IN, Pin.PULL_UP)

# Create a list of all the GP pins
gpios = [GP2, GP3, GP4, GP5, GP6, GP7, GP8, GP9, GP10, GP11, GP12, GP13]

# Loop forever, checking the status of each GP pin
while True:
    for i in range(len(gpios)):
        if not gpios[i].value():
            send_key(str(i + 2))
            while not gpios[i].value():
                time.sleep(.1)
