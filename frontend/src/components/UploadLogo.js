// web/frontend/src/components/UploadLogo.js
import React, { useState, useEffect } from 'react';
import { uploadLogo, fetchCompany } from '../api';

export default function UploadLogo() {
  const [file, setFile]       = useState(null);
  const [preview, setPreview] = useState('');

  useEffect(() => {
    fetchCompany().then(r => setPreview(r.data.logo));
  }, []);

  const handle = async e => {
    e.preventDefault();
    const fd = new FormData();
    fd.append('logo', file);
    const { data } = await uploadLogo(fd);
    setPreview(data.logo);
  };

  return (
    <form onSubmit={handle} className="bg-white p-6 rounded shadow max-w-sm mx-auto">
      <h2 className="text-xl mb-4">Subir Logo</h2>
      {preview && <img src={preview} className="mb-4 h-16 object-contain" />}
      <input
        type="file"
        accept="image/*"
        onChange={e => setFile(e.target.files[0])}
        className="mb-4"
        required
      />
      <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">
        Subir
      </button>
    </form>
  );
}
