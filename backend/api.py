from fastapi import FastAPI, File, Form, UploadFile
from fastapi.responses import JSONResponse
import shutil
import cv2
import os
import base64
import numpy as np
import uvicorn
from tensorflow.keras.models import Model, load_model
from tensorflow.keras.preprocessing import image
import pandas as pd


app= FastAPI()
model = load_model(r'C:\Users\21640\Desktop\Studies\INDP2\P2M\App\UI\src\models\MobileNetV2.h5')


def preprocess_input_image(image_path):
    # Load the image
    img = image.load_img(image_path, target_size=(96, 96))
    # Convert the image to a numpy array
    img_array = image.img_to_array(img)
    # Expand dimensions to match the batch shape used during training
    img_array = np.expand_dims(img_array, axis=0)
    # Scale pixel values to the range [0, 1]
    img_array = img_array / 255.0
    return img_array


@app.post('/emotion')
async def root(image_path:str= Form(...)):
    try:
        input_img = preprocess_input_image(image_path)
    # Perform prediction
        prediction = model.predict(input_img).argmax(axis=-1)
        
        result={}
        pred=int(prediction[0])
        data=pd.read_csv(r'C:\Users\21640\Desktop\Studies\INDP2\P2M\App\UI\src\testImg\data_moods.csv')
        emotions = {0:'Calm', 1:'Energetic', 2:'Calm', 3:'Happy', 4:'Sad', 5:'Energetic', 6:'Happy'}
        name=data[data['mood']==emotions[pred]].iloc[0]['name']
        artist=data[data['mood']==emotions[pred]].iloc[0]['artist']
        result['name']=name
        result['artist']=artist
        return JSONResponse(content=result)
    except Exception as e:
        return JSONResponse(content={"error": f"Error processing image: {str(e)}"}, status_code=500)
    
if __name__ == "__main__":
    uvicorn.run(app=app  , host="0.0.0.0")





