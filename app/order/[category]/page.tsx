import { PrismaClient } from '@prisma/client'
import ProductCard from '@/app/components/products/ProductCard';
import Heading from '@/app/components/ui/Heading';

const prisma = new PrismaClient()

async function getProducts(category: string) {
  const products = await prisma.product.findMany({
    where: {
      category: {
        slug: category
      }
    }
  })
  return products
}

export default async function OrderPage(props: { params: Promise<{ category: string }> }) {
  const { category } = await props.params
  const products = await getProducts(category)
  console.log(products)

  return (
    <>
      <Heading>
        Elige y personaliza tu pedido a continuación
      </Heading>

      <div className='grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4 items-start'>
        {products.map(product => (
          <ProductCard  
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </>
  )
}
