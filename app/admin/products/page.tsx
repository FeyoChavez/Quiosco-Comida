import ProductSearchForm from "@/app/components/products/ProductSearchForm";
import ProductsPagination from "@/app/components/products/ProductsPagination";
import ProductTable from "@/app/components/products/ProductsTable";
import Heading from "@/app/components/ui/Heading";
import { PrismaClient } from '@prisma/client'
import Link from "next/link";
import {redirect} from 'next/navigation'

const prisma = new PrismaClient()

async function productCount() {
  return await prisma.product.count()
}

async function getProducts(page : number, pageSize : number) {
  const skip = (page - 1) * pageSize
  const products = await prisma.product.findMany({
    take: pageSize, 
    skip, 
    include: {
      category: true
    }
  })

  return products
}

// Define un type con la informacion de la categoria
export type ProductsWithCategory = Awaited<ReturnType<typeof getProducts>>

export default async function ProductsPage({searchParams,}: { searchParams: Promise<{ page?: string }> }) {
  
  const resolvedParams = await searchParams;
  const page = Number(resolvedParams?.page) || 1;
  const pageSize = 10

  if(page < 1) {redirect('/admin/products')}

  const productsData = getProducts(page, pageSize)
  const totalProductsData = productCount()
  const [products, totalProducts] = await Promise.all([productsData, totalProductsData])
  const totalPages = Math.ceil(totalProducts / pageSize)

  // si se pasa un numero de paginas mayor redirige a la pag principal
  if(page > totalPages) {redirect('/admin/products')}

  return (
    <>
      <Heading> Administrar Productos </Heading>

      <div className="flex flex-col gap-5 lg:flex-row lg:justify-between">
        <Link 
          href={'/admin/products/new'}
          className="bg-amber-400 w-full lg:w-auto text-xl px-10 py-3 text-center
          font-bold cursor-pointer hover:bg-amber-300">
          Crear Producto
        </Link>

        <ProductSearchForm />
      </div>

      <ProductTable 
      products={products}
      />

      <ProductsPagination 
        page={page}
        totalPages={totalPages}
      />
    </>
  )
}
