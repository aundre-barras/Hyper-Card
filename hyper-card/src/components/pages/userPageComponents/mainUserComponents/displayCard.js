import {
    Typography,
    Button,
    Box,
    Grid,
    IconButton,
    useThemeProps
} from '@mui/material';
import { Fragment } from 'react';
import { DisplayLink } from './addlink';

export const DisplayCard = (props) => {
    const {userCards} = props;

    return (
        <Fragment>
            {
                userCards.map((card , idx) => {
                    return(
                            <DisplayLink key={idx} card={card}/>
                    )
                })
            }
        </Fragment>
    )
}