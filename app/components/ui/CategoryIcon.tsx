"use client"
import { Category } from "@prisma/client"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"

type CategoryIconProps ={
    category : Category
}

export default function CategoryIcon({category} : CategoryIconProps) {

  const params = useParams<{category: string}>()

  return (

    <div className={`${category.slug === params.category ? 'bg-amber-400' : ''}  
    flex items-center gap-4 w-full border-t border-gray-500 p-3 
    last-of-type:border-b`}
    >

        <div className="relative w-16 h-16">
            <Image 
                src={`/icon_${category.slug}.svg`}
                alt={`Imagen de la Categoria: ${category.name}`}
                fill
            
            />
        </div>

        <Link className="text-lg font-bold"
        href={`/order/${category.slug}`}
        >
          {category.name}
        </Link>

    </div>
  )
}
