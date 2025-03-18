<?php

namespace App\Services\Upload;

class PrivateFileUpload extends AbstractFileUpload
{
    public function __construct()
    {
        parent::__construct('private');
    }
}
