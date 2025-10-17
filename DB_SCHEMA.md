# QuickSplit - Database schema

Schema semplificato delle tabelle principali (SQLite - development)

Table: expenses_user (custom user)
- id (PK)
- username (string)
- email (string, unique)
- password (hashed)
- first_name
- last_name
- balance (decimal)  <-- campo aggiunto per il laboratorio
- created_at
- updated_at

Table: expenses_group
- id (PK)
- name
- description
- created_by (FK -> expenses_user)
- created_at
- updated_at

Table: expenses_expense
- id (PK)
- description
- amount (decimal)
- group_id (FK -> expenses_group)
- paid_by (FK -> expenses_user)
- created_at
- updated_at

Table: expenses_settlement
- id (PK)
- group_id (FK -> expenses_group)
- from_user (FK -> expenses_user)
- to_user (FK -> expenses_user)
- amount (decimal)
- settled (bool)
- created_at
- updated_at

Relazioni principali:
- Un `Group` ha molti `members` (ManyToMany con `User`).
- Una `Expense` appartiene a un `Group` e ha un `paid_by` (User).
