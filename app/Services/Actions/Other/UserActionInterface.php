<?php

namespace App\Services\Actions\Other;

use App\Models\User;

interface UserActionInterface
{
    public function createUser(array $data): User;

    public function updateUser(array $data, User $user): User;

    public function deleteUser(User $user): bool;

    public function changePassword(User $user): bool;
}
