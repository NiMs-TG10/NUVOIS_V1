"""
Fashion Detection Module using YOLOv8

This module provides stateless fashion detection from image bytes.
It loads a YOLO model and returns detected fashion items without
persisting any data to disk.
"""

import io
import logging
from typing import Optional

try:
    from PIL import Image
    import numpy as np
except ImportError:
    Image = None
    np = None


# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Class mappings: 13 DeepFashion + 4 Indian ethnic = 17 total
FASHION_CLASSES = {
    0: "short_sleeved_shirt",
    1: "long_sleeved_shirt",
    2: "short_sleeved_outwear",
    3: "long_sleeved_outwear",
    4: "vest",
    5: "sling",
    6: "shorts",
    7: "trousers",
    8: "skirt",
    9: "short_sleeved_dress",
    10: "long_sleeved_dress",
    11: "vest_dress",
    12: "sling_dress",
    13: "saree",
    14: "kurta",
    15: "lehenga",
    16: "sherwani",
}

INDIAN_CLASSES = {"saree", "kurta", "lehenga", "sherwani"}

# Lazy load model to avoid startup delay
_model = None


def get_model():
    """Lazy load YOLO model."""
    global _model
    if _model is None:
        try:
            from ultralytics import YOLO
            
            # Try to load custom fashion model, fallback to base model
            model_path = "app/models/best_fashion.pt"
            try:
                _model = YOLO(model_path)
                logger.info(f"Loaded custom fashion model from {model_path}")
            except Exception:
                # Fallback to pretrained YOLOv8 nano for development
                _model = YOLO("yolov8n.pt")
                logger.warning("Custom model not found, using yolov8n.pt (development mode)")
        except ImportError:
            logger.error("YOLO not installed. Run: pip install ultralytics")
            _model = None
    return _model


def detect_fashion(image_bytes: bytes, confidence_threshold: float = 0.5) -> dict:
    """
    Detect fashion items in an image.
    
    Args:
        image_bytes: Raw image bytes
        confidence_threshold: Minimum confidence for detections
        
    Returns:
        dict with 'detections' list and metadata
    """
    try:
        # 1. Load image from bytes (no disk write)
        if Image is None or np is None:
            return {
                "success": True,
                "detections": [],
                "image_size": {"width": 0, "height": 0},
                "warning": "Dependencies missing (PIL/NumPy)"
            }

        image = Image.open(io.BytesIO(image_bytes))
        image_np = np.array(image)
        
        # 2. Get model
        model = get_model()
        if model is None:
            return {
                "success": False,
                "error": "Model not available",
                "detections": []
            }
        
        # 3. Run inference
        results = model(image_np, conf=confidence_threshold, verbose=False)
        
        # 4. Process results
        detections = []
        for result in results:
            boxes = result.boxes
            if boxes is not None:
                for box in boxes:
                    class_id = int(box.cls[0])
                    confidence = float(box.conf[0])
                    bbox = box.xyxy[0].tolist()  # [x1, y1, x2, y2]
                    
                    # Get class name (try custom mapping first, then model's names)
                    class_name = FASHION_CLASSES.get(class_id, result.names.get(class_id, "unknown"))
                    
                    detections.append({
                        "class_id": class_id,
                        "class_name": class_name,
                        "confidence": round(confidence, 3),
                        "bbox": [round(x, 2) for x in bbox],
                        "is_ethnic": class_name in INDIAN_CLASSES
                    })
        
        return {
            "success": True,
            "detections": detections,
            "image_size": {"width": image.width, "height": image.height}
        }
        
    except Exception as e:
        logger.error(f"Detection error: {e}")
        return {
            "success": False,
            "error": str(e),
            "detections": []
        }


def classify_body_shape(measurements: dict) -> str:
    """
    Classify body shape based on measurements.
    
    Uses shoulder-to-hip and waist-to-hip ratios.
    """
    shoulder = measurements.get("shoulder_width_cm", 0)
    waist = measurements.get("waist_width_cm", 0)
    hip = measurements.get("hip_width_cm", 0)
    
    if not all([shoulder, waist, hip]):
        return "Unknown"
    
    shoulder_hip_ratio = shoulder / hip if hip else 0
    waist_hip_ratio = waist / hip if hip else 0
    
    # Body shape classification logic
    if waist_hip_ratio <= 0.75 and abs(shoulder_hip_ratio - 1) <= 0.1:
        return "Hourglass"
    elif shoulder_hip_ratio > 1.1:
        return "Inverted Triangle"
    elif shoulder_hip_ratio < 0.9 and waist_hip_ratio > 0.8:
        return "Pear"
    elif waist_hip_ratio > 0.85:
        return "Apple"
    else:
        return "Rectangle"
