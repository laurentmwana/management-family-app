<?php

namespace App\Services\Actions\Other;

use App\Models\Contact;

interface ContactActionInterface
{
    public function createContact(array $data): Contact;

    public function deleteContact(Contact $contact): bool;
}
