from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from app.models.body_analyzer import analyze_pose
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

@router.post('/recommend')
def recommend():
    return {"items": []}
