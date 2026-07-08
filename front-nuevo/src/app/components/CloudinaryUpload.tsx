import { useState, useRef, useEffect } from "react";
import { getUploadSignature } from "../lib/api";
import { Button } from "./ui/button";

interface Props {
  tipo: "image" | "sign";
  onUpload: (url: string) => void;
  currentUrl?: string;
}

const CONFIG = {
  image: {
    label: "imagen",
    accept: "image/jpeg,image/png,image/webp",
    folder: "senasapp/image",
    maxMb: 10,
  },
  sign: {
    label: "seña (video o GIF)",
    accept: "video/mp4,video/webm,image/gif",
    folder: "senasapp/sign",
    maxMb: 30,
  },
};

function detectMediaKind(file: File): "video" | "gif" | "image" {
  if (file.type.startsWith("video/")) return "video";
  if (file.type === "image/gif") return "gif";
  return "image";
}

function isGifUrl(url: string): boolean {
  return /\.gif(\?|$)/i.test(url) || url.includes("/image/upload/") && url.includes(".gif");
}

function isVideoUrl(url: string): boolean {
  return url.includes("/video/upload/") || /\.(mp4|webm|mov)(\?|$)/i.test(url);
}

export default function CloudinaryUpload({ tipo, onUpload, currentUrl }: Props) {
  const [subiendo, setSubiendo] = useState(false);
  const [error, setError] = useState("");
  const [preview, setPreview] = useState(currentUrl || "");
  const inputRef = useRef<HTMLInputElement>(null);
  const config = CONFIG[tipo];

  useEffect(() => {
    setPreview(currentUrl || "");
  }, [currentUrl]);

  const handleFileChange = async () => {
    const archivo = inputRef.current?.files?.[0];
    if (!archivo) return setError("Selecciona un archivo primero");

    const maxBytes = config.maxMb * 1024 * 1024;
    if (archivo.size > maxBytes) {
      return setError(`El archivo no debe superar ${config.maxMb} MB`);
    }

    setSubiendo(true);
    setError("");

    try {
      const mediaKind = tipo === "image" ? "image" : detectMediaKind(archivo);
      const sig = await getUploadSignature(config.folder, mediaKind);
      const formData = new FormData();
      formData.append("api_key", sig.api_key);
      formData.append("timestamp", String(sig.timestamp));
      formData.append("signature", sig.signature);
      formData.append("folder", sig.folder);
      formData.append("file", archivo);

      const resourceType = sig.resource_type || (mediaKind === "video" ? "video" : "image");
      const uploadUrl = `https://api.cloudinary.com/v1_1/${sig.cloud_name}/${resourceType}/upload`;

      const url = await new Promise<string>((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", uploadUrl, true);
        xhr.onload = () => {
          try {
            const data = JSON.parse(xhr.responseText);
            if (xhr.status === 200) resolve(data.secure_url || data.url);
            else reject(new Error(data.error?.message || "Error al subir archivo"));
          } catch {
            reject(new Error("Error al procesar respuesta de Cloudinary"));
          }
        };
        xhr.onerror = () => reject(new Error("Error de conexión con Cloudinary"));
        xhr.send(formData);
      });

      setPreview(url);
      onUpload(url);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Error al subir archivo";
      setError(message);
    } finally {
      setSubiendo(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3 flex-wrap">
        <Button
          type="button"
          variant="outline"
          onClick={() => inputRef.current?.click()}
          disabled={subiendo}
          className="border-2 border-[var(--beige-border)] rounded-[16px]"
        >
          {subiendo ? "⏳ Subiendo..." : `📁 Seleccionar ${config.label}`}
        </Button>
        <input
          ref={inputRef}
          type="file"
          accept={config.accept}
          className="hidden"
          onChange={handleFileChange}
          disabled={subiendo}
        />
      </div>

      {error && (
        <p className="text-red-600 text-sm">{error}</p>
      )}

      {preview && (
        <div className="mt-3">
          {tipo === "image" ? (
            <img
              src={preview}
              alt="Vista previa"
              className="w-24 h-24 object-cover rounded-[12px] border-2 border-[var(--beige-border)]"
            />
          ) : isGifUrl(preview) ? (
            <img
              src={preview}
              alt="Vista previa GIF"
              className="w-32 rounded-[12px] border-2 border-[var(--beige-border)]"
            />
          ) : isVideoUrl(preview) ? (
            <video
              src={preview}
              controls
              playsInline
              className="w-48 rounded-[12px] border-2 border-[var(--beige-border)]"
              style={{ maxHeight: "200px" }}
            />
          ) : (
            <video
              src={preview}
              controls
              playsInline
              className="w-48 rounded-[12px] border-2 border-[var(--beige-border)]"
              style={{ maxHeight: "200px" }}
            />
          )}
        </div>
      )}
    </div>
  );
}
