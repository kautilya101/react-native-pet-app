import { PetFormData } from "@/utils/zod";

export interface IconProps {
  name: string;
  color: string;
  size?: number;
}

export type ModalDataType = PetFormData & {
  image?: string | null;
}