<?php

namespace App\Services\Upload;

use App\Exceptions\FileUploadException;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

abstract class AbstractFileUpload
{
    public function __construct(public string $disk) {}

    public function create(UploadedFile $uploadedFile, string $directory, array $options = []): string
    {
        try {
            return Storage::disk($this->disk)->putFile($directory, $uploadedFile);
        } catch (\Throwable $e) {
            throw new FileUploadException('Erreur lors du téléchargement du fichier : ' . $e->getMessage(), 0, $e);
        }
    }

    public function update(?UploadedFile $uploadedFile, string $directory, string $afterFile, array $options = []): string
    {
        try {

            if (null === $uploadedFile) {
                return $afterFile;
            }

            if (Storage::disk($this->disk)->exists($afterFile)) {
                $this->delete($afterFile);
            }

            return Storage::disk($this->disk)->putFile($directory, $uploadedFile);
            
        } catch (\Throwable $e) {
            throw new FileUploadException('Erreur lors du modification du fichier : ' . $e->getMessage(), 0, $e);
        }
    }


    public function delete(string $path): bool
    {
        try {
            return Storage::disk($this->disk)->delete($path);
        } catch (\Exception $e) {
            throw new FileUploadException('Erreur lors de la suppression du fichier : ' . $e->getMessage(), 0, $e);
        }
    }

    // private function isImage(UploadedFile $file): bool
    // {
    //     return in_array($file->getClientOriginalExtension(), ['jpg', 'jpeg', 'png']);
    // }
}
