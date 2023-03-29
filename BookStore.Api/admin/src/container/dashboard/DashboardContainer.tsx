import React, { useEffect, useState } from "react";
import { GetAllSoldOrdersView } from "shared/models/dashboard/GetAllCharts";
import { GetClickStatisticViewItem } from "shared/models/dashboard/GetClickStatisticViewItem";
import { Statistic } from "shared/models/dashboard/Statistic";
import { get } from "shared/services/Service";
import { Dasboard } from "./Dashboard";

export const DashboardContainer = () => {
    const [statistic, setStatistic] = useState<Statistic>();
    const [mainCharts, setMainCharts] = useState<GetAllSoldOrdersView>();
    const [clickStatistic, setClickStatistic] = useState<GetClickStatisticViewItem>();

    useEffect(() => {
        getAlLStatistics();
        getAllCharts();
        getClickStatistic();
    }, [])

    const getAllCharts = () => {
        get(`Dashboard/GetAllCharts`)
            .then((response) => {
                setMainCharts(response.data);
            });
    }
    const getClickStatistic = () => {
        get(`Dashboard/GetClickStatistic`)
            .then((response) => {
                setClickStatistic(response.data);
            });
    }


    const getAlLStatistics = () => {
        get(`Dashboard/GetAllStatistics`)
            .then((response) => {
                setStatistic(response.data);
            });
    };

    return (
        <div>
            {statistic && mainCharts && clickStatistic &&
                <Dasboard
                    clicksStatistick={clickStatistic}
                    statistic={statistic}
                    mainCharts={mainCharts}
                ></Dasboard>}
        </div>
    )
}