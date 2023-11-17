import re

def remove_special_characters(input_file, output_file):
    with open(input_file, 'r', encoding='utf-8') as file:
        lines = file.readlines()

    cleaned_lines = [line for line in lines if not re.search(r'[^\w\s]', line)]

    with open(output_file, 'w', encoding='utf-8') as file:
        file.writelines(cleaned_lines)

# Example usage:
input_file_path = r"C:\Users\Aadil Sayad\Documents\SpeechCraft\en_clean_50k.txt"
output_file_path = r'C:\Users\Aadil Sayad\Documents\SpeechCraft\cleaned_example.txt'

remove_special_characters(input_file_path, output_file_path)
