import Grid from "@/src/components/grid";
import ProductItemsGrid from "@/src/components/layout/product-items-grid";
import { defaultSort, sorting } from "@/src/lib/constants";
import { getCollectionProducts, } from "@/src/lib/shopify";

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: { collection: string };
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
 
  const awaitSearchParams = await searchParams;
  const sort = awaitSearchParams?.sort as string | undefined;
  const { sortKey, reverse } =
    sorting.find((item) => item.slug === sort) || defaultSort;
  const products = await getCollectionProducts({
    collection: params.collection,
    sortKey,
    reverse,
  });

  console.log(products)

  return (
    <section>
      {products.length === 0 ? (
        <p>No product found in this collection</p>
      ) : (
        <Grid className="grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
          <ProductItemsGrid products={products} />
        </Grid>
      )}
    </section>
  );
}
