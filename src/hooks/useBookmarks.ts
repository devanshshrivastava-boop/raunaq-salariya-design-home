import { useEffect, useState, useCallback } from "react";

export type Bookmark = {
  slug: string;          // category slug
  itemId: string;
  title: string;
  image: string;
  price?: string;
  category: string;      // category name
  savedAt: number;
};

const KEY = "rsd:bookmarks:v1";

function read(): Bookmark[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(window.localStorage.getItem(KEY) ?? "[]");
  } catch {
    return [];
  }
}
function write(list: Bookmark[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(list));
  window.dispatchEvent(new CustomEvent("rsd:bookmarks"));
}

const id = (b: Pick<Bookmark, "slug" | "itemId">) => `${b.slug}::${b.itemId}`;

export function useBookmarks() {
  const [list, setList] = useState<Bookmark[]>(() => read());

  useEffect(() => {
    const sync = () => setList(read());
    window.addEventListener("rsd:bookmarks", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("rsd:bookmarks", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const toggle = useCallback((b: Bookmark) => {
    const cur = read();
    const k = id(b);
    const next = cur.find((x) => id(x) === k) ? cur.filter((x) => id(x) !== k) : [{ ...b, savedAt: Date.now() }, ...cur];
    write(next);
  }, []);

  const remove = useCallback((b: Pick<Bookmark, "slug" | "itemId">) => {
    write(read().filter((x) => id(x) !== id(b)));
  }, []);

  const has = useCallback((b: Pick<Bookmark, "slug" | "itemId">) => list.some((x) => id(x) === id(b)), [list]);

  return { list, toggle, has, remove, count: list.length };
}
