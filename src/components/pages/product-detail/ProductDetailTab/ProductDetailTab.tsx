import { useState } from 'react';

import styled from '@emotion/styled';
import { useTheme } from '@mui/material';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { Box } from '@mui/system';

import { DEVICE } from '@/constants';
import { pxToRem } from '@/utils/pxToRem';

import AboutBrandTab from '../AboutBrandTab';
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
        <StyledTabPanel
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </StyledTabPanel>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function ProductDetailTab() {
    const [tab, setTab] = useState(1);
    const theme = useTheme();

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setTab(newValue);
    };

    return (
        <StyledProductDetailTab component="div">
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                    value={tab}
                    onChange={handleChange}
                    aria-label="tabs"
                    defaultValue={0}
                    variant="scrollable"
                    scrollButtons
                    allowScrollButtonsMobile
                    TabIndicatorProps={{
                        style: {
                            backgroundColor: theme.themeColor.primary,
                        },
                    }}
                >
                    <Tab
                        className="btn-changetab"
                        label={`Reviews ${1}`}
                        disableRipple
                        {...a11yProps(1)}
                    />
                    <Tab
                        className="btn-changetab"
                        label="About Brand"
                        disableRipple
                        {...a11yProps(2)}
                    />
                    <Tab
                        className="btn-changetab"
                        disableRipple
                        label="Shipping and Returns"
                        {...a11yProps(3)}
                    />
                </Tabs>
            </Box>
            <TabPanel value={tab} index={1}>
                <ReviewTab />
            </TabPanel>

            <TabPanel value={tab} index={2}>
                <AboutBrandTab />
            </TabPanel>

            <TabPanel value={tab} index={3}>
                <ShippingTab />
            </TabPanel>
        </StyledProductDetailTab>
    );
}

const StyledProductDetailTab = styled(Box)`
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

const StyledTabPanel = styled(Box)`
    padding-top: ${pxToRem(30)};

    @media screen and (${DEVICE.tablet}) {
        padding-top: ${pxToRem(60)};
    }
`;

export default ProductDetailTab;
