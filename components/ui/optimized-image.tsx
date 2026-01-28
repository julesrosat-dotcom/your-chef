import Image from 'next/image';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
  fill?: boolean;
  sizes?: string;
  quality?: number;
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  priority = false,
  className,
  fill = false,
  sizes,
  quality = 85,
}: OptimizedImageProps) {
  const fallbackSrc = '/images/placeholder.jpg';

  const defaultSizes =
    sizes || (fill ? '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw' : undefined);

  return (
    <Image
      src={src || fallbackSrc}
      alt={alt}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      fill={fill}
      priority={priority}
      className={className}
      sizes={defaultSizes}
      loading={priority ? 'eager' : 'lazy'}
      quality={quality}
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAUH/8QAIhAAAQMEAQUAAAAAAAAAAAAAAQACAwQFESEGEhMiMUH/xAAVAQEBAAAAAAAAAAAAAAAAAAADBP/EABgRAAMBAQAAAAAAAAAAAAAAAAABAhEh/9oADAMBAAIRAxEAPwDb+F3K4V9NVPq6h0jY5w1gc0aNyBvJ+/SIi1F8J//Z"
    />
  );
}

interface ChefAvatarProps {
  src: string;
  name: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  priority?: boolean;
}

export function ChefAvatar({ src, name, size = 'md', priority = false }: ChefAvatarProps) {
  const sizeMap = {
    sm: 40,
    md: 80,
    lg: 120,
    xl: 200,
  };

  const dimension = sizeMap[size];

  return (
    <OptimizedImage
      src={src}
      alt={`Photo de ${name}`}
      width={dimension}
      height={dimension}
      priority={priority}
      className="rounded-full object-cover"
      quality={90}
    />
  );
}

interface HeroImageProps {
  src: string;
  alt: string;
  priority?: boolean;
}

export function HeroImage({ src, alt, priority = true }: HeroImageProps) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      fill
      priority={priority}
      className="object-cover"
      sizes="100vw"
      quality={90}
    />
  );
}

interface CardImageProps {
  src: string;
  alt: string;
  aspectRatio?: '16/9' | '4/3' | '1/1';
}

export function CardImage({ src, alt, aspectRatio = '16/9' }: CardImageProps) {
  const aspectRatioMap = {
    '16/9': 'aspect-video',
    '4/3': 'aspect-[4/3]',
    '1/1': 'aspect-square',
  };

  return (
    <div className={`relative w-full ${aspectRatioMap[aspectRatio]} overflow-hidden`}>
      <OptimizedImage
        src={src}
        alt={alt}
        fill
        className="object-cover transition-transform hover:scale-105"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  );
}
