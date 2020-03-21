import { StatusBarStyle } from "react-native";
import { TABS } from "./utils";

class Styleguide {
  public tintColor: string;
  public primaryColor: string;
  public secondaryColor: string;
  public primaryBackgroundColor: string;

  constructor() {
    this.primaryBackgroundColor = '#efefef'
    this.tintColor = '#a3aaae'
    this.primaryColor = '#ff5a5f'
    this.secondaryColor = '#595bd4'
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
}

export default new Styleguide()
