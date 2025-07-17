
document.getElementById('uploadForm').onsubmit = async function(e) {
  e.preventDefault();

  const input = this.querySelector('input[type="file"]');
  if (!input.files.length) {
    alert("Please choose a file to enhance.");
    return;
  }

  const formData = new FormData();
  formData.append('media', input.files[0]);

  try {
    const res = await fetch('http://localhost:5000/upload', {
      method: 'POST',
      body: formData
    });

    if (!res.ok) {
      throw new Error("Server error: " + res.statusText);
    }

    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const isVideo = blob.type.includes('video');

    document.getElementById('result').innerHTML = isVideo
      ? `<video src="${url}" controls></video>`
      : `<img src="${url}" alt="Enhanced media"/>`;
  } catch (err) {
    console.error(err);
    alert("Something went wrong. Please check if the backend is running.");
  }
};
