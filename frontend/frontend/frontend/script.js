document.getElementById('uploadForm').onsubmit = async function(e) {
  e.preventDefault();
  const formData = new FormData(this);
  const res = await fetch('http://localhost:5000/upload', {
    method: 'POST',
    body: formData
  });
  const blob = await res.blob();
  const url = URL.createObjectURL(blob);
  document.getElementById('result').innerHTML = `<video src="${url}" controls></video>`;
};
