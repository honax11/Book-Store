import { GetAllAndSoldOrdersViewItem } from "./GetAllAndSoldOrdersViewItem";
import { GetAllSoldCategoryViewItem } from "./GetAllSoldCategoryViewItem";
import { GetAllSoldOrdersViewItem } from "./GetAllSoldOrdersViewItem";
import { GetAllSoldTypesCountViewItem } from "./GetAllSoldTypesCountViewItem";

export interface GetAllSoldOrdersView {
    soldChart: GetAllSoldOrdersViewItem[];
    allAndSoldOrdersChart: GetAllAndSoldOrdersViewItem;
    allSoldTypesCount: GetAllSoldTypesCountViewItem[];
    allSoldCategories: GetAllSoldCategoryViewItem[];
}