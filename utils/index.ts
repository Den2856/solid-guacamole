import { CarProps, FilterProps } from "@types";

import Cars from '@/utils/index.json';

export const calculateCarRent = (city_mpg: number, year: number) => {
  const basePricePerDay = 50;
  const mileageFactor = 0.1;
  const ageFactor = 0.05;

  const mileageRate = city_mpg * mileageFactor;
  const ageRate = (new Date().getFullYear() - year) * ageFactor;

  const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;

  return rentalRatePerDay.toFixed(0);
};

export const updateSearchParams = (type: string, value: string) => {

  const searchParams = new URLSearchParams(window.location.search);

  searchParams.set(type, value);

  const newPathname = `${window.location.pathname}?${searchParams.toString()}`;

  return newPathname;
};

export const deleteSearchParams = (type: string) => {

  const newSearchParams = new URLSearchParams(window.location.search);

  newSearchParams.delete(type.toLocaleLowerCase());

  const newPathname = `${window.location.pathname}?${newSearchParams.toString()}`;

  return newPathname;
};


export function fetchCars(filters: FilterProps) {
  const { manufacturer, model, year, fuel, limit } = filters;

  let filteredCars = [...Cars];

  if (manufacturer) {
    filteredCars = filteredCars.filter(
      (car) => car.make.toLowerCase() === manufacturer.toLowerCase()
    );
  }

  if (model) {
    filteredCars = filteredCars.filter(
      (car) => car.model.toLowerCase() === model.toLowerCase()
    );
  }

  if (year) {
    filteredCars = filteredCars.filter((car) => car.year === year);
  }

  if (fuel) {
    filteredCars = filteredCars.filter(
      (car) => car.fuelType.toLowerCase() === fuel.toLowerCase()
    );
  }

  if (limit && limit > 0) {
    filteredCars = filteredCars.slice(0, limit);
  }

  return filteredCars;
}


export const generateCarImageUrl = (car: CarProps, angle?: string) => {
  const url = new URL("https://cdn.imagin.studio/getimage");
  const { make, model, year } = car;

  url.searchParams.append("customer", "hrjavascript-mastery");
  url.searchParams.append('make', make);
  url.searchParams.append('modelFamily', model.split(" ")[0]);
  url.searchParams.append('zoomType', 'fullscreen');
  url.searchParams.append('modelYear', `${year}`);
  // url.searchParams.append('zoomLevel', zoomLevel);
  url.searchParams.append('angle', `${angle}`);

  return `${url}`;
} 
