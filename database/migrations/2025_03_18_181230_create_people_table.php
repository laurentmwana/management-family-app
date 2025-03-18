<?php

use App\Enums\GenderEnum;
use App\Enums\RelationFamilyEnum;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('people', function (Blueprint $table) {
            $table->id();
            $table->string('image');
            $table->string('full_name');
            $table->enum('gender', array_map(
                fn(GenderEnum $enum) => $enum->value,
                GenderEnum::cases()
            ));
            $table->date('birth');
            $table->text('bio')->nullable();
            $table->enum('relation_family', array_map(
                fn(RelationFamilyEnum $enum) => $enum->value,
                RelationFamilyEnum::cases()
            ));
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('people');
    }
};
