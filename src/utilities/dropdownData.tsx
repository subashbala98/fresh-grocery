export interface DropDownModel {
  id: number;
  label: string;
}
export interface ProductsModel {
  productName: string;
  productCost: number;
  productCategory: { id: 1; label: "" };
  productImage: string;
  productDbId?: string;
}
const dropdownData: DropDownModel[] = [
  { id: 1, label: "Fruits and Vegetables" },
  { id: 2, label: "Dairy, Bread and Eggs" },
  { id: 3, label: "Rice, Dal and Oils" },
  { id: 4, label: "Masalas and More" },
  { id: 5, label: "Beverages" },
  { id: 6, label: "Munchies" },
  { id: 7, label: "Biscuits" },
  { id: 8, label: "Sweet Tooth" },
  { id: 9, label: "Meat" },
  { id: 10, label: "Instant Food" },
  { id: 11, label: "Trendsetters" },
  { id: 12, label: "Healthy Living" },
  { id: 13, label: "Pann Corner" },
  { id: 14, label: "Bakery" },
  { id: 15, label: "Breakfast and Spreads" },
  { id: 16, label: "Pharma and Baby care" },
  { id: 17, label: "Home Utilities" },
  { id: 18, label: "Cleaning Essential" },
  { id: 19, label: "Bath and Body" },
  { id: 20, label: "Hygine and Grooming" },
];

export default dropdownData;
