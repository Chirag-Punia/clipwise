import { useDropzone } from 'react-dropzone';

export function FileUploader({ onDrop }) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/plain': ['.txt'],
      'application/pdf': ['.pdf'],
      'image/*': ['.png', '.jpg', '.jpeg']
    }
  });

  return (
    <div {...getRootProps()} className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here...</p>
      ) : (
        <p>Drag 'n' drop files here, or click to select files</p>
      )}
    </div>
  );
}