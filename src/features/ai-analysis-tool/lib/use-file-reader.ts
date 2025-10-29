
'use client';

import { useState, useCallback } from 'react';

interface FileReaderOptions {
    maxSize?: number; // in MB
    onSizeError?: () => void;
}

export const useFileReader = ({ maxSize, onSizeError }: FileReaderOptions = {}) => {
    const [file, setFile] = useState<File | null>(null);
    const [filePreview, setFilePreview] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (!selectedFile) return;

        if (maxSize && selectedFile.size > maxSize * 1024 * 1024) {
            onSizeError?.();
            setError(`File is too large. Max size: ${maxSize}MB`);
            return;
        }

        setFile(selectedFile);
        setError(null);

        const reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = () => {
            setFilePreview(reader.result as string);
        };
    }, [maxSize, onSizeError]);

    const clearFile = useCallback(() => {
        setFile(null);
        setFilePreview(null);
        setError(null);
    }, []);

    return {
        file,
        filePreview: filePreview as string, // Assert as string for easier use, since it's only set with a string
        error,
        handleFileChange,
        clearFile,
    };
};
