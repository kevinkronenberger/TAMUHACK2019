import socket

sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

sock.bind(('0.0.0.0',3000))

sock.listen(1)



while True:
    c,a = sock.accept()