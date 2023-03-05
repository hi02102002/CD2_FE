import { Box, Modal, styled } from '@mui/material';

import { Breadcrumbs, CategoryAction, MainContent } from '@/components/admin';
import { ROUTES } from '@/constants';
import { useDisclosure } from '@/hooks/useDisclosure';
import { AdminLayout } from '@/layouts/admin';
import { NextPageWithLayout } from '@/types/shared';

const Category: NextPageWithLayout = () => {
    const {
        isOpen: isOpenModalAdd,
        onClose: onCloseModalAdd,
        onOpen: onOpenModalAdd,
    } = useDisclosure();

    const {
        isOpen: isOpenModalEdit,
        onClose: onCloseModalEdit,
        onOpen: onOpenModalEdit,
    } = useDisclosure();

    return (
        <Box padding={16}>
            <Breadcrumbs
                breadcrumbs={[
                    {
                        href: ROUTES.ADMIN,
                        name: 'Dashboard',
                    },
                    {
                        href: ROUTES.ADMIN_CATEGORY,
                        name: 'Category',
                    },
                ]}
            />
            <Box marginTop={16}>
                <MainContent
                    TableProps={{
                        columns: [],
                        rows: [],
                    }}
                    ButtonAddProps={{
                        textButton: 'Add category',
                        onClick: onOpenModalAdd,
                    }}
                />
            </Box>
            <StyledModal open={isOpenModalAdd} onClose={onCloseModalAdd}>
                <CategoryAction onClose={onCloseModalAdd} />
            </StyledModal>
            <StyledModal open={isOpenModalEdit} onClose={onCloseModalEdit}>
                <CategoryAction
                    onClose={onCloseModalEdit}
                    type="EDIT"
                    dataEdit={{
                        code: 'category',
                        name: 'Category',
                        file: [],
                    }}
                />
            </StyledModal>
        </Box>
    );
};

Category.getLayout = (page) => {
    return <AdminLayout>{page}</AdminLayout>;
};

const StyledModal = styled(Modal)`
    display: flex;
    align-items: center;
    justify-content: center;
`;

export default Category;
