import React, { useState } from 'react';
import { uploadLogo }      from '../api';

export default function CompanyLogoUpload({ onUploaded }) {
  const [file, setFile]   = useState(null);
  const [error, setError] = useState('');

  const handleChange = e => {
    setFile(e.target.files[0]);
    setError('');
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!file) {
      setError('Selecciona un archivo primero');
      return;
    }
    const fd = new FormData();
    fd.append('logo', file);
    const { data } = await uploadLogo(fd);
    onUploaded(data.logoUrl);
    setFile(null);
  };

  return (
    <form onSubmit={handleSubmit} className="logo-upload-form">
      <input type="file" accept="image/*" onChange={handleChange} className="logo-input" />
      <button type="submit" className="logo-upload-btn">Subir logo</button>
      {error && <div className="logo-error">{error}</div>}
    </form>
  );
}

