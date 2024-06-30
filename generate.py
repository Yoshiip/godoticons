import os
import json

# Chemin du répertoire contenant les fichiers d'icônes
icons_directory = 'static/icons'

# Liste pour stocker les noms des fichiers
file_list = []

# Parcourir tous les fichiers du répertoire
for root, dirs, files in os.walk(icons_directory):
    for file in files:
        file = file.split('.')[0]
        file_list.append(file)

# Chemin du fichier JSON de sortie
output_file = 'icons.json'

# Écrire la liste des fichiers dans le fichier JSON
with open(output_file, 'w') as json_file:
    json.dump(file_list, json_file)

print(f"La liste des fichiers a été enregistrée dans {output_file}.")