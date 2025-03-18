<?php

namespace App\Enums;

enum RelationFamilyEnum: string
{
    case PARENT = "Parent";
    case CHILD = "Enfant";
    case COUSIN = "cousin";
    case UNCLE = "Oncle";
    case AUNT = "aunt";
}
