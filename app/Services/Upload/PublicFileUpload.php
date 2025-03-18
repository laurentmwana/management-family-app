<?php

namespace App\Services\Upload;

use Illuminate\Http\UploadedFile;

class PublicFileUpload extends AbstractFileUpload
{
    public function __construct()
    {
        parent::__construct('public');
    }
}
