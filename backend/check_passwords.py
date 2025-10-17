#!/usr/bin/env python
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'quicksplit_api.settings')
django.setup()

from expenses.models import User
from django.contrib.auth import authenticate

print("=" * 60)
print("VERIFICA PASSWORD UTENTI")
print("=" * 60)

users = User.objects.all()

for user in users:
    print(f"\n👤 Username: {user.username}")
    print(f"   Email: {user.email}")
    print(f"   Password hash: {user.password[:50]}...")
    
    # Verifica se la password è hashata correttamente
    if user.password.startswith('pbkdf2_'):
        print("   ✅ Password correttamente hashata")
    else:
        print("   ❌ Password NON hashata correttamente!")
        print(f"   ⚠️  Password in chiaro: {user.password}")
        
    # Prova a indovinare password comuni
    common_passwords = ['test123', 'test1234', 'password', '123456', 'admin', 'admin123']
    
    for pwd in common_passwords:
        auth_user = authenticate(username=user.username, password=pwd)
        if auth_user:
            print(f"   🔑 Password trovata: '{pwd}' ✅")
            break
    else:
        print("   🔒 Password non tra quelle comuni testate")

print("\n" + "=" * 60)
print("SUGGERIMENTI")
print("=" * 60)

for user in users:
    if not user.password.startswith('pbkdf2_'):
        print(f"\n⚠️  L'utente '{user.username}' ha una password non hashata!")
        print(f"   Soluzione: Resetta la password con:")
        print(f"   python manage.py shell -c \"from expenses.models import User; u = User.objects.get(username='{user.username}'); u.set_password('nuova_password'); u.save()\"")
