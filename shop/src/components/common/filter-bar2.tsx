import { Fragment, useEffect, useState } from 'react'
import { Dialog, Disclosure, Menu, Popover, Tab, Transition } from '@headlessui/react'
import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";

import classNames from 'classnames'
import { FilterIcon } from '@components/icons/filter-icon'
import { useRouter } from 'next/router';
import { useCategoriesQuery } from '@data/category/use-categories.query';


const filters = {
  price: [
    { value: '0', label: '0€ - $25', range: ['0', '25'] },
    { value: '25', label: '25€ - 50€', range: ['25', '50'] },
    { value: '50', label: '50€ - 75€', range: ['50', '75'] },
    { value: '75', label: '75€+', range: ['75', '1000'] },
  ],
  color: [
    { value: 'white', label: 'White', checked: false },
    { value: 'beige', label: 'Beige', checked: false },
    { value: 'blue', label: 'Blue', checked: true },
    { value: 'brown', label: 'Brown', checked: false },
    { value: 'green', label: 'Green', checked: false },
    { value: 'purple', label: 'Purple', checked: false },
  ],
  size: [
    { value: 'xs', label: 'XS', checked: false },
    { value: 's', label: 'S', checked: true },
    { value: 'm', label: 'M', checked: false },
    { value: 'l', label: 'L', checked: false },
    { value: 'xl', label: 'XL', checked: false },
    { value: '2xl', label: '2XL', checked: false },
  ],
  category: [
    { value: 'all-new-arrivals', label: 'All New Arrivals', checked: false },
    { value: 'tees', label: 'Tees', checked: false },
    { value: 'objects', label: 'Objects', checked: false },
    { value: 'sweatshirts', label: 'Sweatshirts', checked: false },
    { value: 'pants-and-shorts', label: 'Pants & Shorts', checked: false },
  ],
}
const sortOptions = [
  { name: 'Meilleure note', orderBy: 'note_admin', sortedBy: 'DESC' },
  { name: 'Le plus récent', orderBy: 'created_at', sortedBy: 'DESC' },
  { name: 'Prix ​croissant', orderBy: 'price', sortedBy: 'ASC' },
  { name: 'Prix ​decroissant', orderBy: 'price', sortedBy: 'DESC' },
]
const products = [
  {
    id: 1,
    name: 'Organize Basic Set (Walnut)',
    price: '$149',
    rating: 5,
    reviewCount: 38,
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-05-image-card-01.jpg',
    imageAlt: 'TODO',
    href: '#',
  },
  {
    id: 2,
    name: 'Organize Pen Holder',
    price: '$15',
    rating: 5,
    reviewCount: 18,
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-05-image-card-02.jpg',
    imageAlt: 'TODO',
    href: '#',
  },
  {
    id: 3,
    name: 'Organize Sticky Note Holder',
    price: '$15',
    rating: 5,
    reviewCount: 14,
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-05-image-card-03.jpg',
    imageAlt: 'TODO',
    href: '#',
  },
  {
    id: 4,
    name: 'Organize Phone Holder',
    price: '$15',
    rating: 4,
    reviewCount: 21,
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-05-image-card-04.jpg',
    imageAlt: 'TODO',
    href: '#',
  },
  // More products...
]
const footerNavigation = {
  account: [
    { name: 'Manage Account', href: '#' },
    { name: 'Saved Items', href: '#' },
    { name: 'Orders', href: '#' },
    { name: 'Redeem Gift card', href: '#' },
  ],
  service: [
    { name: 'Shipping & Returns', href: '#' },
    { name: 'Warranty', href: '#' },
    { name: 'FAQ', href: '#' },
    { name: 'Find a store', href: '#' },
    { name: 'Get in touch', href: '#' },
  ],
  company: [
    { name: 'Who we are', href: '#' },
    { name: 'Press', href: '#' },
    { name: 'Careers', href: '#' },
    { name: 'Terms & Conditions', href: '#' },
    { name: 'Privacy', href: '#' },
  ],
  connect: [
    { name: 'Instagram', href: '#' },
    { name: 'Pinterest', href: '#' },
    { name: 'Twitter', href: '#' },
  ],
}
export default function FilterBar2() {
  const [princeRange, setPrinceRange] = useState(-1);
  const router = useRouter();
  const { pathname, query } = router;
  const {
    data,
    isLoading: loading,
    error,
  } = useCategoriesQuery({
    type: router.pathname === "/grocery-two" ? "grocery" : "furniture",
  });
  const onCategoryClick = (slug: string) => {
    if (selectedQueries === slug) {
      const { category, ...rest } = query;
      router.push(
        {
          pathname,
          query: { ...rest },
        },
        {
          pathname,
          query: { ...rest },
        },
        {
          scroll: false,
        }
      );
      return;
    }
    router.push(
      {
        pathname,
        query: { ...query, category: slug },
      },
      {
        pathname,
        query: { ...query, category: slug },
      },
      {
        scroll: false,
      }
    );
  };
  const handlePriceChange = (idx: number) => {
    setPrinceRange(idx);
    router.push(
      {
        pathname,
        query: { ...query, price: filters.price[idx].range.join(",") },
      },
      {
        pathname,
        query: { ...query, price: filters.price[idx].range.join(",") },
      },
      {
        scroll: true,
      });
    
  }
  const selectedQueries = query.category;
  return (
    <Disclosure
      as="section"
      aria-labelledby="filter-heading"
      className="relative z-10 border-t border-b border-gray-200 bg-white grid items-center mx-2"
    >
      <h2 id="filter-heading" className="sr-only">
        Filters
      </h2>
      <div className="relative col-start-1 row-start-1 py-4">
        <div className=" mx-auto flex space-x-6 divide-x divide-gray-200 text-sm px-4">
          <div>
            <Disclosure.Button className="group text-gray-700 font-medium flex items-center">
              <FilterIcon
                className="flex-none w-5 h-5 mr-2 text-gray-400 group-hover:text-gray-500"
                aria-hidden="true"
              />
              Filtre
            </Disclosure.Button>
          </div>
          <div className="pl-6">
            <button type="button" className="text-gray-500"
              onClick={() => {
                setPrinceRange(-1);
                router.push(
                  {
                    pathname,
                    query: {},
                  },
                  {
                    pathname,
                    query: {},
                  },
                  {
                    scroll: false,
                  });
              }}
            >
              Supprimer
            </button>
          </div>
        </div>
      </div>
      <Disclosure.Panel className="border-t border-gray-200 py-10">
        <div className="max-w-7xl mx-auto  px-4 text-sm sm:px-6 md:gap-x-6 lg:px-8">
          <div className="grid w-full grid-cols-1 gap-y-5  md:grid-cols-3 md:gap-x-6">
            <fieldset className="">
              <legend className="block font-medium">Prix</legend>
              <div className="pt-6 space-y-6 sm:pt-4 sm:space-y-4">
                {filters.price.map((option, optionIdx) => (
                  <div key={option.value} className="flex items-center text-base sm:text-sm">
                    <input
                      id={`price-${optionIdx}`}
                      name="price[]"
                      onChange={() => handlePriceChange(optionIdx)}
                      type="checkbox"
                      className="flex-shrink-0 h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                      checked={princeRange == optionIdx}
                    />
                    <label htmlFor={`price-${optionIdx}`} className="ml-3 min-w-0 flex-1 text-gray-600">
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            </fieldset>
            <fieldset  className="">
              <legend className="block font-medium">Categories</legend>
              <div className="space-y-6 sm:pt-4 grid grid-cols-2 sm:space-y-4">
                {data?.categories?.data.map((category, index) => (
                  <div key={category.id} className="flex items-center text-base sm:text-sm">
                    <input
                      id={`category-${index}`}
                      name="category"
                      type="checkbox"
                      className="flex-shrink-0 h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                      onClick={() => onCategoryClick(category?.slug!)}
                      checked={ selectedQueries === category.slug}
                    />
                    <label htmlFor={`color-${index}`} className="ml-3 min-w-0 flex-1 text-gray-600">
                      {category.name}
                    </label>
                  </div>
                ))}
              </div>
            </fieldset>
          </div>
      
        </div>
      </Disclosure.Panel>
      <div className="col-start-1 row-start-1 py-4">
        <div className="flex justify-end  mx-auto px-4 sm:px-6 lg:px-8">
          <Menu as="div" className="relative inline-block">
            <div className="flex">
              <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                Trier
              </Menu.Button>
            </div>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-2xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  {sortOptions.map((option) => (
                    <Menu.Item key={option.name}>
                      {({ active }) => (
                        <a
                          onClick={() => {
                            router.push(
                              {
                                pathname,
                                query: { ...query, orderBy: option.orderBy, sortedBy: option.sortedBy },
                              },
                              {
                                pathname,
                                query: { ...query, orderBy: option.orderBy, sortedBy: option.sortedBy },
                              },
                              {
                                scroll: false,
                              });
                          }}
                          className={classNames(
                            option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                            active ? 'bg-gray-100' : '',
                            'block px-4 py-2 text-sm cursor-pointer'
                          )}
                        >
                          {option.name}
                        </a>
                      )}
                    </Menu.Item>
                  ))}
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
    </Disclosure>
  );

}