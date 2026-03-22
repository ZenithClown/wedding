# -*- encoding: utf-8 -*-

"""
A Script to Perform Lossless Image Compression for Website

The wedding images are compressed using lossless techniques using
:mod:`opencv` for website rendering.
"""

import os
import cv2

from dotenv import load_dotenv
from tqdm.auto import tqdm as TQ

import pandas as pd

def compress(infile : str, outfile : str) -> None:
    img = cv2.imread(infile, cv2.IMREAD_COLOR)
    cv2.imwrite(outfile, img, [cv2.IMWRITE_PNG_COMPRESSION, 9])
    return

if __name__ == "__main__":
    load_dotenv()
    files = pd.read_excel(
        os.path.join(os.getenv("EXCEL_FILE_PATH")),
        skiprows = 4, header = None, names = [
            "PictureDay", "CameraTag", "FileName", "GoodPicture", "_"
        ]
    )

    files["GoodPicture"] = files["GoodPicture"].apply(
        lambda x : True if x == "✔" else False
    )

    for _, row in TQ(files.iterrows(), total = files.shape[0]):
        day, camera, filename = row[["PictureDay", "CameraTag", "FileName"]]

        infile = os.path.join(
            os.getenv("PICTURE_BASE_DIR_PATH"), day, camera, filename
        )

        outdirname = os.path.join(
            os.path.dirname(__file__), "assets", "images",
        )

        if row["GoodPicture"]:
            outfile = filename.lower().replace(".jpg", ".png")
            compress(infile, os.path.join(outdirname, outfile))
        else:
            pass
