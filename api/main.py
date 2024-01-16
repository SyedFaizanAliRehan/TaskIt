from fastapi import FastAPI,Request
from fastapi.responses import RedirectResponse,JSONResponse
from database.connection import Base,engine
from routers import users_router,auth_router,tasks_router
from fastapi.exceptions import ResponseValidationError

Base.metadata.create_all(bind=engine)
app = FastAPI(title="TaskAPI")

@app.exception_handler(ResponseValidationError)
async def validation_exception_handler(request, exc):
    return JSONResponse({"ResponseValidatorError":str(exc)}, status_code=400)

app.include_router(auth_router.router)
app.include_router(users_router.router)
app.include_router(tasks_router.router)

@app.get('/')
def root():
    return RedirectResponse("/docs")
