import React, { useRef, useState, type ChangeEvent } from 'react';
import plus_icon from '../../assets/plus_icon.svg';

type ImageUploadProps = {
  onFileSelect: (file: File | null) => void;
};

const ImageUpload: React.FC<ImageUploadProps> = ({ onFileSelect }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPreview(URL.createObjectURL(file));
      onFileSelect(file);
    } else {
      setPreview(null);
      onFileSelect(null);
    }
  };

  const handleClear = () => {
    setPreview(null);
    onFileSelect(null);
    if (fileInputRef.current) {
        fileInputRef.current.value = ""; // очистити input файл
      }
  };
  const openFileDialog = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  return (
    <div className="image-upload-widget">
    {!preview ? (
      <div>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: "none" }} // приховуємо стандартний інпут
        />
        <button
          type="button"
          onClick={openFileDialog}
          className="hover:bg-[#C4C9D4] cursor-pointer w-[350px] h-[450px] border-6 border-[#C4C9D4] rounded-xl flex items-center justify-center transition-all duration-300"
        >
          <img src={plus_icon} alt="Завантажити фото" className="size-[96px]" />
        </button>
      </div>
    ) : (
      <div className="flex flex-col justify-center items-left">
        <img
          src={preview}
          alt="Preview"
          className="rounded-xl w-[350px] h-[450px] object-cover mb-4 border border-gray-300"
        />
        <button
          type="button"
          onClick={handleClear}
          className="px-24 py-4 bg-[#222831] uppercase text-[#DFD0B8] text-lg font-display font-bold rounded-[50px]"
        >
          Clear
        </button>
      </div>
    )}
  </div>
  );
};

export default ImageUpload;
