import { NextRequest, NextResponse } from "next/server";
import { menuItems, MenuItem } from "@/lib/menu-data";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const popular = searchParams.get("popular");
  const search = searchParams.get("search");

  console.log("get the user menu")

  let filtered: MenuItem[] = [...menuItems];

  if (category && category !== "all") {
    filtered = filtered.filter((item) => item.category === category);
  }

  if (popular === "true") {
    filtered = filtered.filter((item) => item.popular === true);
  }

  if (search) {
    const query = search.toLowerCase();
    filtered = filtered.filter(
      (item) =>
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query)
    );
  }

  const categories = [...new Set(menuItems.map((item) => item.category))];

  return NextResponse.json({
    items: filtered,
    total: filtered.length,
    categories,
    meta: {
      allItems: menuItems.length,
      filteredBy: { category, popular, search },
    },
  });
}