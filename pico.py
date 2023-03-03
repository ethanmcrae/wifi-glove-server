import network
import usocket as socket

# Set up WiFi connection
sta_if = network.WLAN(network.STA_IF)
sta_if.active(True)
sta_if.connect("😝", "😝")

# Wait for connection to be established
while not sta_if.isconnected():
    pass

print("Connected to WiFi")

# Send TCP packet
HOST = "😝"
PORT = 3000
MESSAGE = "Hello, Computer!"

def send_message(msg):
    s = socket.socket()
    s.connect((HOST, PORT))
    s.send(msg.encode())
    response = s.recv(1024).decode()
    s.close()
    return response

print(send_message(MESSAGE))