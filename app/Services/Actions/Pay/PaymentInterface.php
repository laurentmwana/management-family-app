<?php

namespace App\Services\Actions\Pay;

use App\Enums\PaymentStateEnum;
use App\Models\Payment;

interface PaymentInterface
{
    public function createPayment(array $data): Payment;

    public function updatePayment(array $data, Payment $payment): Payment;

    public function changeStatus(Payment $payment, string $status = PaymentStateEnum::SUCCESS->value): Payment;
}
