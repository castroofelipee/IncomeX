from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel
from fastapi_sqlalchemy import DBSessionMiddleware, db
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import firebase_admin
from firebase_admin import auth as firebase_auth, credentials

# Inicializando o FastAPI
app = FastAPI()

# Configurando SQLite e SQLAlchemy
DATABASE_URL = "sqlite:///./users.db"
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Middleware para a sessão do banco de dados
app.add_middleware(DBSessionMiddleware, db_url=DATABASE_URL)

# Modelo do usuário no banco de dados
class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    name = Column(String)

# Criando as tabelas no banco de dados
Base.metadata.create_all(bind=engine)

# Modelo Pydantic para a verificação do token
class TokenVerificationRequest(BaseModel):
    token: str

# Inicializando o Firebase Admin SDK
cred = credentials.Certificate("./app/incomex-4a1f8-firebase-adminsdk-ganzx-a9e5e3e6cc.json")
firebase_admin.initialize_app(cred)


# Rota para verificar o token do Firebase e autenticar o usuário
@app.post("/verify-token")
def verify_token(request: TokenVerificationRequest):
    try:
        decoded_token = firebase_auth.verify_id_token(request.token)
        email = decoded_token["email"]
        name = decoded_token.get("name", "Unknown")

        # Verificando se o usuário já existe no banco de dados
        user = db.session.query(User).filter(User.email == email).first()
        if not user:
            user = User(email=email, name=name)
            db.session.add(user)
            db.session.commit()

        return {"message": "Login successful", "user": {"email": user.email, "name": user.name}}
    except firebase_admin.exceptions.FirebaseError as e:
        raise HTTPException(status_code=401, detail="Invalid token")

# Rota para verificar o status da API
@app.get("/status")
def status():
    return {"status": "API is running"}
