export const listMenu = [
  {
    name: "Dashboard",
    link: "/",
  },
  {
    name: "Tin tức",
    link: "/news",
  },
];

export const indexMethod = (
  index: number,
  currentPage: number,
  limit?: number
) => {
  return (currentPage - 1) * (limit || 10) + index + 1;
};

export const removeEmptyValueInObject = (obj: any) => {
  return Object.entries(obj).reduce(
    (acc, [k, v]) =>
      v !== "" && v !== undefined && v !== null ? { ...acc, [k]: v } : acc,
    {}
  );
};

const fileSizeMaxCustom = 0.3 * 1024 * 1024;
export const calculateCompressCapacityCustom = (fileSize: number) => {
  if (fileSize > fileSizeMaxCustom) {
    const sizePercent = Math.ceil(fileSize - fileSizeMaxCustom);
    const compressPercent = Math.floor((sizePercent / fileSize) * 100);
    return (100 - compressPercent) / 100;
  }
  return 100 / 100;
};

export const resizeImage = (imageBase64: any): Promise<any> => {
  return new Promise((resolve) => {
    let image: any = new Image();
    image.onload = function () {
      const canvas = document.createElement("canvas");
      const typeImage = imageBase64.substring(
        "data:".length,
        imageBase64.indexOf(";base64")
      );
      let max_size = 0.3 * 1024,
        width = image.width,
        height = image.height;
      if (width > height) {
        if (width > max_size) {
          height *= max_size / width;
          width = max_size;
        }
      } else {
        if (height > max_size) {
          width *= max_size / height;
          height = max_size;
        }
      }
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      if (ctx != null) {
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

        window.webkitURL.revokeObjectURL(image.src);
        image.src = "";
      }

      var data = canvas.toDataURL(typeImage, 0.5);
      canvas.remove();
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
      image.onload = null;
      image = null;
      resolve(data);
    };
    image.src = imageBase64;
  });
};
const BASE64_MARKER = ";base64,";
export const dataURLtoFile = (dataURI: any, filename: string) => {
  let arr = dataURI.split(","),
    mime = arr[0].match(/:(.*?);/)[1];
  const base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
  const base64 = dataURI.substring(base64Index);
  const raw = window.atob(base64);
  const rawLength = raw.length;
  const array = new Uint8Array(new ArrayBuffer(rawLength));

  for (let i = 0; i < rawLength; i++) {
    array[i] = raw.charCodeAt(i);
  }

  return new File([array], filename, { type: mime });
};

export const compressFile = async (file: File, onLoadCallBack: any) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = async (e) => {
    await resizeImage(reader.result as string).then(async (resolve: any) => {
      onLoadCallBack(dataURLtoFile(resolve, file.name));
      reader.abort();
    });
  };
};
