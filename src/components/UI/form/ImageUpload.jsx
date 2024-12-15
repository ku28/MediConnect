import { FaCloudUploadAlt } from "react-icons/fa";

const ImageUpload = ({ setSelectedImage, setFile }) => {
  const handleFileChange = (event) => {
    const files = event.target.files;

    if (files && files.length > 0) {
      const reader = new FileReader();
      const file = files[0];
      setFile(file);
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div className="change-photo-btn" onClick={() => document.querySelector('.upload').click()}>
        <span className="d-flex align-items-center justify-content-center gap-2">
          <FaCloudUploadAlt className="icon" style={{ fontSize: '2rem' }} />
          <span className="text">Upload Photo</span>
        </span>
        <input type="file" className="upload" onChange={handleFileChange} />
      </div>
      <div>
        <small className="form-text text-muted">Allowed JPG, GIF or PNG. Max size of 2MB</small>
      </div>

      <style jsx>{`
        .change-photo-btn {
          background-color: #50C878; /* Green */
          padding: 8px 20px;
          margin-left: 44px;
          border-radius: 40px;
          margin-bottom:12px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .change-photo-btn:hover {
          background-color: #1e7e34; /* Dark Green */
        }

        .upload {
          display: none; /* Hide the file input */
        }

        .icon {
          color: white;
        }

        .text {
          color: white;
        }
      `}</style>
    </>
  );
};

export default ImageUpload;
