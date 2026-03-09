import Image from 'next/image'

interface AvatarProps {
  src: string
  alt: string
  size?: 'sm' | 'md' | 'lg'
  borderColor?: string
}

const sizeMap = {
  sm: 'h-8 w-8',
  md: 'h-10 w-10',
  lg: 'h-14 w-14',
}

const imageSizeMap = {
  sm: 32,
  md: 40,
  lg: 56,
}

export function Avatar({ src, alt, size = 'md', borderColor }: AvatarProps) {
  return (
    <div
      className={`${sizeMap[size]} relative shrink-0 overflow-hidden rounded-full border-2`}
      style={{ borderColor: borderColor ?? '#32323f' }}
    >
      <Image
        src={src}
        alt={alt}
        width={imageSizeMap[size]}
        height={imageSizeMap[size]}
        className="h-full w-full object-cover"
      />
    </div>
  )
}
