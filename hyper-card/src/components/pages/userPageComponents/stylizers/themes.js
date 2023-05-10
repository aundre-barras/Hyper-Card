import { hexToRGBA } from "./hexToRGBA";

export const Themes = (background_color, secondary_color) => {

    return ([
        {
            "backgroundColor":`${hexToRGBA(background_color, 1)}`,
            "backgroundImage":`linear-gradient(${hexToRGBA(background_color, 1)}, ${hexToRGBA(background_color, 1)} 100%)`,
            "backgroundPosition":"0",
            "backgroundSize":"",
            "backgroundRepeat":"",

        },
        {
            "backgroundColor":`${hexToRGBA(background_color, 1)}`,
            "backgroundImage": `linear-gradient(180deg, ${hexToRGBA(background_color, 1)} 50%, ${hexToRGBA(secondary_color, 1)} 100%)`,
            "backgroundPosition":"0",
            "backgroundSize":"",
            "backgroundRepeat":"",

        },
        {   "backgroundColor":`${hexToRGBA(background_color, 1)}`,
            "backgroundImage": `radial-gradient(circle, ${hexToRGBA(secondary_color, .4)} 10%, transparent 11%),radial-gradient(circle at bottom left, ${hexToRGBA(secondary_color, .4)} 5%, transparent 6%),radial-gradient(circle at bottom right, ${hexToRGBA(secondary_color, .4)} 5%, transparent 6%),radial-gradient(circle at top left, ${hexToRGBA(secondary_color, .4)} 5%, transparent 6%),radial-gradient(circle at top right, ${hexToRGBA(secondary_color, .4)} 5%, transparent 6%)`,
            "backgroundPosition":"0",
            "backgroundSize": "5em 5em",
            "backgroundRepeat":"",
        },
        {   
            "backgroundColor":`${hexToRGBA(background_color, 1)}`,
            "backgroundImage": `linear-gradient(0deg, transparent 45%, ${hexToRGBA(secondary_color, .2)} 45%, ${hexToRGBA(secondary_color, .2)} 55%, transparent 55%, transparent 20%, ${hexToRGBA(secondary_color, .2)} 20%, ${hexToRGBA(secondary_color, .2)} 30%,transparent 30%)`,
            "backgroundPosition":"0",
            "backgroundSize": "5em 5em",
            "backgroundRepeat":"",
        },
        {   
            "backgroundColor":`${hexToRGBA(background_color, 1)}`,
            "backgroundImage": `repeating-linear-gradient(45deg, ${hexToRGBA(secondary_color, .2)} 0, ${hexToRGBA(secondary_color, .2)} 10%, transparent 0, transparent 50%)`,
            "backgroundPosition":"0",
            "backgroundSize": "5em 5em",
            "backgroundRepeat":"",
        },
        {   
            "backgroundColor":`${hexToRGBA(background_color, 1)}`,
            "backgroundImage": `radial-gradient(circle at top left,transparent 9%, ${hexToRGBA(secondary_color, .2)} 10% ,${hexToRGBA(secondary_color, .2)} 15% , transparent 16%) , radial-gradient(circle at bottom left,transparent 9%, ${hexToRGBA(secondary_color, .2)} 10% ,${hexToRGBA(secondary_color, .2)} 15% , transparent 16%), radial-gradient(circle at top right ,transparent 9%, ${hexToRGBA(secondary_color, .2)} 10% ,${hexToRGBA(secondary_color, .2)} 15% , transparent 16%) , radial-gradient(circle at bottom right,transparent 9%, ${hexToRGBA(secondary_color, .2)} 10% ,${hexToRGBA(secondary_color, .2)} 15% , transparent 16%),radial-gradient(circle, transparent 25%, ${hexToRGBA(background_color, 1)}  26%),linear-gradient(45deg, transparent 46%, ${hexToRGBA(secondary_color, .2)} 47%, ${hexToRGBA(secondary_color, .2)} 52%, transparent 53%), linear-gradient(135deg, transparent 46%, ${hexToRGBA(secondary_color, .2)} 47%, ${hexToRGBA(secondary_color, .2)} 52%, transparent 53%)`,
            "backgroundPosition":"0",
            "backgroundSize": "5em 5em",
            "backgroundRepeat":"",
        },
        {   
            "backgroundColor":`${hexToRGBA(background_color, 1)}`,
            "backgroundImage": `radial-gradient(circle at bottom left,transparent 25%,${hexToRGBA(secondary_color, .2)} 25.5%, ${hexToRGBA(secondary_color, .2)} 36%, transparent 37%, transparent 100%),radial-gradient(circle at top right,transparent 34%,${hexToRGBA(secondary_color, .2)} 34.5%, ${hexToRGBA(secondary_color, .2)} 45.5%, transparent 46%, transparent 100%)`,
            "backgroundPosition":"0",
            "backgroundSize": "5em 5em",
            "backgroundRepeat":"",
        },
        {   
            "backgroundColor":`${hexToRGBA(background_color, 1)}`,
            "backgroundImage": `radial-gradient(circle at 40% 40%, ${hexToRGBA(secondary_color, .2)} 25%, transparent 26%),radial-gradient(circle at 60% 60%, ${hexToRGBA(secondary_color, .1)} 25%, transparent 26%)`,
            "backgroundPosition":"0",
            "backgroundSize": "5em 5em",
            "backgroundRepeat":"",
        },
        {   
            "backgroundColor":`${hexToRGBA(background_color, 1)}`,
            "backgroundImage": `linear-gradient(45deg, transparent 49%, ${hexToRGBA(secondary_color, .2)} 49% 51%, transparent 51%) , linear-gradient(-45deg, transparent 49%, ${hexToRGBA(secondary_color, .2)} 49% 51%, transparent 51%)`,
            "backgroundPosition":"0",
            "backgroundSize": "5em 5em",
            "backgroundRepeat":"",
        },
    ]);
};