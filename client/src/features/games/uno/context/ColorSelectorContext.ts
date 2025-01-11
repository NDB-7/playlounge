import { createContext, Dispatch, SetStateAction } from "react";
import { CardFace, WildCardFace } from "../types";

type ColorSelectorContextType = {
  colorSelector: CardFace | WildCardFace | "";
  setColorSelector: Dispatch<SetStateAction<CardFace | WildCardFace | "">>;
};

const ColorSelectorContext = createContext<ColorSelectorContextType>({
  colorSelector: "",
  setColorSelector: () => {},
});

export default ColorSelectorContext;
