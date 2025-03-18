'use client';

import { Card, CardContent } from '@/components/ui/card';
import React, { useEffect, useState } from 'react';

type TimeUnit = 'days' | 'hours' | 'minutes' | 'seconds';

const timeunits: Record<TimeUnit, string> = {
    days: 'jour',
    hours: 'heure',
    minutes: 'minute',
    seconds: 'seconde',
};

const getTimeUnit = (timeunit: TimeUnit, value: number) => {
    if (value < 10) {
        return timeunits[timeunit];
    }
    const t = timeunits[timeunit];

    return t.padEnd(t.length + 1, 's');
};

interface AnimatedNumberProps {
    value: number;
    unit: TimeUnit;
}

const AnimatedNumber: React.FC<AnimatedNumberProps> = ({ value, unit }) => {
    return (
        <Card className="text-muted-foreground shadow-sm">
            <CardContent className="flex flex-col items-center justify-center p-4">
                <span key={value} className="mb-2 text-4xl font-bold">
                    {value.toString().padStart(2, '0')}
                </span>
                <span className="text-[11px] uppercase">{getTimeUnit(unit, value)}</span>
            </CardContent>
        </Card>
    );
};

interface CountdownProps {
    targetDate: Date;
    onComplete?: () => void;
}

export const Countdown: React.FC<CountdownProps> = ({ targetDate, onComplete }) => {
    const [timeLeft, setTimeLeft] = useState<Record<TimeUnit, number>>({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();
            const difference = Math.floor((targetDate.getTime() - now.getTime()) / 1000);

            if (difference <= 0) {
                clearInterval(timer);
                onComplete?.();
                return;
            }

            const days = Math.floor(difference / (3600 * 24));
            const hours = Math.floor((difference % (3600 * 24)) / 3600);
            const minutes = Math.floor((difference % 3600) / 60);
            const seconds = Math.floor(difference % 60);

            setTimeLeft({ days, hours, minutes, seconds });
        }, 1000);

        return () => clearInterval(timer);
    }, [targetDate, onComplete]);

    return (
        <div className="flex flex-col items-center">
            <h2 className="mb-4 text-xl font-bold">Compte à rebours pour l'événement</h2>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                <AnimatedNumber value={timeLeft.days} unit="days" />
                <AnimatedNumber value={timeLeft.hours} unit="hours" />
                <AnimatedNumber value={timeLeft.minutes} unit="minutes" />
                <AnimatedNumber value={timeLeft.seconds} unit="seconds" />
            </div>
            <p className="mt-4 text-center">L'événement commencera le </p>
        </div>
    );
};
