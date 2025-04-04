declare module 'react-native-config' {
    export interface NativeConfig {
        TMDB_BEARER_TOKEN: string;
        TMDB_API_BASE_URL: string
    }
    export const Config: NativeConfig;
    export default Config;
  }