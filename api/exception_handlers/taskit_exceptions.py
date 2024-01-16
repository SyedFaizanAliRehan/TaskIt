from fastapi.exceptions import ResponseValidationError
from fastapi.responses import PlainTextResponse
from main import app

@app.exception_handler(ResponseValidationError)
async def validation_exception_handler(request, exc):
    return PlainTextResponse(str(exc), status_code=400)
