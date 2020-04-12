import pandas as pd

from sklearn.model_selection import train_test_split # Import train_test_split function
from sklearn import metrics #Import scikit-learn metrics module for accuracy calculation

from sklearn import svm

col_names = ['sdnn','sdsd','nni_50','pnni_50','nni_20','pnni_20','rmssd','stress','emotion']
features = ['rmssd','stress']
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
print("Accuracy:",metrics.accuracy_score(y_test, y_pred))

x1test = [[80,2]]
# x1test = x1test.reshape(1,-1)
y1pred = clf.predict(x1test)
print(y1pred    )