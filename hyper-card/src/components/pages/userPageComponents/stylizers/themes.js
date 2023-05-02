export const Themes = (background_color, secondary_color) => {
    return ([
        {
            "backgroundColor":`${background_color}`,
            "background":`linear-gradient(167.95deg, ${background_color} 63.36%, ${background_color} 100%)`,
            "backgroundPosition":"0",
            "backgroundSize":"",
            "backgroundRepeat":"",

        },
        {
            "backgroundColor":`${background_color}`,
            "background": `linear-gradient(167.95deg, ${background_color} 63.36%, ${secondary_color} 100%)`,
            "backgroundPosition":"0",
            "backgroundSize":"",
            "backgroundRepeat":"",

        },
        {
            "backgroundColor":`${background_color}`,
            "background":`linear-gradient(135deg, ${secondary_color} 25%, transparent 25%), linear-gradient(225deg, ${secondary_color} 25%, transparent 25%), linear-gradient(45deg, ${secondary_color} 25%, transparent 25%), linear-gradient(315deg, ${secondary_color} 25%, ${background_color} 25%)`,
            "backgroundPosition":"18px 0, 18px 0, 0 0, 0 0",
            "backgroundSize":"36px 36px",
            "backgroundRepeat":"repeat",
        },
        {
            "backgroundColor":`${background_color}`,
            "background":`repeating-linear-gradient( 45deg, ${secondary_color}, ${secondary_color} 6px, ${background_color} 6px, ${background_color} 30px )`,
            "backgroundPosition":"",
            "backgroundSize":"",
            "backgroundRepeat":""

        },
        {
            "backgroundColor":`${background_color}`,
            "background":`repeating-linear-gradient( -45deg, ${secondary_color}, ${secondary_color} 6px, ${background_color} 6px, ${background_color} 30px )`,
            "backgroundPosition":"",
            "backgroundSize":"",
            "backgroundRepeat":""
        },
        {
            "backgroundColor":`${background_color}`,
            "background":`linear-gradient(45deg, ${secondary_color} 50%, ${background_color} 50%)`,
            "backgroundPosition":"",
            "backgroundSize":"22px 22px",
            "backgroundRepeat":""
        },
        {
            "backgroundColor":`${background_color}`,
            "background":`linear-gradient(-45deg, ${background_color}, ${background_color} 50%, ${secondary_color} 50%, ${secondary_color})`,
            "backgroundPosition":"",
            "backgroundSize":"22px 22px",
            "backgroundRepeat":""
        },
        {
            "backgroundColor":`${background_color}`,
            "background":`repeating-linear-gradient(45deg, ${secondary_color} 25%, transparent 25%, transparent 75%, ${secondary_color} 75%, ${secondary_color}), repeating-linear-gradient(45deg, ${secondary_color} 25%, ${background_color} 25%, ${background_color} 75%, ${secondary_color} 75%, ${secondary_color})`,
            "backgroundPosition":"0 0, 22px 22px",
            "backgroundSize":"44px 44px",
            "backgroundRepeat":""
        },
        {   
            "backgroundColor":`${background_color}`,
            "background":`radial-gradient(circle at top left,transparent 25%,${secondary_color} 25.5%, ${secondary_color} 36%, transparent 37%, transparent 100%),radial-gradient(circle at bottom right,transparent 34%,${secondary_color} 34.5%, ${secondary_color} 45.5%, transparent 46%, transparent 100%)`,
            "backgroundPosition":"",
            "backgroundSize":"3em 3em",
            "backgroundRepeat":""
        },
        {
            "backgroundColor":`${background_color}`,
            "background":`radial-gradient(circle at bottom left,transparent 25%,${secondary_color} 25.5%, ${secondary_color} 36%, transparent 37%, transparent 100%),radial-gradient(circle at top right,transparent 34%,${secondary_color} 34.5%, ${secondary_color} 45.5%, transparent 46%, transparent 100%)`,
            "backgroundPosition":"",
            "backgroundSize":"3em 3em",
            "backgroundRepeat":""
        },
        {
            "backgroundColor":`${background_color}`,
            "background":`radial-gradient(circle, ${secondary_color} 25%, transparent 26%),radial-gradient(circle at bottom left, ${secondary_color} 12%, transparent 13%),radial-gradient(circle at bottom right, ${secondary_color} 12%, transparent 13%),radial-gradient(circle at top left, ${secondary_color} 12%, transparent 13%),radial-gradient(circle at top right, ${secondary_color} 12%, transparent 13%)`,
            "backgroundPosition":"",
            "backgroundSize":"3em 3em",
            "backgroundRepeat":""
        },
        {
            "backgroundColor":`${background_color}`,
            "background":`linear-gradient(-71deg, ${secondary_color} 25%, transparent 26%, transparent 74%, ${secondary_color} 75%)`,
            "backgroundPosition":"",
            "backgroundSize":"3em 3em",
            "backgroundRepeat":""
        },
    ]);
};