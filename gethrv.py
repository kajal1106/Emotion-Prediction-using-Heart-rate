import pandas as pd
import numpy as np

from hrvanalysis import get_time_domain_features
from hrvanalysis import get_frequency_domain_features

data = pd.read_csv('rrsubject27.csv')
data.head()
a = data['RR'].values
print(a)
time_domain_features = get_time_domain_features(a)
print(time_domain_features)
freq = get_frequency_domain_features(a)
print(freq)
