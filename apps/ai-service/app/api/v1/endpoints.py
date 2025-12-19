from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from app.models.body_analyzer import analyze_pose
from app.models.fashion_detector import detect_fashion, classify_body_shape
import logging

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

router = APIRouter()


@router.post("/analyze-body")
async def handle_analyze_body(
    user_height_cm: float = Form(...),
    image: UploadFile = File(...)
):
    """
    This endpoint receives an image and the user's height,
    and returns AI-driven body measurements.
    """
    logger.info(f"Received request to analyze body for user height: {user_height_cm}")
    
    # Read the image bytes
    image_bytes = await image.read()
    
    # Call the model logic
    results = analyze_pose(image_bytes=image_bytes, user_actual_height_cm=user_height_cm)
    
    if not results["success"]:
        logger.error(f"Analysis failed: {results['error']}")
        raise HTTPException(status_code=400, detail=results["error"])
        
    logger.info(f"Analysis successful: {results}")
    return results


@router.post("/analyze")
async def analyze_image(
    file: UploadFile = File(...),
    height: float = Form(...)
):
    """
    Stateless fashion analysis endpoint.
    
    Receives raw image bytes, processes with YOLO + body analysis,
    and returns structured JSON without persisting any data to disk.
    """
    logger.info(f"Received analyze request. Height: {height}cm")
    
    # 1. Read Bytes directly into Memory
    image_bytes = await file.read()
    
    if not image_bytes:
        raise HTTPException(status_code=400, detail="Empty file received")
    
    # 2. Run Fashion Detection (YOLO)
    detection_results = detect_fashion(image_bytes)
    
    # 3. Run Body Analysis (MediaPipe)
    body_results = {}
    body_shape = "Unknown"
    try:
        body_results = analyze_pose(image_bytes=image_bytes, user_actual_height_cm=height)
        if body_results.get("success"):
            body_shape = classify_body_shape(body_results)
    except Exception as e:
        logger.warning(f"Body analysis failed: {e}")
        body_results = {"success": False, "error": str(e)}
    
    # 4. Return Combined JSON (no disk writes)
    return {
        "success": True,
        "body_shape": body_shape,
        "measurements": {
            "shoulder": body_results.get("shoulder_width_cm"),
            "waist": body_results.get("waist_width_cm"),
            "hip": body_results.get("hip_width_cm"),
            "waist_hip_ratio": body_results.get("waist_hip_ratio"),
            "height": height
        },
        "detections": detection_results.get("detections", []),
        "detection_confidence": detection_results.get("success", False)
    }


@router.post('/recommend')
def recommend():
    return {"items": []}
