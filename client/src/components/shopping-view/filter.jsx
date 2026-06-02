import React from "react";
import { filterOptions } from "../../config";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";

const ProductFilter = ({ filter, handleFilter }) => {
  return (
    <div className="bg-background rounded-lg shadow-sm">
      <div className="p-4 border-b">
        <h2 className="font-semibold text-lg">Filters</h2>
      </div>
      <div className="p-4 space-y-4">
        {Object.keys(filterOptions).map((keyItem) => (
          <React.Fragment key={keyItem}>
            <div>
              <h3 className="text-base font-bold">{keyItem}</h3>
              <div className="grid gap-2 mt-2">
                {filterOptions[keyItem].map((option) => (
                  <Label
                    key={option.id}
                    htmlFor={`filter-${keyItem}-${option.id}`}
                    className="flex items-center gap-2 text-sm font-medium"
                  >
                    <Checkbox
                      checked={
                        filter &&
                        Object.keys(filter).length > 0 &&
                        filter[keyItem] &&
                        filter[keyItem].indexOf(option.id) > -1
                      }
                      onCheckedChange={() => handleFilter(keyItem, option.id)}
                      id={`filter-${keyItem}-${option.id}`}
                      className="mr-2 h-4 w-4 rounded border border-slate-400/80 bg-background text-primary transition-colors focus-visible:ring-2 focus-visible:ring-primary/50"
                    />
                    {option.label}
                  </Label>
                ))}
              </div>
            </div>
            <div>
              <Separator className="my-4" />
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ProductFilter;
