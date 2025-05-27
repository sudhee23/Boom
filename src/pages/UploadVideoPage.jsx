import UploadVideoForm from "../forms/UploadVideoForm";

const UploadVideoPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-12">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-10">
        <h2 className="text-3xl font-bold text-blue-900 mb-6 text-center">Upload Your Video</h2>
        <UploadVideoForm />
      </div>
    </div>
  );
};

export default UploadVideoPage;
