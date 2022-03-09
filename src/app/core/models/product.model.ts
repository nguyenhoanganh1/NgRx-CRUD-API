export interface Product {
  id : number;
	name : string;
	image : string;
	unitPrice : number;
	discount : number;
	quantity : number;
	productDate : string;
	description : string;
	special : boolean;
	latest : boolean;
  categoryId : number;
}
