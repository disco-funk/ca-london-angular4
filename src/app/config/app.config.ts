import {InjectionToken} from "@angular/core";
import {environment} from "../../environments/environment";

export let APP_CONFIG: InjectionToken<ICALondonAppConfig> = new InjectionToken<ICALondonAppConfig>("app.config");

export const appConfig: ICALondonAppConfig = {
  API_URL: environment.API_URL,
  UI_ENVIRONMENT: environment.UI_ENVIRONMENT
};

export interface ICALondonAppConfig {
  API_URL: string;
  UI_ENVIRONMENT: string;
}
