export async function uploadToS3({
    presignedUrl,
    file,
    onUploadProgress,
}: {
    presignedUrl: string;
    file: File;
    onUploadProgress?: (percent: number) => void;
}) {
    return new Promise<void>((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('PUT', presignedUrl);
        xhr.upload.addEventListener('progress', e => {
            if (e.lengthComputable && onUploadProgress) {
                const percent = Math.round((e.loaded / e.total) * 100);
                onUploadProgress(percent);
            }
        });
        xhr.onload = () => {
            if (xhr.status === 200) resolve();
            else reject(new Error(`Upload failed with status ${xhr.status}`));
        };
        xhr.onerror = () => reject(new Error('Network error'));
        xhr.send(file);
    });
}
