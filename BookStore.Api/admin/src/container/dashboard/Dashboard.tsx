import React from "react";
import { GetAllSoldOrdersView } from "shared/models/dashboard/GetAllCharts";
import { GetClickStatisticViewItem } from "shared/models/dashboard/GetClickStatisticViewItem";
import { Statistic } from "shared/models/dashboard/Statistic";
import { AllAndSoldOrdersChart } from "./charts/AllAndSoldOrdersChart";
import { AllSoldTypesCountChart } from "./charts/AllSoldTypesCountChart";
import { SoldCategoriesChart } from "./charts/SoldCategoriesChart";
import { SoldOrdersChart } from "./charts/SoldOrdersChart";
import './dasboard.scss';


interface Props {
    statistic: Statistic;
    mainCharts: GetAllSoldOrdersView;
    clicksStatistick: GetClickStatisticViewItem;
}


export const Dasboard = (props: Props) => {
    const { statistic, mainCharts, clicksStatistick } = props;

    return (
        <div className="ps-3">
            <h1 className="adminPageTitle">Dashboard</h1>
            <div>
                <span className="p-2">All Time Users - {clicksStatistick.allUsersCount}</span>
                <span className="p-2">Active users last 24h - {clicksStatistick.activeUsersCount}</span>
                <span className="p-2">Clicks last 24h - {clicksStatistick.clicksCount}</span>
                <span className="p-2">Pre-Ordered products for 7 days - {clicksStatistick.preOrderedProductsCount}</span>

                <span className="p-2">Designers - {statistic.designerCount}</span>
                <span className="p-2">Products - {statistic.productsCount}</span>
                <span className="p-2">All Orders - {statistic.ordersCount}</span>
            </div>
            {mainCharts.soldChart &&
                <div>
                    <SoldOrdersChart
                        months={mainCharts.soldChart.map(item => item.selectedMonth)}
                        sold={mainCharts.soldChart.map(item => item.quantity)}
                    ></SoldOrdersChart>
                </div>}
            {mainCharts &&
                <div>
                    <AllAndSoldOrdersChart
                        all={mainCharts?.allAndSoldOrdersChart?.all}
                        sold={mainCharts?.allAndSoldOrdersChart?.sold}
                        months={mainCharts?.allAndSoldOrdersChart?.months}
                    ></AllAndSoldOrdersChart>
                </div>
            }
            {mainCharts &&
                <div className="second-charts">
                    <div>
                        <SoldCategoriesChart
                            allSoldTypesCount={mainCharts.allSoldCategories}
                        ></SoldCategoriesChart>
                    </div>
                    <div>
                        <AllSoldTypesCountChart
                            allSoldTypesCount={mainCharts.allSoldTypesCount}
                        ></AllSoldTypesCountChart>
                    </div>
                </div>}
        </div>
    )
}