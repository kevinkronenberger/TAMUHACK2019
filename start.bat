@echo off
title Starting Servers
echo Starting Node
start node app/index
echo Starting Python
set FLASK_APP=pythonServer/server.py
start flask run
echo Everything should be up and running
pause