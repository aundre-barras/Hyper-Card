import { hexToRGBA } from "./hexToRGBA";

export const Themes = (background_color, secondary_color) => {
    return ([
        {
            "backgroundColor":`${background_color}`,
            "background":`linear-gradient(167.95deg, ${hexToRGBA(background_color)} 63.36%, ${hexToRGBA(background_color)} 100%)`,
            "backgroundPosition":"0",
            "backgroundSize":"",
            "backgroundRepeat":"",

        },
        {
            "backgroundColor":`${background_color}`,
            "background": `linear-gradient(167.95deg, ${hexToRGBA(background_color)} 63.36%, ${hexToRGBA(secondary_color)} 100%)`,
            "backgroundPosition":"0",
            "backgroundSize":"",
            "backgroundRepeat":"",

        },
        {
            "backgroundColor":`${background_color}`,
            "background":`linear-gradient(135deg, ${hexToRGBA(secondary_color)} 25%, transparent 25%), linear-gradient(225deg, ${hexToRGBA(secondary_color)} 25%, transparent 25%), linear-gradient(45deg, ${hexToRGBA(secondary_color)} 25%, transparent 25%), linear-gradient(315deg, ${hexToRGBA(secondary_color)} 25%, ${hexToRGBA(background_color)} 25%)`,
            "backgroundPosition":"36px 0, 36px 0, 0 0, 0 0",
            "backgroundSize":"72px 72px",
            "backgroundRepeat":"repeat",
        },
        {
            "backgroundColor":`${background_color}`,
            "background":`repeating-linear-gradient( 45deg, ${hexToRGBA(secondary_color)}, ${hexToRGBA(secondary_color)} 6px, ${hexToRGBA(background_color)} 6px, ${hexToRGBA(background_color)} 30px )`,
            "backgroundPosition":"",
            "backgroundSize":"",
            "backgroundRepeat":""

        },
        {
            "backgroundColor":`${background_color}`,
            "background":`repeating-linear-gradient( -45deg, ${hexToRGBA(secondary_color)}, ${hexToRGBA(secondary_color)} 6px, ${hexToRGBA(background_color)} 6px, ${hexToRGBA(background_color)} 30px )`,
            "backgroundPosition":"",
            "backgroundSize":"",
            "backgroundRepeat":""
        },
        {
            "backgroundColor":`${background_color}`,
            "background":`linear-gradient(45deg, ${hexToRGBA(secondary_color)} 50%, ${hexToRGBA(background_color)} 50%)`,
            "backgroundPosition":"",
            "backgroundSize":"66px 66px",
            "backgroundRepeat":""
        },
        {
            "backgroundColor":`${background_color}`,
            "background":`linear-gradient(-45deg, ${hexToRGBA(background_color)}, ${hexToRGBA(background_color)} 50%, ${hexToRGBA(secondary_color)} 50%, ${hexToRGBA(secondary_color)})`,
            "backgroundPosition":"",
            "backgroundSize":"66px 66px",
            "backgroundRepeat":""
        },
        {
            "backgroundColor":`${background_color}`,
            "background":`repeating-linear-gradient(45deg, ${hexToRGBA(secondary_color)} 25%, transparent 25%, transparent 75%, ${hexToRGBA(secondary_color)} 75%, ${hexToRGBA(secondary_color)}), repeating-linear-gradient(45deg, ${hexToRGBA(secondary_color)} 25%, ${hexToRGBA(background_color)} 25%, ${hexToRGBA(background_color)} 75%, ${hexToRGBA(secondary_color)} 75%, ${hexToRGBA(secondary_color)})`,
            "backgroundPosition":"0 0, 44px 44px",
            "backgroundSize":"88px 88px",
            "backgroundRepeat":""
        },
        {   
            "backgroundColor":`${background_color}`,
            "background":`radial-gradient(circle at top left,transparent 25%,${hexToRGBA(secondary_color)} 25.5%, ${hexToRGBA(secondary_color)} 36%, transparent 37%, transparent 100%),radial-gradient(circle at bottom right,transparent 34%,${hexToRGBA(secondary_color)} 34.5%, ${hexToRGBA(secondary_color)} 45.5%, transparent 46%, transparent 100%)`,
            "backgroundPosition":"",
            "backgroundSize":"4em 4em",
            "backgroundRepeat":""
        },
        {
            "backgroundColor":`${background_color}`,
            "background":`radial-gradient(circle at bottom left,transparent 25%,${hexToRGBA(secondary_color)} 25.5%, ${hexToRGBA(secondary_color)} 36%, transparent 37%, transparent 100%),radial-gradient(circle at top right,transparent 34%,${hexToRGBA(secondary_color)} 34.5%, ${hexToRGBA(secondary_color)} 45.5%, transparent 46%, transparent 100%)`,
            "backgroundPosition":"",
            "backgroundSize":"4em 4em",
            "backgroundRepeat":""
        },
        {
            "backgroundColor":`${background_color}`,
            "background":`radial-gradient(circle, ${hexToRGBA(secondary_color)} 25%, transparent 26%),radial-gradient(circle at bottom left, ${hexToRGBA(secondary_color)} 12%, transparent 13%),radial-gradient(circle at bottom right, ${hexToRGBA(secondary_color)} 12%, transparent 13%),radial-gradient(circle at top left, ${hexToRGBA(secondary_color)} 12%, transparent 13%),radial-gradient(circle at top right, ${hexToRGBA(secondary_color)} 12%, transparent 13%)`,
            "backgroundPosition":"",
            "backgroundSize":"6em 6em",
            "backgroundRepeat":""
        },
        {
            "backgroundColor":"#e5e5f7",
            "background":`radial-gradient(${secondary_color} 2px, ${hexToRGBA(background_color)} 2px)`,
            "backgroundPosition":"",
            "backgroundSize":"25px 25px",
            "backgroundRepeat":""
        }
    ]);
};