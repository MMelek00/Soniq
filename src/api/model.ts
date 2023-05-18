export interface Photo {
  url: string;
  id: string;
  title: string;
  comment: null | Comment[];
}
export interface Comment {
  id: string;
  content: string;
}
