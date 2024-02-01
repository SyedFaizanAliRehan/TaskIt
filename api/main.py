from fastapi import FastAPI,Request,Cookie
from fastapi.responses import RedirectResponse,JSONResponse
from database.connection import Base,engine
from routers import users_router,auth_router,tasks_router,admin_router
from fastapi.exceptions import ResponseValidationError

Base.metadata.create_all(bind=engine)
app = FastAPI(
    title="TaskAPI",
    version="1.0.0",
    )

@app.exception_handler(ResponseValidationError)
async def validation_exception_handler(request: Request, exc: ResponseValidationError):
    return JSONResponse(
        status_code=400,
        content={"message": "Validation Error","detail":exc.errors()},
    )

app.include_router(auth_router.router)
app.include_router(admin_router.router)
app.include_router(users_router.router)
app.include_router(tasks_router.router)

@app.get('/',include_in_schema=False)
def root():
    return RedirectResponse("/api/docs")
