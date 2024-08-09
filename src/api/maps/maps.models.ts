export interface MapContent {
  type: string;
  code: string;
}

export interface Map {
  name: string;
  skin: string;
  x: number;
  y: number;
  content: MapContent;
}

export interface QueryMapsRequest {
  page: number;
  size: number;
  content_code?: string;
  content_type?: string;
}
