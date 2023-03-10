import {
    makeStyles,
    Tab,
    TabList,
    TabValue,
    SelectTabEvent,
    SelectTabData,
    shorthands
} from "@fluentui/react-components";

import {
    HomeRegular, HomeFilled,
    ClipboardTaskListLtrRegular, ClipboardTaskListLtrFilled,
    CalendarLtrRegular, CalendarLtrFilled,
    TimerRegular, TimerFilled,
    DataUsageRegular, DataUsageFilled,
    SettingsRegular, SettingsFilled,
    bundleIcon
} from "@fluentui/react-icons";

import { Dashboard } from "./pages/Dashboard";
import { Tasks } from "./pages/Tasks";
import { Schedule } from "./pages/Schedule";

import * as React from "react";

const Home = bundleIcon(HomeFilled, HomeRegular);
const ClipboardTaskListLtr = bundleIcon(ClipboardTaskListLtrFilled, ClipboardTaskListLtrRegular);
const CalendarLtr = bundleIcon(CalendarLtrFilled, CalendarLtrRegular);
const Timer = bundleIcon(TimerFilled, TimerRegular);
const DataUsage = bundleIcon(DataUsageFilled, DataUsageRegular);
const Settings = bundleIcon(SettingsFilled, SettingsRegular);

const useStyles = makeStyles({
    root: {
        alignItems: "flex-start",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        paddingBottom: "10px",
        rowGap: "20px",
    },
    panels: {
        ...shorthands.padding(0, "10px"),
        "& th": {
            textAlign: "left",
            ...shorthands.padding(0, "30px", 0, 0),
        },
    }
});
  
export const App = () => {
    const styles = useStyles();

    const [selectedValue, setSelectedValue] = React.useState<TabValue>(
        "dashboard"
    );
    
    const onTabSelect = (event: SelectTabEvent, data: SelectTabData) => {
        setSelectedValue(data.value);
    };
  
    const renderTabs = () => {
        return (
        <>
            <Tab value="dashboard" icon={<Home />}>Dashboard</Tab>
            <Tab value="tasks" icon={<ClipboardTaskListLtr />}>Tasks</Tab>
            <Tab value="schedule" icon={<CalendarLtr />}>Schedule</Tab>
            <Tab value="timer" icon={<Timer />}>Pomodoro Timer</Tab>
            <Tab value="metrics" icon={<DataUsage />}>Metrics</Tab>
            <Tab value="settings" icon={<Settings />}>Settings</Tab>
        </>
        );
    };
  
    return (
        <div className={styles.root}>
            <TabList appearance="transparent" selectedValue={selectedValue} onTabSelect={onTabSelect}> { /* Another appearance option is subtle */ }
                {renderTabs()}
            </TabList>
            <div className={styles.panels}>
                {selectedValue === "dashboard" && <Dashboard />}
                {selectedValue === "tasks" && <Tasks />}
                {selectedValue === "schedule" && <Schedule />}
            </div>
        </div>
    );
};