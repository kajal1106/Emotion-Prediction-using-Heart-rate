from flask import Flask
from flask import request
from flask_cors import CORS
import csv
import time
app = Flask(__name__)
CORS(app)

@app.route('/')
def hello():
    username = request.args.get('value')
    print(username)


    with open('stress1.csv', 'a+', newline='') as file:
        fieldnames = ['timestamp', 'rate']
        writer = csv.DictWriter(file, fieldnames=fieldnames)
        now = time.strftime('%Y-%m-%d %H:%M:%S')
      
        writer.writerow({'timestamp': now, 'rate': username})

    return "Hello World!"
    

if __name__ == '__main__':
    app.run(host="0.0.0.0", port = 5000)