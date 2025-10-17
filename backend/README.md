# QuickSplit Django Backend

This is the Django backend for the QuickSplit expense splitting application.

## Features

- User authentication and management
- Group creation and member management
- Expense tracking and splitting
- Settlement calculations
- RESTful API with Django REST Framework
- CORS enabled for React frontend

## Models

### User
Custom user model extending Django's AbstractUser with additional fields:
- email (unique)
- created_at
- updated_at

### Group
Model for expense splitting groups:
- name
- description
- created_by (Foreign Key to User)
- members (Many-to-Many with User)
- created_at
- updated_at

### Expense
Model for tracking expenses:
- description
- amount (Decimal)
- group (Foreign Key to Group)
- paid_by (Foreign Key to User)
- split_between (Many-to-Many with User)
- created_at
- updated_at

### Settlement
Model for tracking who owes whom:
- group (Foreign Key to Group)
- from_user (Foreign Key to User)
- to_user (Foreign Key to User)
- amount (Decimal)
- settled (Boolean)
- created_at
- updated_at

## API Endpoints

All endpoints are prefixed with `/api/`

### Users
- `GET /api/users/` - List all users
- `POST /api/users/` - Create a new user
- `GET /api/users/{id}/` - Get user details
- `PUT /api/users/{id}/` - Update user
- `DELETE /api/users/{id}/` - Delete user

### Groups
- `GET /api/groups/` - List all groups (filtered by current user's membership)
- `POST /api/groups/` - Create a new group
- `GET /api/groups/{id}/` - Get group details
- `PUT /api/groups/{id}/` - Update group
- `DELETE /api/groups/{id}/` - Delete group
- `POST /api/groups/{id}/add_member/` - Add a member to the group

### Expenses
- `GET /api/expenses/` - List all expenses (filtered by current user's groups)
- `POST /api/expenses/` - Create a new expense
- `GET /api/expenses/{id}/` - Get expense details
- `PUT /api/expenses/{id}/` - Update expense
- `DELETE /api/expenses/{id}/` - Delete expense
- `GET /api/expenses/by_group/?group_id={id}` - Get expenses for a specific group

### Settlements
- `GET /api/settlements/` - List all settlements
- `POST /api/settlements/` - Create a new settlement
- `GET /api/settlements/{id}/` - Get settlement details
- `PUT /api/settlements/{id}/` - Update settlement
- `DELETE /api/settlements/{id}/` - Delete settlement
- `POST /api/settlements/{id}/mark_settled/` - Mark a settlement as settled

## Setup Instructions

### 1. Create Virtual Environment

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 3. Run Migrations

```bash
python manage.py migrate
```

### 4. Create Superuser (for admin access)

```bash
python manage.py createsuperuser
```

### 5. Run Development Server

```bash
python manage.py runserver
```

The server will start at `http://localhost:8000`

## Admin Panel

Access the Django admin panel at `http://localhost:8000/admin/`

## API Authentication

The API uses session-based authentication. To access protected endpoints:

1. Login via `/api-auth/login/`
2. Use the session cookie for subsequent requests

## CORS Configuration

The backend is configured to accept requests from:
- `http://localhost:5173` (Vite default port)
- `http://127.0.0.1:5173`

To add more origins, edit the `CORS_ALLOWED_ORIGINS` setting in `quicksplit_api/settings.py`

## Database

By default, Django uses SQLite for development. The database file is `db.sqlite3` in the backend directory.

For production, you should configure PostgreSQL or MySQL in the `DATABASES` setting.

## Testing

Run tests with:

```bash
python manage.py test
```

## Development

To create new apps:

```bash
python manage.py startapp <app_name>
```

Remember to add the app to `INSTALLED_APPS` in settings.py
