<?php

namespace App\Helpers\DataValues;

class DataValueObject
{
    public string $id;

    public string $name;

    public function getId(): string
    {
        return $this->id;
    }

    public function setId(string $id): static
    {
        $this->id = $id;

        return $this;
    }


    public function getName(): string
    {
        return $this->id;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }
}
