import { StatusBarStyle } from "react-native";
import { StatusColorType, TABS } from "./utils";

class Styleguide {
  public tintColor: string;
  public primaryColor: string;
  public secondaryColor: string;
  public primaryBackgroundColor: string;
  public sectionBorderColor: string;
  public sectionWarningStatusColor: string;
  public sectionDangerStatusColor: string;
  public sectionSuccessStatusColor: string;
  public buttonBackgroundColor: string;
  public buttonTextColor: string;
  public listItemButtonBackgroundColor: string;
  public listItemButtonTextColor: string;
  public dutyStatusActiveColor: string;
  public dutyStatusActiveTintColor: string;
  public dutyStatusNotActiveColor: string;
  public dutyStatusNotActiveTintColor: string;
  public tabActiveColor: string;
  public tabColor: string;
  public segmentedTabBgColor: string;
  public segmentedTabContainerBgColor: string;
  public segmentedTabTextColor: string;
  public segmentedActiveTabTextColor: string;

  public orderItemSlugColor: string;
  public orderItemDateColor: string;
  public orderItemPriceColor: string;
  public orderItemBorderColor: string;
  public orderItemBottomSectionTextColor: string;
  public orderItemOrderTypeTabBgColor: string;

  public listItemTextColor: string;

  constructor() {
    this.primaryBackgroundColor = 'white'
    this.tintColor = '#a3aaae'
    this.primaryColor = '#ff5a5f'
    this.secondaryColor = '#595bd4'
    this.sectionBorderColor = '#e4e4e4'
    this.sectionWarningStatusColor = '#fa6400'
    this.sectionDangerStatusColor = '#ff0000'
    this.sectionSuccessStatusColor = '#04aa11'
    this.buttonBackgroundColor = '#0a84ff'
    this.buttonTextColor = '#ffffff'
    this.listItemButtonBackgroundColor = 'rgba(109,114,120,0.1)'
    this.listItemButtonTextColor = '#0a84ff'
    this.dutyStatusActiveColor = 'rgb(4,170,17)'
    this.dutyStatusActiveTintColor = 'rgba(4,170,17, 0.28)'
    this.dutyStatusNotActiveColor = 'rgb(185,185,185)'
    this.dutyStatusNotActiveTintColor = 'rgba(185,185,185, 0.28)'
    this.tabActiveColor = '#0a84ff'
    this.tabColor = '#000000'
    this.segmentedTabBgColor = '#e9e9e9'
    this.segmentedTabContainerBgColor = '#e9e9e9'
    this.segmentedTabTextColor = '#000000'
    this.segmentedActiveTabTextColor = '#ffffff'

    this.orderItemSlugColor = '#6d7278'
    this.orderItemDateColor = '#000000'
    this.orderItemPriceColor = '#000000'
    this.orderItemBorderColor = '#f4f4f4'
    this.orderItemBottomSectionTextColor = this.secondaryColor
    this.orderItemOrderTypeTabBgColor = '#f7f7f7'

    this.listItemTextColor = '#6d7278'
  }

  statusBarContentColor(view, darkTheme = false): StatusBarStyle {
    switch (view) {
      case TABS.PROFILE:
      case TABS.ORDERS:
        return darkTheme ? 'light-content' : 'dark-content'
      default:
        return 'default'
    }
  }

  getColorByType(type: StatusColorType) {
    switch (type) {
      case "danger":
        return this.sectionDangerStatusColor
      case "warning":
        return this.sectionWarningStatusColor
      case 'info':
        return this.buttonBackgroundColor
      default:
        return this.sectionSuccessStatusColor
    }
  }
}

export default new Styleguide()
