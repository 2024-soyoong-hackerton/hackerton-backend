import sys
from scipy.stats import pearsonr
import numpy as np
import pandas as pd

def main(a, b):
    arr1 = list(map(float, a.split(',')))
    arr2 = list(map(float, b.split(',')))

    print(arr1, arr2)

if __name__ == '__main__':
    main(sys.argv[1], sys.argv[2])
