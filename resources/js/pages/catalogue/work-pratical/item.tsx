import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { truncate } from '@/lib/utils';
import { Moment } from '@/shared/moment';
import type { WorkPratical } from '@/types';
import { BookOpen, CalendarIcon, Clock, DollarSign, Eye, FileText } from 'lucide-react';
import { CardAction } from './card-action';

type WorkPraticalItemProps = {
    workPratical: WorkPratical;
};

export const WorkPraticalItem = ({ workPratical }: WorkPraticalItemProps) => {
    return (
        <Card className="group from-background to-background/80 relative w-full max-w-md overflow-hidden transition-all duration-300 hover:shadow-lg">
            {/* Price Badge - Positioned for visual impact */}
            <div className="absolute top-6 -right-8 z-10 rotate-45">
                <Badge variant="default" className="bg-primary text-primary-foreground px-8 py-1 font-bold shadow-sm">
                    PDF
                </Badge>
            </div>

            <CardHeader className="pt-6 pb-2">
                <div className="flex flex-col">
                    <CardTitle className="text-2xl font-bold tracking-tight">{truncate(workPratical.title, 50, '...')}</CardTitle>
                    <CardDescription className="mt-2 leading-relaxed">{truncate(workPratical.description, 100, '...')}</CardDescription>
                </div>
            </CardHeader>

            <CardContent className="space-y-6 pb-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-muted/30 hover:bg-muted/50 flex items-center gap-3 rounded-lg p-3 transition-colors">
                        <div className="bg-primary/10 rounded-full p-2">
                            <BookOpen className="text-primary h-4 w-4" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-muted-foreground text-xs">Cours</span>
                            <span className="text-sm font-medium">{workPratical.course.name}</span>
                        </div>
                    </div>

                    <div className="bg-muted/30 hover:bg-muted/50 flex items-center gap-3 rounded-lg p-3 transition-colors">
                        <div className="bg-primary/10 rounded-full p-2">
                            <CalendarIcon className="text-primary h-4 w-4" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-muted-foreground text-xs">Année</span>
                            <span className="text-sm font-medium">{workPratical.year_academic.name}</span>
                        </div>
                    </div>

                    <div className="bg-muted/30 hover:bg-muted/50 flex items-center gap-3 rounded-lg p-3 transition-colors">
                        <div className="bg-primary/10 rounded-full p-2">
                            <DollarSign className="text-primary h-4 w-4" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-muted-foreground text-xs">Montant</span>
                            <span className="truncate text-sm font-medium" title={`${workPratical.price}$`}>
                                {workPratical.price} $
                            </span>
                        </div>
                    </div>

                    <div className="bg-muted/30 hover:bg-muted/50 flex items-center gap-3 rounded-lg p-3 transition-colors">
                        <div className="bg-primary/10 rounded-full p-2">
                            <Clock className="text-primary h-4 w-4" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-muted-foreground text-xs">Créé le</span>
                            <span className="text-sm font-medium">
                                <Moment date={workPratical.created_at} />
                            </span>
                        </div>
                    </div>
                </div>
            </CardContent>

            <CardFooter className="bg-muted/10 flex items-center justify-between border-t pt-4 pb-4">
                <Button variant="outline" size="sm" className="hover:bg-primary/10 hover:text-primary gap-2 transition-all duration-300">
                    <Eye size={16} />
                    <span>Aperçu</span>
                </Button>

                <div className="flex items-center gap-2">
                    <CardAction workPratical={workPratical} />
                </div>
            </CardFooter>
        </Card>
    );
};
