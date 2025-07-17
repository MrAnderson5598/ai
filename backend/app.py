from flask import Flask, request, send_file
import os

app = Flask(__name__)
@app.route('/upload', methods=['POST'])
def upload_media():
    print("Request received!")  # 👈 Add this
    media = request.files.get('media')
    if not media:
        print("No file uploaded.")
        return "No file received", 400

    print(f"Received file: {media.filename}")

    file_type = media.filename.split('.')[-1].lower()
    uploads_dir = os.path.join(os.getcwd(), 'uploads', 'user_files')
    os.makedirs(uploads_dir, exist_ok=True)

    input_path = os.path.join(uploads_dir, media.filename)
    media.save(input_path)

    output_path = input_path  # Placeholder
    return send_file(output_path)



if __name__ == '__main__':
    app.run(debug=True)
