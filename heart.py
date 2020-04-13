from flask import Flask
from flask import request
from flask_cors import CORS
import csv
import time
app = Flask(__name__)
CORS(app)

@app.route('/')
def hello():
    heartbeat = request.args.get('heart_rate')
    heartrate = request.args.get('rRInterval')
    print(heartbeat," ",heartrate)
    if(int(heartrate) > 1200):
        heartrate = int(heartrate) - 400
    elif(int(heartrate) < 400):
        heartrate = int(heartrate) + 200
    with open('rrsubject27.csv', 'a+', newline='') as file:
        fieldnames = ['timestamp', 'beats','RR']
        writer = csv.DictWriter(file, fieldnames=fieldnames)
        now = time.strftime('%Y-%m-%d %H:%M:%S')
      
        writer.writerow({'timestamp': now, 'beats': heartbeat, 'RR': heartrate})

    return "Hello World!"
    

if __name__ == '__main__':
    app.run(host="0.0.0.0", port = 5000)