import pandas as pd
import numpy as np

from hrvanalysis import get_time_domain_features
from hrvanalysis import get_frequency_domain_features
from sklearn.model_selection import train_test_split # Import train_test_split function
from sklearn import metrics #Import scikit-learn metrics module for accuracy calculation

from sklearn import svm

 # nn_intervals_list contains integer values of NN Interval

def getStress(pnn50,lf,hf):
    if(pnn50 > 30 and pnn50 < 50):
        stress = 20
    elif(pnn50 >= 50 and pnn50 <80):
        stress = 40
    elif(pnn50 >= 80 and pnn50 < 100):
        stress = 60
    elif(pnn50 >= 100 and pnn50 < 110):
        stress = 80
    elif(pnn50 >=110):
        stress = 100
    return stress
    
    

data = pd.read_csv('rrsubject27.csv')
features = ['rmssd','stress(in %)']
data.head()
a = data['RR'].values
print(a)
time_domain_features = get_time_domain_features(a)
print(time_domain_features['sdnn'])
freq = get_frequency_domain_features(a)
print(freq)

pnn50 = time_domain_features['sdnn']
lf = freq['lf']
hf = freq['hf']
stressval = getStress(pnn50,lf,hf)
rmssd = time_domain_features['rmssd']
x1test = [[rmssd,stressval]]


col_names = ['sdnn','sdsd','nni_50','pnni_50','nni_20','pnni_20','rmssd','stress(in %)','emotion']

# load dataset
df = pd.read_csv("score.csv",usecols=col_names)
print(df.head())

x = df[features]
y = df.emotion

# x.fillna(x.mean(), inplace=True)
 # Target variable
x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=0.01, random_state=10) 
print(x_train)
print('-------')
print(x_test)
print('-------')
print(y_train)
clf = svm.SVC(kernel='linear') # Linear Kernel

#Train the model using the training sets
clf.fit(x_train, y_train)

#Predict the response for test dataset
y_pred = clf.predict(x_test)
print('-------')
print(y_test)
print('-------')
print(y_pred)
# print("Accuracy:",metrics.accuracy_score(y_test, y_pred))
xtest = time_domain_features
# x1test = x1test.reshape(1,-1)
y1pred = clf.predict(x1test)
print(y1pred)

if(y1pred == 0):
    print('Happy')
elif(y1pred == 1):
    print('Calm')
elif(y1pred == 2):
    print('Neutral')
elif(y1pred == 3):
    print('Unhappy')
elif(y1pred == 4):
    print('Nervous')