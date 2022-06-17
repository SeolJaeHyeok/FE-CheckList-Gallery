import 'styled-components';

declare module 'styled-components'{
    export interface DefaultTheme {
        palette:{
            triconblack: String,
            africanviolet: String,
            daydream: String,
            lobelia: String,
            extrawhite: String,
        }
        devices: {
            desktop: String,
            mobile: String
        }
    }
}
