from fastapi import FastAPI
from app.api.v1 import endpoints as v1_endpoints

app = FastAPI(
    title="Fashion AI Service",
    description="The AI microservice for the personalized fashion platform."
)

# Include the v1 endpoints
app.include_router(v1_endpoints.router, prefix="/api/v1", tags=["v1"])

@app.get("/")
def read_root():
    return {"message": "Welcome to the Fashion AI Service"}
