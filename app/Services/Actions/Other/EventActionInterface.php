<?php

namespace App\Services\Actions\Other;

use App\Models\Event;

interface EventActionInterface
{
    public function createEvent(array $data): Event;

    public function deleteEvent(Event $event): bool;

    public function updateEvent(array $data, Event $event): Event;
}
