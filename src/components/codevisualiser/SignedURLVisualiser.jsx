import React, { useState, useEffect } from 'react';
//import { Play, RotateCcw, Upload, Server, Cloud, CheckCircle, Lock, Key, FileText, Image, Shield } from 'lucide-react';

import {
  MdPlayArrow,
  MdRotateLeft,
  MdUpload,
  MdDns,
  MdCloud,
  MdCheckCircle,
  MdLock,
  MdKey,
  MdDescription,
  MdImage,
  MdShield
} from "react-icons/md";

const SignedURLVisualizer = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [uploadMethod, setUploadMethod] = useState('signedURL');

  const steps = {
    signedURL: [
      {
        id: 1,
        title: 'User Selects File',
        description: 'User chooses a file from their device',
        actors: ['user'],
        code: `// Frontend
const file = event.target.files[0];
console.log('File selected:', file.name);`,
        visual: { user: true, frontend: false, backend: false, storage: false }
      },
      {
        id: 2,
        title: 'Request Signed URL',
        description: 'Frontend requests a pre-signed URL from backend',
        actors: ['user', 'frontend', 'backend'],
        code: `// Frontend
const response = await fetch('/api/upload/signed-url', {
  method: 'POST',
  body: JSON.stringify({
    fileName: file.name,
    fileType: file.type,
    fileSize: file.size
  })
});`,
        visual: { user: false, frontend: true, backend: true, storage: false },
        flow: 'frontend-to-backend'
      },
      {
        id: 3,
        title: 'Generate Signed URL',
        description: 'Backend creates a temporary, secure upload URL',
        actors: ['backend', 'storage'],
        code: `// Backend (Node.js + AWS S3)
const s3 = new AWS.S3();
const signedUrl = s3.getSignedUrl('putObject', {
  Bucket: 'my-bucket',
  Key: fileName,
  ContentType: fileType,
  Expires: 300 // 5 minutes
});`,
        visual: { user: false, frontend: false, backend: true, storage: true },
        flow: 'backend-to-storage'
      },
      {
        id: 4,
        title: 'Return Signed URL',
        description: 'Backend sends the signed URL back to frontend',
        actors: ['backend', 'frontend'],
        code: `// Backend Response
res.json({
  uploadUrl: signedUrl,
  fileUrl: publicUrl,
  expiresIn: 300
});`,
        visual: { user: false, frontend: true, backend: true, storage: false },
        flow: 'backend-to-frontend'
      },
      {
        id: 5,
        title: 'Upload Directly to Storage',
        description: 'Frontend uploads file directly to cloud storage using signed URL',
        actors: ['frontend', 'storage'],
        code: `// Frontend - Direct Upload
await fetch(signedUrl, {
  method: 'PUT',
  body: file,
  headers: {
    'Content-Type': file.type
  }
});`,
        visual: { user: false, frontend: true, backend: false, storage: true },
        flow: 'frontend-to-storage'
      },
      {
        id: 6,
        title: 'Upload Complete',
        description: 'File successfully uploaded, frontend notifies backend',
        actors: ['frontend', 'backend'],
        code: `// Frontend - Confirm Upload
await fetch('/api/upload/confirm', {
  method: 'POST',
  body: JSON.stringify({
    fileUrl: publicUrl,
    status: 'completed'
  })
});`,
        visual: { user: false, frontend: true, backend: true, storage: true },
        success: true
      }
    ],
    traditional: [
      {
        id: 1,
        title: 'User Selects File',
        description: 'User chooses a file from their device',
        actors: ['user'],
        code: `// Frontend
const file = event.target.files[0];`,
        visual: { user: true, frontend: false, backend: false, storage: false }
      },
      {
        id: 2,
        title: 'Upload to Backend',
        description: 'File is sent to backend server',
        actors: ['frontend', 'backend'],
        code: `// Frontend
const formData = new FormData();
formData.append('file', file);

await fetch('/api/upload', {
  method: 'POST',
  body: formData
});`,
        visual: { user: false, frontend: true, backend: true, storage: false },
        flow: 'frontend-to-backend',
        issue: 'Backend handles entire file'
      },
      {
        id: 3,
        title: 'Backend Processes',
        description: 'Backend receives and validates file (uses server resources)',
        actors: ['backend'],
        code: `// Backend
app.post('/api/upload', upload.single('file'), (req, res) => {
  // File is in server memory/disk
  const file = req.file;
});`,
        visual: { user: false, frontend: false, backend: true, storage: false },
        issue: 'Server memory/CPU used'
      },
      {
        id: 4,
        title: 'Upload to Storage',
        description: 'Backend uploads file to cloud storage',
        actors: ['backend', 'storage'],
        code: `// Backend uploads to S3
const result = await s3.upload({
  Bucket: 'my-bucket',
  Key: fileName,
  Body: file.buffer
}).promise();`,
        visual: { user: false, frontend: false, backend: true, storage: true },
        flow: 'backend-to-storage',
        issue: 'Double network transfer'
      },
      {
        id: 5,
        title: 'Return Response',
        description: 'Backend sends success response to frontend',
        actors: ['backend', 'frontend'],
        code: `// Backend Response
res.json({
  fileUrl: result.Location,
  status: 'uploaded'
});`,
        visual: { user: false, frontend: true, backend: true, storage: true },
        flow: 'backend-to-frontend'
      }
    ]
  };


  const advantages = {
    signedURL: [
      { title: 'Direct Upload', desc: 'Files go directly to storage, bypassing backend', icon: MdCloud },
      { title: 'Reduced Server Load', desc: 'Backend only generates URLs, not handling files', icon: MdDns },
      { title: 'Better Performance', desc: 'Single network hop for file transfer', icon: MdCheckCircle },
      { title: 'Scalability', desc: 'No backend bottleneck for large files', icon: MdUpload },
      { title: 'Security', desc: 'Temporary URLs with expiration', icon: MdLock },
      { title: 'Cost Effective', desc: 'Lower bandwidth costs on backend', icon: MdShield }
    ],
    traditional: [
      { title: 'Double Transfer', desc: 'File travels: Client → Backend → Storage', icon: MdDns, negative: true },
      { title: 'Server Resources', desc: 'Backend handles file processing', icon: MdUpload, negative: true },
      { title: 'Slower Upload', desc: 'Two network hops instead of one', icon: MdCloud, negative: true },
      { title: 'Scalability Issues', desc: 'Backend becomes bottleneck', icon: MdShield, negative: true }
    ]
  };

  const currentSteps = steps[uploadMethod];
  const totalSteps = currentSteps.length;

  useEffect(() => {
    let interval;
    if (isAnimating && currentStep < totalSteps - 1) {
      interval = setTimeout(() => {
        setCurrentStep(currentStep + 1);
      }, 2000);
    } else if (currentStep >= totalSteps - 1) {
      setIsAnimating(false);
    }
    return () => clearTimeout(interval);
  }, [isAnimating, currentStep, totalSteps]);

  const playAnimation = () => {
    setIsAnimating(true);
    setCurrentStep(0);
  };

  const reset = () => {
    setCurrentStep(0);
    setIsAnimating(false);
  };

  const changeMethod = (method) => {
    setUploadMethod(method);
    reset();
  };

  const stepData = currentSteps[currentStep];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-500 to-pink-500 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 drop-shadow-lg">
            <MdLock className='w8 h8' />Signed URL Upload Visualizer
          </h1>
          <p className="text-white text-lg opacity-90">Understanding Secure File Upload Mechanisms</p>
        </div>

        {/* Method Selection */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Select Upload Method</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              onClick={() => changeMethod('signedURL')}
              className={`p-6 rounded-xl transition-all transform hover:scale-105 ${
                uploadMethod === 'signedURL'
                  ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <div className="flex items-center justify-center mb-2">
                <MdShield size={32} className={uploadMethod === 'signedURL' ? 'text-white' : 'text-green-600'} />
              </div>
              <div className="font-bold text-xl mb-2">Signed URL (Recommended)</div>
              <div className="text-sm opacity-80">Direct upload to cloud storage with temporary secure URLs</div>
            </button>
            <button
              onClick={() => changeMethod('traditional')}
              className={`p-6 rounded-xl transition-all transform hover:scale-105 ${
                uploadMethod === 'traditional'
                  ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <div className="flex items-center justify-center mb-2">
                <MdDns size={32} className={uploadMethod === 'traditional' ? 'text-white' : 'text-orange-600'} />
              </div>
              <div className="font-bold text-xl mb-2">Traditional (Via Backend)</div>
              <div className="text-sm opacity-80">Upload through backend server to storage</div>
            </button>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 mb-6">
          <div className="flex flex-wrap gap-4 justify-center items-center">
            <button
              onClick={playAnimation}
              disabled={isAnimating}
              className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-xl font-bold transition-all transform hover:scale-105"
            >
              <MdPlayArrow size={20} />
              <span>Play Animation</span>
            </button>
            <button
              onClick={reset}
              className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-bold transition-all transform hover:scale-105"
            >
              <MdRotateLeft size={20} />
              <span>Reset</span>
            </button>
            <div className="bg-blue-100 px-6 py-3 rounded-xl">
              <span className="font-bold text-blue-700">Step {currentStep + 1} / {totalSteps}</span>
            </div>
          </div>
        </div>

        {/* Visual Diagram */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 mb-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Upload Flow Visualization</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            {/* User */}
            <div className={`flex flex-col items-center transition-all duration-500 ${
              stepData.visual.user ? 'scale-110 opacity-100' : 'opacity-40'
            }`}>
              <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-3 ${
                stepData.visual.user ? 'bg-blue-500 shadow-xl animate-pulse' : 'bg-gray-300'
              }`}>
                <MdDescription size={40} className="text-white" />
              </div>
              <div className="font-bold text-gray-800">User</div>
              <div className="text-xs text-gray-600">Client Device</div>
            </div>

            {/* Frontend */}
            <div className={`flex flex-col items-center transition-all duration-500 ${
              stepData.visual.frontend ? 'scale-110 opacity-100' : 'opacity-40'
            }`}>
              <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-3 ${
                stepData.visual.frontend ? 'bg-purple-500 shadow-xl animate-pulse' : 'bg-gray-300'
              }`}>
                <MdImage size={40} className="text-white" />
              </div>
              <div className="font-bold text-gray-800">Frontend</div>
              <div className="text-xs text-gray-600">React/Vue/Angular</div>
            </div>

            {/* Backend */}
            <div className={`flex flex-col items-center transition-all duration-500 ${
              stepData.visual.backend ? 'scale-110 opacity-100' : 'opacity-40'
            }`}>
              <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-3 ${
                stepData.visual.backend ? 'bg-orange-500 shadow-xl animate-pulse' : 'bg-gray-300'
              }`}>
                <MdDns size={40} className="text-white" />
              </div>
              <div className="font-bold text-gray-800">Backend</div>
              <div className="text-xs text-gray-600">Node.js/Express</div>
            </div>

            {/* Storage */}
            <div className={`flex flex-col items-center transition-all duration-500 ${
              stepData.visual.storage ? 'scale-110 opacity-100' : 'opacity-40'
            }`}>
              <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-3 ${
                stepData.visual.storage ? 'bg-green-500 shadow-xl animate-pulse' : 'bg-gray-300'
              }`}>
                <MdCloud size={40} className="text-white" />
              </div>
              <div className="font-bold text-gray-800">Storage</div>
              <div className="text-xs text-gray-600">AWS S3/GCS</div>
            </div>
          </div>

          {/* Flow Arrow */}
          {stepData.flow && (
            <div className="flex justify-center mb-6">
              <div className={`bg-gradient-to-r ${
                stepData.flow === 'frontend-to-backend' ? 'from-purple-500 to-orange-500' :
                stepData.flow === 'backend-to-storage' ? 'from-orange-500 to-green-500' :
                stepData.flow === 'backend-to-frontend' ? 'from-orange-500 to-purple-500' :
                'from-purple-500 to-green-500'
              } text-white px-6 py-3 rounded-full font-bold text-sm animate-pulse flex items-center space-x-2`}>
                <span>Data Flow</span>
                <span>→</span>
              </div>
            </div>
          )}

          {/* Current Step Info */}
          <div className={`rounded-xl p-6 border-4 ${
            stepData.success ? 'bg-green-50 border-green-500' :
            stepData.issue ? 'bg-orange-50 border-orange-500' :
            'bg-blue-50 border-blue-500'
          }`}>
            <div className="flex items-center space-x-3 mb-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                stepData.success ? 'bg-green-500' :
                stepData.issue ? 'bg-orange-500' :
                'bg-blue-500'
              }`}>
                <span className="text-white font-bold">{currentStep + 1}</span>
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-800">{stepData.title}</h4>
                <p className="text-gray-600 text-sm">{stepData.description}</p>
              </div>
            </div>
            {stepData.issue && (
              <div className="bg-orange-200 border-2 border-orange-400 rounded-lg p-3 mt-3">
                <div className="text-orange-800 font-semibold text-sm">⚠️ Issue: {stepData.issue}</div>
              </div>
            )}
          </div>
        </div>

        {/* Code Example */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <MdKey className="mr-2 text-blue-600" size={24} />
            Code Example - Step {currentStep + 1}
          </h3>
          <div className="bg-gray-900 rounded-lg p-4">
            <pre className="text-gray-100 text-sm font-mono whitespace-pre-wrap overflow-x-auto">
              {stepData.code}
            </pre>
          </div>
        </div>

        {/* Advantages */}
        <div className="bg-white rounded-2xl shadow-2xl p-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">
            {uploadMethod === 'signedURL' ? '✅ Advantages of Signed URL' : '⚠️ Traditional Method Issues'}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {advantages[uploadMethod].map((advantage, index) => {
              const IconComponent = advantage.icon;
              return (
                <div
                  key={index}
                  className={`rounded-xl p-4 border-2 ${
                    advantage.negative
                      ? 'bg-red-50 border-red-300'
                      : 'bg-green-50 border-green-300'
                  }`}
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <IconComponent
                      size={24}
                      className={advantage.negative ? 'text-red-600' : 'text-green-600'}
                    />
                    <div className={`font-bold ${
                      advantage.negative ? 'text-red-700' : 'text-green-700'
                    }`}>
                      {advantage.title}
                    </div>
                  </div>
                  <div className={`text-sm ${
                    advantage.negative ? 'text-red-600' : 'text-green-600'
                  }`}>
                    {advantage.desc}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignedURLVisualizer;