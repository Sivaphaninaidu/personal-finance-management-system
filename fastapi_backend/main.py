from fastapi import FastAPI
from routers.auth import router as auth_router
from routers.accounts import router as account_router
from routers.transactions import router as transaction_router
from routers.bills import router as bill_router
from routers.expenses import router as expense_router
from routers.goals import router as goal_router
from routers.dashboard import router as dashboard_router
from fastapi.middleware.cors import CORSMiddleware
from routers import auth
from routers import budgets

app = FastAPI(
    title="Personal Finance Management System"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(
    auth_router,
    prefix="/auth",
    tags=["Authentication"]
)

app.include_router(
    account_router,
    prefix="/accounts",
    tags=["Accounts"]
)

app.include_router(
    transaction_router,
    prefix="/transactions",
    tags=["Transactions"]
)

app.include_router(
    bill_router,
    prefix="/bills",
    tags=["Bills"]
)


app.include_router(
    expense_router,
    prefix="/expenses",
    tags=["Expenses"]
)

app.include_router(
    goal_router,
    prefix="/goals",
    tags=["Goals"]
)

app.include_router(
    dashboard_router,
    prefix="/dashboard",
    tags=["Dashboard"]
)

app.include_router(
    budgets.router,
    prefix="/budgets",
    tags=["Budgets"]
)

@app.get("/")
def home():
    return {
        "message": "PFMS API Running"
    }