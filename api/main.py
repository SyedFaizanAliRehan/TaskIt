from fastapi import FastAPI,Request,Cookie
from fastapi.responses import RedirectResponse,JSONResponse
from database.connection import Base,engine,SessionLocal
from routers import users_router,auth_router,tasks_router,admin_router
from fastapi.exceptions import ResponseValidationError
from fastapi.middleware.cors import CORSMiddleware
from sql import modals
from auth.password_management import password_context
import os

def delete_database():
    if os.path.exists("./TaskItDatabase.db"):
        os.remove("./TaskItDatabase.db")

def create_admin():
    db = db = SessionLocal()
    admin = modals.User(
            user_name = "admin",
            first_name = "admin",
            last_name = "admin",
            role = modals.User.UserRoles.admin,
            email = "admin@taskit.com",
            password = password_context.hash("Password@123")
            )
    db.add(admin)
    db.commit()
    db.close()
    
# Delete old database
delete_database()

# Create new database
Base.metadata.create_all(bind=engine)

# Create admin user
create_admin()

app = FastAPI(
    title="TaskAPI",
    version="1.0.0",
    )

origins = [
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
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
    return RedirectResponse("/docs")
