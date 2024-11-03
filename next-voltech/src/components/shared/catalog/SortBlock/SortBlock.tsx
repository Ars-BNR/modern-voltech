import React, { FC } from "react";
import classes from "./SortBlock.module.css";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { DualRangeSlider } from "@/components/ui/slider";

interface SortBlockProps {
  priceRange: number[];
  maxPrice: number;
  minPrice: number;
  handleCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  brand: string[];
  selectedBrands: string[];
  handleOnKeyDownChange: (
    event: React.KeyboardEvent,
    min: number | string,
    max: number | string
  ) => void;
  handlePriceInputChange: (min: number | string, max: number | string) => void;
  handleSliderPriceChange: (range: number[]) => void;
  fetchProducts: () => void;
}
const SortBlock: FC<SortBlockProps> = ({
  priceRange,
  maxPrice,
  minPrice,
  handleCheckboxChange,
  brand,
  selectedBrands,
  handleOnKeyDownChange,
  handlePriceInputChange,
  handleSliderPriceChange,
  fetchProducts,
}) => {
  // console.log("sortBlock");
  return (
    <div className={classes.sortBlock}>
      <p className={classes.sortBlock__title}>Сортировка</p>

      <Accordion type="multiple" defaultValue={["item-1", "item-2"]}>
        <AccordionItem value="item-1">
          <AccordionTrigger className={classes.accordion__title}>
            Цена
          </AccordionTrigger>
          <AccordionContent>
            <div className={classes.priceBlock}>
              <input
                type="text"
                name=""
                id=""
                className={classes.priceBlock__inp}
                placeholder="от"
                min={minPrice}
                value={priceRange[0]?.toLocaleString("ru-RU") || ""}
                onChange={(e) =>
                  handlePriceInputChange(e.target.value, priceRange[1])
                }
                onKeyDown={(e) =>
                  handleOnKeyDownChange(
                    e,
                    (e.target as HTMLInputElement).value,
                    priceRange[1]
                  )
                }
              />
              <input
                type="text"
                name=""
                id=""
                className={classes.priceBlock__inp}
                placeholder="до"
                max={maxPrice}
                value={
                  priceRange[priceRange.length - 1]?.toLocaleString("ru-RU") ||
                  ""
                }
                onChange={(e) =>
                  handlePriceInputChange(priceRange[0], e.target.value)
                }
                onKeyDown={(e) =>
                  handleOnKeyDownChange(
                    e,
                    priceRange[0],
                    (e.target as HTMLInputElement).value
                  )
                }
              />
            </div>
            <div className={classes.slider}>
              {priceRange.length > 0 && minPrice && maxPrice && (
                <DualRangeSlider
                  value={priceRange}
                  onChangeEnd={fetchProducts}
                  onValueChange={handleSliderPriceChange}
                  min={minPrice}
                  max={maxPrice}
                  step={1}
                />
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger className={classes.accordion__title}>
            Бренд
          </AccordionTrigger>
          <AccordionContent>
            {brand &&
              brand.map((el, index) => (
                <div className="equipment" key={index}>
                  <input
                    type="checkbox"
                    className="checkbox"
                    id={`brand-${index}`}
                    value={el}
                    onChange={handleCheckboxChange}
                    checked={selectedBrands.includes(el)}
                  />
                  <label className="label" htmlFor={`brand-${index}`}>
                    {el}
                  </label>
                </div>
              ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
export default SortBlock;
