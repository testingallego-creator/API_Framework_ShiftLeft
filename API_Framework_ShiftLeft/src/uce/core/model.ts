
export interface Operation {
  id: string;
  method: string;
  path: string;
}

export interface Service {
  name: string;
  operations: Operation[];
}
