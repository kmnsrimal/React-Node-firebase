// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Unarchive from "@material-ui/icons/Unarchive";
import Language from "@material-ui/icons/Language";
// core components/views for Admin layout
import DailyWorkPage from "./views/ConductorDailyWork/ConductorDailyWork.jsx";
import UserProfile from "./views/UserProfile/UserProfile.jsx";
import TableList from "./views/TableList/TableList.jsx";
import Typography from "./views/Typography/Typography.jsx";
import Icons from "views/Icons/Icons.jsx";
import Conductor7Day from "./views/Conductor7Day/Conductor7Day.jsx";
import Maps from "./views/Maps/Maps.jsx";
import NotificationsPage from "./views/Notifications/Notifications.jsx";
import UpgradeToPro from "./views/UpgradeToPro/UpgradeToPro.jsx";
// core components/views for RTL layout
import RTLPage from "./views/RTLPage/RTLPage.jsx";
import AddLabourer from "./views/AddLabourer/AddLabourer.jsx";
import Div from "./views/Admin/Division.jsx";
import Field from "./views/Admin/Field.jsx";
import Man from "./views/Admin/Manager.jsx";
import Clerk from "./views/Admin/Clerk.jsx";

const dashboardRoutes = [
  {
    path: "/Division",
    name: "Division",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: Div,
    layout: "/admin"
  },
  
  {
    path: "/Field",
    name: "Field",
    rtlName: "ملف تعريفي للمستخدم",
    icon: Dashboard,
    component: Field,
    layout: "/admin"
  },
  
  {
    path: "/Manager",
    name: "Manager",
    rtlName: "ملف تعريفي للمستخدم",
    icon: Person,
    component: Man,
    layout: "/admin"
  },
  
  {
    path: "/Clerk",
    name: "Clerk",
    rtlName: "الرموز",
    icon: BubbleChart,
    component: Clerk,
    layout: "/admin"
  },

  // {
  //   path: "/ExpensesHandling",
  //   name: "Expenses Handling",
  //   rtlName: "قائمة الجدول",
  //   icon: "content_paste",
  //   component: TableList,
  //   layout: "/conductor"
  // },
  // {
  //   path: "/typography",
  //   name: "Typography",
  //   rtlName: "طباعة",
  //   icon: LibraryBooks,
  //   component: Typography,
  //   layout: "/admin"
  // },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   rtlName: "الرموز",
  //   icon: BubbleChart,
  //   component: Icons,
  //   layout: "/admin"
  // },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   rtlName: "خرائط",
  //   icon: LocationOn,
  //   component: Maps,
  //   layout: "/admin"
  // },
  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   rtlName: "إخطارات",
  //   icon: Notifications,
  //   component: NotificationsPage,
  //   layout: "/admin"
  // },
  // {
  //   path: "/upgrade-to-pro",
  //   name: "Upgrade To PRO",
  //   rtlName: "التطور للاحترافية",
  //   icon: Unarchive,
  //   component: UpgradeToPro,
  //   layout: "/admin"
  // },
  // {
  //   path: "/rtl-page",
  //   name: "RTL Support",
  //   rtlName: "پشتیبانی از راست به چپ",
  //   icon: Language,
  //   component: RTLPage,
  //   layout: "/rtl"
  // }
];

export default dashboardRoutes;