#!/usr/bin/env python
"""
Script per resettare le password degli utenti che non sono correttamente hashate
"""
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'quicksplit_api.settings')
django.setup()

from expenses.models import User

print("🔧 FIX PASSWORD UTENTI\n")

# Lista utenti con password da resettare
users_to_fix = [
    {'username': 'rida', 'password': 'test123'},
    {'username': 'ridas', 'password': 'test123'},
    {'username': 'lolrida', 'password': 'test123'},
]

for user_data in users_to_fix:
    try:
        user = User.objects.get(username=user_data['username'])
        
        # Controlla se la password è già hashata
        if not user.password.startswith('pbkdf2_'):
            print(f"⚠️  {user.username} - Password NON hashata")
            user.set_password(user_data['password'])
            user.save()
            print(f"   ✅ Password resettata a: {user_data['password']}")
        else:
            print(f"✅ {user.username} - Password già correttamente hashata")
            
    except User.DoesNotExist:
        print(f"❌ {user_data['username']} - Utente non trovato")

print("\n✨ Operazione completata!")
print("\n📋 Puoi ora fare login con:")
for user_data in users_to_fix:
    print(f"   Email: {user_data['username']}@... / Password: {user_data['password']}")
