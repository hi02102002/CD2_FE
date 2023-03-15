import { useState } from 'react';

import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { Box } from '@mui/system';

import { pxToRem } from '@/utils/pxToRem';

import AboutBrandTab from '../AboutBrandTab';
import DetailTab from '../DetailTab';
import ReviewTab from '../ReviewTab';
import ShippingTab from '../ShippingTab';

interface TabPanelProps {
    children?: React.ReactNode;
    dir?: string;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function ProductDetailTab() {
    const [value, setValue] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <StyledProductInfoItems component="div">
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="tabs"
                    defaultValue={0}
                    variant="scrollable"
                    scrollButtons
                    allowScrollButtonsMobile
                >
                    <Tab
                        className="btn-changetab"
                        label="Details"
                        {...a11yProps(0)}
                    />
                    <Tab
                        className="btn-changetab"
                        label={`Reviews ${1}`}
                        {...a11yProps(1)}
                    />
                    <Tab
                        className="btn-changetab"
                        label="About Brand"
                        {...a11yProps(2)}
                    />
                    <Tab
                        className="btn-changetab"
                        label="Shipping and Returns"
                        {...a11yProps(3)}
                    />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <DetailTab></DetailTab>
            </TabPanel>

            <TabPanel value={value} index={1}>
                <ReviewTab></ReviewTab>
            </TabPanel>

            <TabPanel value={value} index={2}>
                <AboutBrandTab></AboutBrandTab>
            </TabPanel>

            <TabPanel value={value} index={3}>
                <ShippingTab></ShippingTab>
            </TabPanel>
        </StyledProductInfoItems>
    );
}

const StyledProductInfoItems = styled(Box)`
    margin-bottom: ${pxToRem(70)};
    .btn-changetab {
        margin-right: ${pxToRem(64)};
        color: #b3b3c4;
        font-weight: 600;
        text-transform: none;
        font-size: ${pxToRem(18)};
    }

    .btn-changetab.Mui-selected {
        color: #000;
    }
`;
export default ProductDetailTab;
