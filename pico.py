import network
import usocket as socket
import time

# Set up WiFi connection
sta_if = network.WLAN(network.STA_IF)
sta_if.active(True)
sta_if.connect("name:😝", "pass:😝")

# Wait for connection to be established
while not sta_if.isconnected():
    pass

print("Connected to WiFi")

# Server Connection Info
HOST = "ip:😝"
PORT = 3000

# Create connection
s = socket.socket()
s.connect((HOST, PORT))

def send_key(key):
    s.send(key.encode())
    response = s.recv(1024).decode()
    return response

print(send_key('a'))

s.close()
