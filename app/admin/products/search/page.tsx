import ProductSearchForm from "@/app/components/products/ProductSearchForm";
import ProductTable from "@/app/components/products/ProductsTable";
import Heading from "@/app/components/ui/Heading";
import { PrismaClient } from "@prisma/client";
import Link from "next/link";

const prisma = new PrismaClient();

async function SearchProducts(searchTerm: string) {
  const products = await prisma.product.findMany({
    where: {
      name: {
        contains: searchTerm,
        mode: "insensitive",
      },
    },
    include: {
      category: true,
    },
  });

  return products;
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>;
}) {
  const resolvedParams = await searchParams;
  const search = resolvedParams?.search || "";

  const products = await SearchProducts(search);

  return (
    <>
      <Heading>Resultados de Búsqueda: {search}</Heading>

      <div className="flex flex-col gap-5 lg:flex-row lg:justify-end">
        <ProductSearchForm />
      </div>

      {products.length ? (
        <ProductTable products={products} />
      ) : (
        <p className="text-center text-lg">No hay resultados</p>
      )}
    </>
  );
}
