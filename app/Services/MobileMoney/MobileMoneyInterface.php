<?php

namespace App\Services\MobileMoney;

use App\Models\Payment;

interface MobileMoneyInterface
{
    public function paid(Payment $payment): bool;
}
