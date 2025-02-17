export const downloadImageService = async image => {
  try {
    if (image) {
      const response = await fetch(image.url);

      if (response) {
        const blob = await response.blob();

        const url = URL.createObjectURL(blob);
        const fileName = image.url.split('/');

        const link = document.createElement('a');
        link.download = `image-${fileName[3]}.jpg`;
        link.href = url;

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        URL.revokeObjectURL(url);
      }
    }
  } catch (e) {
    console.log(e);
  }
};

export const getBase64 = file =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
