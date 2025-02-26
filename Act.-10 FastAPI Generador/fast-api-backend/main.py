from fastapi import FastAPI, Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import RedirectResponse, HTMLResponse
from utils.classes import APIException, RandomNameGenerator
import os

app = FastAPI()

origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/static", StaticFiles(directory="../random_name_frontend/build/static"), name="static")

@app.get("/", response_class=HTMLResponse)
async def root():
    with open(os.path.join("../random_name_frontend/build/index.html")) as f:
        return f.read()

@app.get("/generate", status_code=200)
def generate_random_name(response: Response, nationality: str = "nepal", country: str = "nepal", gender: str = "male", count: int = 5):
    try:
        random_name_generator = RandomNameGenerator(nationality, country, gender)
        
        # Generar múltiples nombres
        random_names = random_name_generator.make_api_call(count)
        return {"random_names": random_names}
    except APIException as err:
        response.status_code = err.status_code
        return {"err_message": str(err)}
