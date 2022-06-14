Creating DB on the backend (run at top level of project in VE)

1. `from backend.src.models.models import User, Tweet, etc...`
2. `from backend.src.models.db import db`
3. `from backend.src.app import create_app`
4. `app = create_app()`
5. `with app.app_context(): ...     db.create_all() ...`