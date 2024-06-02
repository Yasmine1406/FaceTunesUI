

import requests
import json
import base64




image='C:/Users/21640/Desktop/Studies/INDP2/P2M/App/UI/src/testImg/webcam_image.jpg'


url = "http://127.0.0.1:8000/emotion/"
response = requests.post(url=url, data={"image_path": image},)
print(json.loads(response.content))

# import pandas as pd

# data=pd.read_csv(r'C:\Users\21640\Desktop\Studies\INDP2\P2M\App\UI\src\testImg\data_moods.csv')
# # print(data.head())
# emotions = {0:'angry', 1:'disgust', 2:'fear', 3:'happy', 4:'sad', 5:'surprise', 6:'neutral'}
# print(data[data['mood']=='Calm'].iloc[0])