export const Themes = (main_color, secondary_color) => {
    return ([
        {
            "backgroundColor":`${background_color}`,
            "opacity":"0.5",
            "background":`linear-gradient(135deg, ${primary_color} 25%, transparent 25%), linear-gradient(225deg, ${primary_color} 25%, transparent 25%), linear-gradient(45deg, ${primary_color} 25%, transparent 25%), linear-gradient(315deg, ${primary_color} 25%, ${background_color} 25%)`,
            "backgroundPosition":"18px 0, 18px 0, 0 0, 0 0",
            "backgroundSize":"36px 36px",
            "backgroundRepeat":"repeat",
        },
        {
            "backgroundColor":`${background_color}`,
            "opacity":"0.5",
            "background":`repeating-linear-gradient( 45deg, ${primary_color}, ${primary_color} 6px, ${background_color} 6px, ${background_color} 30px )`,
            "backgroundPosition":"",
            "backgroundSize":"",
            "backgroundRepeat":""

        },
        {
            "backgroundColor":`${background_color}`,
            "opacity":"0.5",
            "background":`repeating-linear-gradient( -45deg, ${primary_color}, ${primary_color} 6px, ${background_color} 6px, ${background_color} 30px )`,
            "backgroundPosition":"",
            "backgroundSize":"",
            "backgroundRepeat":""
        },
        {
            "backgroundColor":`${background_color}`,
            "opacity":"0.5",
            "background":`linear-gradient(45deg, ${primary_color} 50%, ${background_color} 50%)`,
            "backgroundPosition":"",
            "backgroundSize":"22px 22px",
            "backgroundRepeat":""
        },
        {
            "backgroundColor":`${background_color}`,
            "opacity":"0.5",
            "background":`linear-gradient(-45deg, ${background_color}, ${background_color} 50%, ${primary_color} 50%, ${primary_color})`,
            "backgroundPosition":"",
            "backgroundSize":"22px 22px",
            "backgroundRepeat":""
        },
        {
            "backgroundColor":`${background_color}`,
            "opacity":"0.5",
            "background":`repeating-linear-gradient(45deg, ${primary_color} 25%, transparent 25%, transparent 75%, ${primary_color} 75%, ${primary_color}), repeating-linear-gradient(45deg, ${primary_color} 25%, ${background_color} 25%, ${background_color} 75%, ${primary_color} 75%, ${primary_color})`,
            "backgroundPosition":"0 0, 22px 22px",
            "backgroundSize":"44px 44px",
            "backgroundRepeat":""
        },
        {   
            "backgroundColor":`${background_color}`,
            "opacity":"0.5",
            "background":`radial-gradient(circle at top left,transparent 25%,${primary_color} 25.5%, ${primary_color} 36%, transparent 37%, transparent 100%),radial-gradient(circle at bottom right,transparent 34%,${primary_color} 34.5%, ${primary_color} 45.5%, transparent 46%, transparent 100%)`,
            "backgroundPosition":"",
            "backgroundSize":"3em 3em",
            "backgroundRepeat":""
        },
        {
            "backgroundColor":`${background_color}`,
            "opacity":"0.5",
            "background":`radial-gradient(circle at bottom left,transparent 25%,${primary_color} 25.5%, ${primary_color} 36%, transparent 37%, transparent 100%),radial-gradient(circle at top right,transparent 34%,${primary_color} 34.5%, ${primary_color} 45.5%, transparent 46%, transparent 100%)`,
            "backgroundPosition":"",
            "backgroundSize":"3em 3em",
            "backgroundRepeat":""
        },
        {
            "backgroundColor":`${background_color}`,
            "opacity":"0.5",
            "background":`radial-gradient(circle, ${primary_color} 25%, transparent 26%),radial-gradient(circle at bottom left, ${primary_color} 12%, transparent 13%),radial-gradient(circle at bottom right, ${primary_color} 12%, transparent 13%),radial-gradient(circle at top left, ${primary_color} 12%, transparent 13%),radial-gradient(circle at top right, ${primary_color} 12%, transparent 13%)`,
            "backgroundPosition":"",
            "backgroundSize":"3em 3em",
            "backgroundRepeat":""
        },
        {
            "backgroundColor":`${background_color}`,
            "opacity":"0.5",
            "background":`linear-gradient(-71deg, ${primary_color} 25%, transparent 26%, transparent 74%, ${primary_color} 75%)`,
            "backgroundPosition":"",
            "backgroundSize":"3em 3em",
            "backgroundRepeat":""
        },
        {
            "backgroundColor":`${background_color}`,
            "opacity":"0.5",
            "background":`linear-gradient(45deg,${primary_color} 20%, transparent 20%), linear-gradient(135deg, transparent 80%, ${primary_color} 80%), radial-gradient(${primary_color} 20% , transparent 21%)`,
            "backgroundPosition":"",
            "backgroundSize":"3em 3em",
            "backgroundRepeat":""
        }
    ]);
};