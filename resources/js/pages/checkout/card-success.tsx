import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';
import { useEffect, useState } from 'react';

export const PaymentConfirmation = () => {
    const [fireworks, setFireworks] = useState<{ x: number; y: number; color: string }[]>([]);

    useEffect(() => {
        // Create new fireworks every 700ms
        const interval = setInterval(() => {
            const newFirework = {
                x: Math.random() * 100,
                y: Math.random() * 100,
                color: `hsl(${Math.random() * 360}, 100%, 50%)`,
            };

            setFireworks((prev) => [...prev.slice(-15), newFirework]);
        }, 700);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative flex min-h-[400px] w-full items-center justify-center p-4">
            {/* Fireworks */}
            {fireworks.map((firework, i) => (
                <div
                    key={i}
                    className="animate-firework absolute"
                    style={{
                        left: `${firework.x}%`,
                        top: `${firework.y}%`,
                    }}
                >
                    {[...Array(10)].map((_, j) => (
                        <div
                            key={j}
                            className="animate-particle absolute h-2 w-2 rounded-full"
                            style={{
                                backgroundColor: firework.color,
                                transform: `rotate(${j * 36}deg) translateY(-20px)`,
                                opacity: 0,
                            }}
                        />
                    ))}
                </div>
            ))}

            {/* Confirmation Card */}
            <Card className="z-10 w-full max-w-md bg-white/90 shadow-lg backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center gap-2 pb-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                        <Check className="h-6 w-6 text-green-600" />
                    </div>
                    <CardTitle className="text-xl text-green-700">Paiement Confirmé</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-gray-700">
                        Votre paiement pour acheter les travaux pratiques a été effectué. Nous vous avons envoyé un lien de téléchargement dans votre
                        boîte email.
                    </p>
                </CardContent>
            </Card>
        </div>
    );
};
