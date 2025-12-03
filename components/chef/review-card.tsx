import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, ThumbsUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ReviewCardProps {
  review: {
    id: string;
    clientName: string;
    clientImage: string;
    rating: number;
    comment: string;
    date: string;
    photos: string[];
    helpfulCount: number;
  };
}

export function ReviewCard({ review }: ReviewCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 30) return `Il y a ${diffDays} jours`;
    if (diffDays < 365) return `Il y a ${Math.floor(diffDays / 30)} mois`;
    return `Il y a ${Math.floor(diffDays / 365)} ans`;
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex gap-4">
          <Avatar>
            <AvatarImage src={review.clientImage} />
            <AvatarFallback>{review.clientName[0]}</AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <div>
                <div className="font-semibold">{review.clientName}</div>
                <div className="text-sm text-slate-600">{formatDate(review.date)}</div>
              </div>

              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < review.rating
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-slate-300'
                    }`}
                  />
                ))}
              </div>
            </div>

            <p className="text-slate-700 leading-relaxed mb-4">{review.comment}</p>

            {review.photos.length > 0 && (
              <div className="flex gap-2 mb-4">
                {review.photos.map((photo, index) => (
                  <img
                    key={index}
                    src={photo}
                    alt="Review"
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                ))}
              </div>
            )}

            <Button variant="ghost" size="sm" className="text-slate-600">
              <ThumbsUp className="h-4 w-4 mr-2" />
              Utile ({review.helpfulCount})
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
