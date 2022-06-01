import styled from 'styled-components';
import { themeGet } from '@styled-system/theme-get';
import { variant } from 'styled-system';

export const EksIcon = styled('i')<{ variant: String }>(

    {
        fontFamily: 'cartzilla-icons'
    },
    variant({
        variants: {
            clickCollect: {
                '&::before': {
                    content: "\e927"
                }
            }
        }
    })
);