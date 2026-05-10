'use client';

import { useId, useState } from 'react';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';
import {
  getProductImagePath,
  PRODUCT_MEDIA_BUCKET,
  validateProductImageFile,
} from '@/lib/upload-policy';

const toLines = (value = '') =>
  value
    .split(/\r?\n/)
    .map((item) => item.trim())
    .filter(Boolean);

export default function ProductImagesField({
  name = 'images',
  defaultValue = '',
  productRef = '',
}) {
  const [value, setValue] = useState(defaultValue);
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState('');
  const fieldId = useId();

  async function handleUpload(event) {
    const file = event.target.files?.[0];

    if (!file) return;

    setIsUploading(true);
    setMessage('');

    try {
      const validationError = validateProductImageFile(file);
      if (validationError) {
        throw new Error(validationError);
      }

      const supabase = createSupabaseBrowserClient();
      const filePath = getProductImagePath({ file, productRef });

      const { error: uploadError } = await supabase.storage
        .from(PRODUCT_MEDIA_BUCKET)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (uploadError) {
        throw uploadError;
      }

      const { data } = supabase.storage.from(PRODUCT_MEDIA_BUCKET).getPublicUrl(filePath);
      const urls = new Set([...toLines(value), data.publicUrl]);
      setValue(Array.from(urls).join('\n'));
      setMessage('Imagem enviada e URL adicionada ao produto.');
    } catch (error) {
      setMessage(error.message || 'Falha no upload da imagem.');
    } finally {
      setIsUploading(false);
      event.target.value = '';
    }
  }

  return (
    <div className="upload-field">
      <label htmlFor={fieldId}>
        Imagens
        <textarea
          id={fieldId}
          name={name}
          rows="3"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="Uma URL por linha ou separadas por virgula"
        />
      </label>

      <div className="upload-row">
        <label className="button secondary upload-button" htmlFor={`${fieldId}-file`}>
          {isUploading ? 'Enviando...' : 'Upload de foto'}
        </label>
        <input
          id={`${fieldId}-file`}
          className="upload-input"
          type="file"
          accept="image/*"
          onChange={handleUpload}
          disabled={isUploading}
        />
        <span className="muted upload-help">
          JPG, PNG ou WebP ate 5 MB. Leitura publica; envio apenas para usuarios autenticados.
        </span>
      </div>

      {message ? <p className="upload-message muted">{message}</p> : null}
    </div>
  );
}
