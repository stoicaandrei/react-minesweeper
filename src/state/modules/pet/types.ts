export type PetCategory = {
  id: number;
  name: string;
};

export type PetStatus = 'available' | 'pending' | 'sold';

export type Pet = {
  id: number;
  category?: PetCategory;
  name: string;
  photoUrls: string[];
  tags: string[];
  status: PetStatus;
};
