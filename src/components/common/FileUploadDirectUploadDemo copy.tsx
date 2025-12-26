'use client';

import {Upload, X} from 'lucide-react';
import * as React from 'react';
import {toast} from 'sonner';
import {Button} from '@/components/ui/button';
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadItemDelete,
  FileUploadItemMetadata,
  FileUploadItemPreview,
  FileUploadItemProgress,
  FileUploadList,
  type FileUploadProps,
  FileUploadTrigger,
} from '@/components/ui/file-upload';
import {
  useGetPublicUploadUrlMutation,
  useUploadToS3Mutation,
} from '@/features/content/contentApi';

export function FileUploadDirectUploadDemo({
  onUploaded,
  getKey,
  maxFiles = 1, // default to 2 if not provided
}: {
  onUploaded?: (url: string) => void;
  getKey?: (key: string) => void;
  maxFiles?: number;
}) {
  const [files, setFiles] = React.useState<File[]>([]);

  // RTK Query hooks
  const [getPublicUploadUrl] = useGetPublicUploadUrlMutation();
  const [uploadToS3] = useUploadToS3Mutation();

  const onUpload: NonNullable<FileUploadProps['onUpload']> = React.useCallback(
    async (files, {onProgress, onSuccess, onError}) => {
      try {
        const uploadPromises = files.map(async (file) => {
          try {
            const res = await getPublicUploadUrl({
              fileName: file.name,
              fileType: file.type,
              fileSize: file.size,
            }).unwrap();

            if (!res?.data?.uploadUrl)
              throw new Error('No upload URL returned');

            await uploadToS3({
              presignedUrl: res.data.uploadUrl,
              file,
              onUploadProgress: (percent) => onProgress(file, percent),
            }).unwrap();

            // ✅ Call parent callback with final public URL
            if (onUploaded && res.data.url) onUploaded(res.data.url);

            if (getKey && res.data.key) getKey(res.data.key);

            // toast.success(`✅ Uploaded: ${file.name}`);
            onSuccess(file);
          } catch (error) {
            console.error('Upload failed:', error);
            toast.error(`❌ Failed: ${file.name}`);
            onError(
              file,
              error instanceof Error ? error : new Error('Upload failed')
            );
          }
        });

        await Promise.all(uploadPromises);
      } catch (error) {
        console.error('Unexpected upload error:', error);
      }
    },
    [getPublicUploadUrl, uploadToS3, onUploaded, getKey]
  );

  const onFileReject = React.useCallback((file: File, message: string) => {
    toast(message, {
      description: `"${
        file.name.length > 20 ? `${file.name.slice(0, 20)}...` : file.name
      }" has been rejected`,
    });
  }, []);

  return (
    <FileUpload
      value={files}
      onValueChange={setFiles}
      onUpload={onUpload}
      onFileReject={onFileReject}
      maxFiles={maxFiles}
      multiple
      className="w-full max-w-lg">
      <FileUploadDropzone>
        <div className="flex flex-col items-center gap-1 text-center">
          <div className="flex items-center justify-center rounded-full border p-2.5">
            <Upload className="size-6 text-muted-foreground" />
          </div>
          <p className="font-medium text-sm">Drag & drop files here</p>
          <p className="text-muted-foreground text-xs">
            Or click to browse (max 2 files)
          </p>
        </div>
        <FileUploadTrigger asChild>
          <Button variant="outline" size="sm" className="mt-2 w-fit">
            Browse files
          </Button>
        </FileUploadTrigger>
      </FileUploadDropzone>

      <FileUploadList>
        {files.map((file, index) => (
          <FileUploadItem key={index} value={file} className="flex-col">
            <div className="flex w-full items-center gap-2">
              <FileUploadItemPreview />
              <FileUploadItemMetadata />
              <FileUploadItemDelete asChild>
                <Button variant="ghost" size="icon" className="size-7">
                  <X />
                </Button>
              </FileUploadItemDelete>
            </div>
            <FileUploadItemProgress />
          </FileUploadItem>
        ))}
      </FileUploadList>
    </FileUpload>
  );
}
