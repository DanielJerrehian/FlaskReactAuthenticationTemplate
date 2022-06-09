from backend.src.app import create_app

if __name__ == "__main__":
    app = create_app()
    app.run(port=2200, host="localhost")