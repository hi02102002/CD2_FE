import { useCallback, useEffect, useMemo, useState } from 'react';

import { Box, IconButton, Modal, Stack, styled } from '@mui/material';

import { AlterConfirm, Breadcrumbs, CategoryAction, MainContent } from '@/components/admin';
import LoadingFullPage from '@/components/admin/LoadingFullPage';
import { ROUTES } from '@/constants';
import { useDisclosure } from '@/hooks/useDisclosure';
import { AdminLayout } from '@/layouts/admin';
import useCategoryStore from '@/store/category';
import { Category, FormInputs as CategoryInput } from '@/types/category';
import { NextPageWithLayout } from '@/types/shared';
import { withProtect } from '@/utils/withProtect';
import { GridColDef } from '@mui/x-data-grid';
import { IconEdit } from '@tabler/icons-react';
import Image from 'next/image';
import { toast } from 'react-hot-toast';

const Category: NextPageWithLayout = () => {
    const { categories, fetchCategories, total, removeCategory } = useCategoryStore();
    const [isLoading, setIsLoading] = useState(false)
    const [page, setPage] = useState<number>(0)
    const [limit, setLimit] = useState<number>(15)
    const [isLoadingRemove, setIsLoadingRemove] = useState(false)

    const {
        isOpen: isOpenModalAdd,
        onClose: onCloseModalAdd,
        onOpen: onOpenModalAdd,
    } = useDisclosure();

    const {
        isOpen: isOpenModalConfirmRemove,
        onClose: onCloseModalConfirmRemove,
        onOpen: onOpenModalConfirmRemove,
    } = useDisclosure();

    const [removeIds, setRemoveIds] = useState<number[]>([])

    const [categoryEdit, setCategoryEdit] = useState<CategoryInput & {
        id: number
    } | null>(null)

    const [textSearch, setTextSearch] = useState<string>('')

    const columns: GridColDef<Category>[] = useMemo(() => [
        {
            field: 'id', headerName: 'ID', width: 90, disableColumnMenu: true,
            sortable: false,

        },

        {
            field: 'imageUrl',
            headerName: 'Image',
            sortable: false,
            disableColumnMenu: true,
            flex: 1
            , renderCell(params) {
                return <Box>
                    <Image src={params.value.replace(',', '').trim() || '/noimage.jpg'} alt={params.row.name} width={50} height={40} style={{
                        objectFit: 'contain'
                    }} />
                </Box>
            },


        },
        {
            field: 'name',
            headerName: 'Name',
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            flex: 1


        },
        {
            field: 'code',
            headerName: 'Code',
            sortable: false,
            disableColumnMenu: true,
            flex: 1
        },
        {
            field: 'action',
            headerName: 'Action',
            renderCell(params) {
                return <Stack direction='row'>
                    <IconButton disableRipple onClick={(e) => {
                        e.stopPropagation()
                        setCategoryEdit({
                            code: params.row.code,
                            name: params.row.name,
                            file: [params.row.imageUrl],
                            id: params.row.id
                        })
                    }}>
                        <IconEdit />
                    </IconButton>


                </Stack>
            },
            sortable: false,
            disableColumnMenu: true,
        }
    ], [])

    const handelRemoveCategory = async () => {
        try {
            setIsLoadingRemove(true)
            await removeCategory(removeIds)

            if (removeIds.length === categories.length) {
                setPage(page + 1)
            }
            setIsLoadingRemove(false)
            toast.success('Remove successfully')
            onCloseModalConfirmRemove()
            setRemoveIds([])
        } catch (error) {
            setIsLoadingRemove(false)
            toast.error('Something went wrong')


        }
    }

    const handleFetchCategories = useCallback(async (q?: {
        limit?: number;
        offset?: number;
        name?: string
    }) => {
        try {
            setIsLoading(true)
            fetchCategories(q)
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)

        }
    }, [fetchCategories])

    useEffect(() => {
        handleFetchCategories({ limit, offset: page })
    }, [handleFetchCategories, limit, page]);


    return (
        <>
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
                        columns: columns,
                        rows: categories,
                        loading: isLoading,
                        checkboxSelection: true,
                        onSelectionModelChange(selectionModel) {
                            setRemoveIds(selectionModel as Array<number>)
                        },

                    }}
                    ButtonAddProps={{
                        textButton: 'Add category',
                        onClick: onOpenModalAdd,
                        sx: {
                            ml: 'auto'
                        }
                    }}
                    SearchProps={{
                        onChange: (value) => setTextSearch(value),
                        value: textSearch,
                        onClearSearch: () => handleFetchCategories({ limit, offset: page }),
                        onSearch: () => handleFetchCategories({ limit, offset: page, name: textSearch.length > 0 ? textSearch : undefined })
                    }}
                    TablePaginationProps={{
                        count: total,
                        page: page,
                        onPageChange(event, page) {
                            console.log(page)
                            setPage(page)
                        },
                        rowsPerPage: limit,
                        rowsPerPageOptions: [5, 10, 15],
                        onRowsPerPageChange(e) {
                            setLimit(Number(e.target.value))
                        }
                    }}
                    RemoveProps={{
                        rowSelected: removeIds,
                        ButtonRemoveProps: {
                            loading: isLoadingRemove,
                            onClick: onOpenModalConfirmRemove

                        }
                    }}
                />
            </Box>
            <StyledModal open={isOpenModalAdd} onClose={onCloseModalAdd}>
                <CategoryAction onClose={onCloseModalAdd} />
            </StyledModal>
            <StyledModal open={Boolean(categoryEdit)} onClose={() => {
                setCategoryEdit(null)
            }}>
                <CategoryAction
                    onClose={() => {
                        setCategoryEdit(null)
                    }}
                    type="EDIT"
                    dataEdit={categoryEdit}

                />
            </StyledModal>
        </Box>
            <AlterConfirm
                title='Remove category?'
                contentText='This action will remove this category. Are you sure? '
                open={isOpenModalConfirmRemove}
                isLoading={isLoadingRemove}
                onConfirm={handelRemoveCategory}
            />
            {isLoadingRemove  && <LoadingFullPage/>}
        </>
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

export const getServerSideProps = withProtect({
    isAdmin: true,
    isProtect: true,
})();

export default Category;
