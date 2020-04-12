import pandas as pd
import numpy as np

from hrvanalysis import get_time_domain_features
from hrvanalysis import get_frequency_domain_features
 # nn_intervals_list contains integer values of NN Interval
data = pd.read_csv('rrsubject3.csv')
data.head()
a = data['RR'].values
print(a)
# nn_intervals_list = [1000, 1050, 1020, 1080, ..., 1100, 1110, 1060]

time_domain_features = get_time_domain_features(a)
print(time_domain_features)
freq = get_frequency_domain_features(a)
print(freq)
# time_domain_features
# {'mean_nni': 718.248,
#  'sdnn': 43.113,
#  'sdsd': 19.519,
#  'nni_50': 24,
#  'pnni_50': 2.4,
#  'nni_20': 225,
#  'pnni_20': 22.5,
#  'rmssd': 19.519,
#  'median_nni': 722.5,
#  'range_nni': 249,
#  'cvsd': 0.0272,
#  'cvnni': 0.060,
#  'mean_hr': 83.847,
#  'max_hr': 101.694,
#  'min_hr': 71.513,
#  'std_hr': 5.196}