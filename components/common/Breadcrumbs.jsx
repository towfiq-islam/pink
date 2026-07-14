"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Breadcrumbs = ({ customLabels = {} }) => {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);
  const breadcrumbs = pathSegments.map((segment, index) => {
    const href = "/" + pathSegments.slice(0, index + 1).join("/");

    // Convert slug → readable text
    const label =
      customLabels[segment] ||
      segment.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase());

    return { label, href };
  });

  return (
    <div className="mb-3 md:mb-5 text-sm text-primary-gray flex flex-wrap items-center gap-1">
      <Link href="/" className="hover:underline">
        Home
      </Link>

      {breadcrumbs.map((item, index) => (
        <span key={item.href} className="flex items-center gap-1">
          <span>/</span>
          {index === breadcrumbs.length - 1 ? (
            <span className="text-gray-500">{item.label}</span>
          ) : (
            <Link href={item.href} className="hover:underline">
              {item.label}
            </Link>
          )}
        </span>
      ))}
    </div>
  );
};

export default Breadcrumbs;
