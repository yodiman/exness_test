export interface IConfigDTO {
  app: {
    description: string;
    head: {
      titleTemplate: string;
      meta: Array<{
        name?: string;
        content?: string;
        charset?: string;
        property?: string;
      }>
    };
    title: string;
  };
  env: {
    host: string;
    hostUrl: string;
    isProduction: boolean;
    port: number;
    ssl: boolean;
  };
}
