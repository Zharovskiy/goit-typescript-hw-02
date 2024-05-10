export interface Image {
  alt_description: string;
  description: string | null;
  id: string;
  likes: number;
  links: {
    download: string;
  };
  urls: {
    regular: string;
    small: string;
  };
  user: {
    location: string | null;
    name: string | null;
  };
}

export interface SearchValue {
  query: string;
}
