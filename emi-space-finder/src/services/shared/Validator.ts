import { SpaceEntry } from "../model/Model";

export class MissingFieldError extends Error {
  constructor(missingField:string){
    super(`Value for ${missingField} expected`);
  }
}

export class JSONError extends Error{
  constructor(message:string){
    super(message)
  }
}

//type guard
export function validateAsEntry(arg:any){
  if((arg as SpaceEntry).location == undefined){
    throw new MissingFieldError('location')
  }

  if((arg as SpaceEntry).id == undefined){
    throw new MissingFieldError('id')
  }

  if((arg as SpaceEntry).name == undefined){
    throw new MissingFieldError('name')
  }
}
