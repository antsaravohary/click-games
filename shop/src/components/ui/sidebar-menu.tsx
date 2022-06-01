import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";
import cn from "classnames";
import { ExpandLessIcon } from "@components/icons/expand-less-icon";
import { ExpandMoreIcon } from "@components/icons/expand-more-icon";
import { getIcon } from "@utils/get-icon";
import * as CategoryIcons from "@components/icons/category";
import { useUI } from "@contexts/ui.context";
import { useEffect, useState } from "react";
import Image from "next/image";

function SidebarMenuItem({ className, item, depth = 0 }: any) {
  const router = useRouter();
  const active = router?.query?.category;
  const isActive =
    active === item.slug ||
    item?.children?.some((_item: any) => _item.slug === active);
  const [isOpen, setOpen] = useState<boolean>(isActive);
  useEffect(() => {
    setOpen(isActive);
  }, [isActive]);
  const { slug, name, children: items, icon } = item;
  const { displaySidebar, closeSidebar } = useUI();

  function toggleCollapse() {
    setOpen((prevValue) => !prevValue);
  }

  function onClick() {
    const { pathname, query } = router;
    const navigate = () =>
      router.push(
        {
          pathname,
          query: { ...query, category: slug },
        },
        undefined,
        {
          scroll: false,
        }
      );
    if (Array.isArray(items) && !!items.length) {
      toggleCollapse();
      navigate();
    } else {
      navigate();
      displaySidebar && closeSidebar();
    }
  }

  let expandIcon;
  if (Array.isArray(items) && items.length) {
    expandIcon = !isOpen ? (
      <ExpandLessIcon className="w-3 h-3" />
    ) : (
      <ExpandMoreIcon className="w-3 h-3" />
    );
  }

  return (
    <>
      <motion.div
        initial={false}
        animate={{ backgroundColor: "#ffffff" }}
        onClick={onClick}
        className={cn("text-center rounded h-30 w-full py-2 bg-light  flex flex-col items-center justify-start relative  cursor-pointer border-2 hover:border-accent-hover",
          isOpen ? "border-accent" : ""
        )}
      >

        -<div className="w-full flex items-center flex-col justify-center">
          <span className=" h-10 w-10">
            <Image
              src={item?.image?.thumbnail ?? "http://api.click-univers.local/1258.jpg"}
              alt={item?.slug}
            
              priority={true}
             height={250}
             width={250}
            />
          </span>
          <div className="text-xs z-99 block  font-semibold  text-center px-1 block">{name}</div>
        </div>
     



      </motion.div>

    </>
  );
}

function SidebarMenu2({ items, className }: any) {
  return (
    <div className={cn("text-xs grid grid-cols-2 gap-4", className)}>
      {items?.map((item: any) => (
        <SidebarMenuItem key={`${item.name}${item.slug}`} item={item} />
      ))}
    </div>
  );
}

export default SidebarMenu2;
