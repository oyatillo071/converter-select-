import React, { useState } from "react";
import data from "../data.json";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast, Toaster } from "sonner";
import { CurrencyIcon } from "lucide-react";

function Converter() {
  const [selectedCurrencyCode, setSelectedCurrencyCode] = useState(
    data[0].Code
  );
  const [amount, setAmount] = useState(0);
  const [convertedAmount, setConvertedAmount] = useState(0);

  function handleConverter() {
    if (!amount || amount <= 0) {
      toast.error("Iltimos, miqdorni kiriting!");
      return;
    }

    if (!selectedCurrencyCode) {
      toast.error("Iltimos, valyutani tanlang!");
      return;
    }

    const selectedCurrency = data.find(
      (currency) => currency.Code === selectedCurrencyCode
    );

    const result = amount * selectedCurrency.Rate;
    setConvertedAmount(result);

    toast.success("Konvertatsiya muvaffaqiyatli amalga oshirildi!");
  }

  return (
    <div className="flex flex-col p-4 border-2 border-gray-200 max-w-[700px] rounded-lg mx-auto gap-4 items-center mt-10">
      <Toaster position="top-center" />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleConverter();
        }}
        className="flex flex-col gap-4 w-full"
      >
        <Label htmlFor="number">Miqdor</Label>
        <Input
          type="number"
          id="number"
          min={0}
          placeholder="Miqdr kiriting..."
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />
        <Select
          onValueChange={(value) => {
            setSelectedCurrencyCode(value);
          }}
        >
          <SelectTrigger className="w-full px-4 py-2 h-10 flex items-center gap-2">
            <SelectValue placeholder="Valyutani tanlang" />
          </SelectTrigger>
          <SelectContent className="w-full r">
            <SelectGroup className="w-full">
              {data.length > 0 &&
                data.map((currency, index) => {
                  if (!currency.Code) return null;
                  return (
                    <SelectItem
                      key={index + currency.Code}
                      value={currency.Code}
                    >
                      <div className="flex gap-4 items-center">
                        <img
                          width={20}
                          height={20}
                          src={currency.Flag}
                          alt="flag"
                        />
                        <b>{currency.Code}</b> - {currency.Currency}
                      </div>
                    </SelectItem>
                  );
                })}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Button type="submit">Konvertatsiya qilish</Button>
      </form>

      <div className="p-4 font-bold text-lg rounded-md w-full flex justify-center mx-auto mt-4">
        <h2>{convertedAmount.toFixed(2)}</h2>
      </div>
    </div>
  );
}

export default Converter;
