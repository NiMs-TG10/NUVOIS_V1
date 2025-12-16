import cv2
import mediapipe as mp
import numpy as np
import math

# --- 1. Initialize MediaPipe Pose ---
# Use model_complexity=2 for the highest accuracy
mp_pose = mp.solutions.pose
pose = mp_pose.Pose(static_image_mode=True, model_complexity=2, enable_segmentation=False)

def calculate_distance_3d(p1, p2):
    """Calculates the 3D Euclidean distance between two landmarks."""
    if not p1 or not p2:
        return 0
    return math.sqrt((p1.x - p2.x)**2 + (p1.y - p2.y)**2 + (p1.z - p2.z)**2)

# Helper class to create a simple object with x, y, z attributes
class SimpleLandmark:
    def __init__(self, x, y, z):
        self.x, self.y, self.z = x, y, z

def analyze_pose(image_bytes: bytes, user_actual_height_cm: float):
    """
    Analyzes a user's pose from an image (as bytes) to extract body measurements.
    Calibrates measurements against the user's actual height.
    """
    try:
        # --- 2. Load and Process Image ---
        # Decode the image bytes
        npimg = np.frombuffer(image_bytes, np.uint8)
        image = cv2.imdecode(npimg, cv2.IMREAD_COLOR)
        
        # Convert to RGB and process with MediaPipe
        results = pose.process(cv2.cvtColor(image, cv2.COLOR_BGR2RGB))
        
        if not results.pose_world_landmarks:
            raise ValueError("Could not detect pose landmarks in image.")
            
        # Get the 3D world landmarks (these are in meters)
        landmarks = results.pose_world_landmarks.landmark
        
        # --- 3. Get Key Landmarks ---
        p = mp_pose.PoseLandmark
        
        left_shoulder = landmarks[p.LEFT_SHOULDER.value]
        right_shoulder = landmarks[p.RIGHT_SHOULDER.value]
        left_hip = landmarks[p.LEFT_HIP.value]
        right_hip = landmarks[p.RIGHT_HIP.value]
        
        # --- 4. Calculate Widths (in meters) ---
        shoulder_width_m = calculate_distance_3d(left_shoulder, right_shoulder)
        hip_width_m = calculate_distance_3d(left_hip, right_hip)
        
        # Infer waist as the midpoint between shoulders and hips
        left_waist_m = SimpleLandmark(
            (left_shoulder.x + left_hip.x) / 2,
            (left_shoulder.y + left_hip.y) / 2,
            (left_shoulder.z + left_hip.z) / 2
        )
        right_waist_m = SimpleLandmark(
            (right_shoulder.x + right_hip.x) / 2,
            (right_shoulder.y + right_hip.y) / 2,
            (right_shoulder.z + right_hip.z) / 2
        )
        
        waist_width_m = calculate_distance_3d(left_waist_m, right_waist_m)

        # Calculate Waist-Hip Ratio (this is a unitless ratio)
        waist_hip_ratio = waist_width_m / hip_width_m if hip_width_m else 0
        
        # --- 5. Calibrate Measurements using User's Height ---
        
        # Get landmarks for AI-estimated height (e.g., from an average of eyes to heels)
        left_eye = landmarks[p.LEFT_EYE.value]
        right_eye = landmarks[p.RIGHT_EYE.value]
        left_heel = landmarks[p.LEFT_HEEL.value]
        right_heel = landmarks[p.RIGHT_HEEL.value]
        
        # Calculate the average vertical points for head and feet
        head_y = (left_eye.y + right_eye.y) / 2
        feet_y = (left_heel.y + right_heel.y) / 2
        
        # AI's estimated height in meters (as a vertical distance)
        ai_estimated_height_m = abs(head_y - feet_y)
        
        if ai_estimated_height_m == 0:
            raise ValueError("AI could not estimate height (division by zero).")

        # Create a calibration factor
        calibration_factor = user_actual_height_cm / (ai_estimated_height_m * 100)

        # --- 6. Return Calibrated Measurements (in cm) ---
        return {
            "success": True,
            "shoulder_width_cm": round(shoulder_width_m * 100 * calibration_factor, 2),
            "waist_width_cm": round(waist_width_m * 100 * calibration_factor, 2),
            "hip_width_cm": round(hip_width_m * 100 * calibration_factor, 2),
            "waist_hip_ratio": round(waist_hip_ratio, 3),
            "ai_estimated_height_cm": round(ai_estimated_height_m * 100, 2),
            "calibration_factor": round(calibration_factor, 3)
        }

    except Exception as e:
        print(f"Error in analyze_pose: {e}")
        return {"success": False, "error": str(e)}
