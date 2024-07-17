import React, { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { Cross1Icon } from "@radix-ui/react-icons";
import { FormState } from "@/app/store/model";
import {
  AppDispatch,
  formActions,
  useAppSelector,
  utilityActions
} from "@/app";

interface Props {
  title: string;
  namaForm: keyof FormState;
  size?: "small" | "medium" | "large";
  children: React.ReactNode;
}

const ModalGlobal = (props: Props) => {
  const { title, children, size, namaForm } = props;

  const utility = useAppSelector((state) => state.utility);
  const dispatch = useDispatch<AppDispatch>();
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (utility.getModal.isModalShow) {
      setIsVisible(true);
      setIsAnimating(true);
    } else {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setIsAnimating(false);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [utility.getModal.isModalShow]);

  if (!isVisible && !isAnimating) return null;

  let modalSizeClass = "";
  switch (size) {
    case "small":
      modalSizeClass = "lg:w-[30%]";
      break;
    case "medium":
      modalSizeClass = "lg:w-[50%]";
      break;
    case "large":
      modalSizeClass = "lg:w-[70%]";
      break;
    default:
      modalSizeClass = "lg:w-[50%]"; // Default to medium size
      break;
  }

  return (
    <div
      className={`fixed inset-0 z-50  flex items-center justify-center transition-opacity ${
        utility.getModal.isModalShow
          ? "bg-black/50 opacity-100"
          : "bg-black/20 opacity-0"
      }`}
    >
      <div
        className={`fixed shadow-lg p-4 top-[10%] bg-white rounded w-[90%] ${modalSizeClass}  flex-col gap-5 transform transition-transform ${
          utility.getModal.isModalShow
            ? "animate-slideInDown"
            : "animate-slideOutUp"
        }`}
      >
        <div className="flex justify-between">
          <h2 className="text-lg font-semibold leading-none tracking-tight">
            {title}
          </h2>
          <div
            className="cursor-pointer"
            onClick={() => {
              dispatch(utilityActions.hideModal());
              dispatch(
                formActions.resetForm(namaForm || utility.getModal.namaForm)
              );
            }}
          >
            <Cross1Icon />
          </div>
        </div>
        <div className="relative my-2 mt-4">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="px-2 bg-background text-muted-foreground"></span>
          </div>
        </div>
        <div className="w-full mt-5 z-[60]">{children}</div>
      </div>
    </div>
  );
};

export default ModalGlobal;
