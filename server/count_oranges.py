import sys
import random
import cv2
from ultralytics import YOLO
import uuid

model_path = "yolo_model/yolo_orange_trained_model2.pt"
model = YOLO(model_path)

confidence_val = 0.25

def count_oranges(image_path, block_name):
    results = model.predict(source=image_path, conf=confidence_val, save=False)

    oranges_count = 0

    for result in results:
        for box in result.boxes:
            if box.conf > confidence_val:
                oranges_count += 1


    image_with_boxes = cv2.imread(image_path)

    font_scale = 0.3
    font_thickness = 1
    box_thickness = 1

    for result in results:
        for box in result.boxes:
            x1, y1, x2, y2 = map(int, box.xyxy[0])
            confidence = box.conf[0]
            class_name = "Orange"

            if confidence > confidence_val:
                cv2.rectangle(image_with_boxes, (x1, y1), (x2, y2), (0, 255, 0), box_thickness)
                text = f"{class_name} {confidence:.2f}"
                (text_width, text_height), _ = cv2.getTextSize(text, cv2.FONT_HERSHEY_SIMPLEX, font_scale, font_thickness)
                cv2.rectangle(image_with_boxes, (x1, y1 - text_height - 5), (x1 + text_width, y1), (0, 255, 0), -1)
                cv2.putText(image_with_boxes, text, (x1, y1 - 5), cv2.FONT_HERSHEY_SIMPLEX, font_scale, (0, 0, 0), font_thickness)

    output_path = f"output_images/{block_name}/image_with_boxes{uuid.uuid4()}.jpg"
    cv2.imwrite(output_path, image_with_boxes)

    return oranges_count, output_path

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Error: No photo path provided.")
        sys.exit(1)
    
    image_path = sys.argv[1]
    block_name = sys.argv[2]
    oranges_count, output_path = count_oranges(image_path, block_name)
    
    print(f'oranges={oranges_count}, output_path={output_path}')
