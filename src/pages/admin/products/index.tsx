import { useCallback, useEffect, useMemo, useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/router';

import {
    Box,
    Button,
    CircularProgress,
    Drawer,
    Grid,
    Menu,
    MenuItem,
    Stack,
} from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { omit } from 'lodash';
import { useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

import {
    AlterConfirm,
    Breadcrumbs,
    FormVariants,
    InputOptions,
    LoadingFullPage,
    MainContent,
} from '@/components/admin';
import { Option as OptionInput } from '@/components/admin/InputOption';
import { ROUTES } from '@/constants';
import { useDisclosure } from '@/hooks/useDisclosure';
import { useOverflowHidden } from '@/hooks/useOverflowHidden';
import { AdminLayout } from '@/layouts/admin';
import productService from '@/services/product.service';
import useProductStore from '@/store/product';
import { Option, Product } from '@/types/product';
import { NextPageWithLayout } from '@/types/shared';
import { formatCurrency } from '@/utils/formatCurrency';
import { withProtect } from '@/utils/withProtect';

const Action = ({ productId }: { productId: number }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const router = useRouter();
    const {
        isOpen: isOpenDrawer,
        onClose: onCloseDrawer,
        onOpen: onOpenDrawer,
    } = useDisclosure();
    const [loadingFetchOptions, setIsLoadingFetchOptions] =
        useState<boolean>(false);
    const [newOptions, setNewOptions] = useState<OptionInput[]>([]);
    const [loadingRemoveOption, setLoadingRemoveOption] =
        useState<boolean>(false);
    const [loadingUpdateOptions, setLoadingUpdateOptions] =
        useState<boolean>(false);
    const [loadingAddOptions, setLoadingAddOptions] = useState<boolean>(false);
    const { control, handleSubmit } = useForm<{
        options: Option[];
    }>({
        defaultValues: {
            options: [],
        },
        mode: 'onBlur',
    });

    const { fields, remove, replace } = useFieldArray({
        name: 'options',
        control,
        rules: {
            required: {
                value: true,
                message: 'This field is required',
            },
        },
    });

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const navigateEdit = () => {
        router.push(`${ROUTES.ADMIN_EDIT_PRODUCT}/${productId}`);
        setAnchorEl(null);
    };

    const handelFetchOptions = useCallback(async () => {
        try {
            setIsLoadingFetchOptions(true);
            if (!isOpenDrawer || !productId) return;
            const _options = await productService.fetchOptionsById(productId);
            setIsLoadingFetchOptions(false);
            replace(_options);
        } catch (error) {
            setIsLoadingFetchOptions(false);
        }
    }, [isOpenDrawer, productId, replace]);

    useOverflowHidden(
        loadingRemoveOption || loadingAddOptions || loadingUpdateOptions,
    );

    const handelAddOptions = async () => {
        try {
            setLoadingAddOptions(true);
            await productService.addOptions({
                productId,
                options: newOptions,
            });
            handelFetchOptions();
            toast.success('Add options successfully');
            setLoadingAddOptions(false);
        } catch (error) {
            toast.success('Something went wrong');
            setLoadingAddOptions(false);
        }
    };

    const handelRemoveOption = async (
        value: { [key: string]: any },
        i: number,
    ) => {
        try {
            setLoadingRemoveOption(true);
            await productService.removeOptionByProductId(
                productId,
                omit(value, ['id']),
            );
            remove(i);
            setLoadingRemoveOption(false);
            toast.success('Remove option successfully');
        } catch (error) {
            toast.error('Something went wrong');
        }
    };

    const handelUpdateOptions = async (data: { options: Option[] }) => {
        try {
            setLoadingUpdateOptions(true);
            await productService.updateOptionsByProductId(
                productId,
                data.options.map((o) => ({
                    ...o,
                    quantity: Number(o.quantity),
                })),
            );
            setLoadingUpdateOptions(false);
            toast.success('Update options successfully');
            onCloseDrawer();
        } catch (error) {
            setLoadingUpdateOptions(false);
            toast.error('Something went wrong');
        }
    };

    useEffect(() => {
        handelFetchOptions();
    }, [handelFetchOptions]);

    useEffect(() => {
        console.log(fields);
    }, [fields]);

    return (
        <>
            <Button
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                variant="contained"
            >
                Action
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
                anchorOrigin={{
                    horizontal: 'center',
                    vertical: 'bottom',
                }}
            >
                <MenuItem onClick={navigateEdit}>Edit</MenuItem>
                <MenuItem
                    onClick={() => {
                        onOpenDrawer();
                        setAnchorEl(null);
                    }}
                >
                    Update options
                </MenuItem>
            </Menu>
            <Drawer
                anchor="right"
                PaperProps={{
                    sx: {
                        maxWidth: 768,
                        width: '100%',
                        padding: 16,
                    },
                }}
                open={isOpenDrawer}
                onClose={onCloseDrawer}
            >
                <Stack gap={16} height="100%">
                    {loadingFetchOptions ? (
                        <Box
                            flex={1}
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                        >
                            <CircularProgress />
                        </Box>
                    ) : (
                        <>
                            {fields.length > 0 ? (
                                <FormVariants
                                    options={fields}
                                    onRemove={handelRemoveOption}
                                    control={control}
                                />
                            ) : (
                                <InputOptions
                                    value={newOptions}
                                    onChange={(value) => {
                                        setNewOptions(value);
                                    }}
                                />
                            )}
                            <Button
                                sx={{
                                    marginTop: 'auto',
                                    alignSelf: 'flex-end',
                                }}
                                variant="contained"
                                onClick={
                                    fields.length > 0
                                        ? handleSubmit(handelUpdateOptions)
                                        : handelAddOptions
                                }
                            >
                                {fields.length > 0
                                    ? 'Save options'
                                    : 'Add options'}
                            </Button>
                        </>
                    )}
                </Stack>
                {(loadingRemoveOption ||
                    loadingUpdateOptions ||
                    loadingAddOptions) && <LoadingFullPage />}
            </Drawer>
        </>
    );
};

const Products: NextPageWithLayout = () => {
    const router = useRouter();
    const [isLoadingFetch, setIsLoadingFetch] = useState<boolean>(false);
    const { fetchProducts, products, total, removeProducts } =
        useProductStore();
    const [page, setPage] = useState<number>(0);
    const [limit, setLimit] = useState<number>(15);
    const [removeIds, setRemoveIds] = useState<number[]>([]);
    const [isLoadingRemove, setIsLoadingRemove] = useState<boolean>(false);
    const [textSearch, setTextSearch] = useState<string>('');
    const {
        isOpen: isOpenModalConfirmRemove,
        onClose: onCloseModalConfirmRemove,
        onOpen: onOpenModalConfirmRemove,
    } = useDisclosure();

    const handelFetchProducts = useCallback(
        async (q: any) => {
            try {
                setIsLoadingFetch(true);
                await fetchProducts(q);
                setIsLoadingFetch(false);
            } catch (error) {
                setIsLoadingFetch(false);
            }
        },
        [fetchProducts],
    );

    const handelRemoveProducts = async () => {
        try {
            setIsLoadingRemove(true);
            await removeProducts(removeIds);

            if (
                removeIds.length === products.length &&
                removeIds.length < total
            ) {
                setPage(page + 1);
            }
            setIsLoadingRemove(false);
            toast.success('Remove successfully');
            onCloseModalConfirmRemove();
            setRemoveIds([]);
        } catch (error) {
            setIsLoadingRemove(false);
            toast.error('Something went wrong');
        }
    };

    const columns: GridColDef<Product>[] = useMemo(
        () => [
            {
                field: 'id',
                headerName: 'ID',
                width: 90,
                disableColumnMenu: true,
                sortable: false,
            },
            {
                field: 'imageUrl',
                headerName: 'Image',
                sortable: false,
                disableColumnMenu: true,
                flex: 1,
                renderCell(params) {
                    return (
                        <Box>
                            <Image
                                src={params.value.split(',')?.[0]}
                                alt={params.row.name}
                                width={50}
                                height={40}
                                style={{
                                    objectFit: 'contain',
                                }}
                            />
                        </Box>
                    );
                },
            },

            {
                field: 'name',
                headerName: 'Name',
                sortable: false,
                filterable: false,
                disableColumnMenu: true,
                width: 400,
                flex: 0,
            },
            {
                field: 'price',
                headerName: 'Price',
                sortable: false,
                disableColumnMenu: true,
                flex: 1,
                renderCell(params) {
                    return <Box>{formatCurrency(params.value)}</Box>;
                },
            },
            {
                field: 'quantity',
                headerName: 'Quantity',
                sortable: false,
                disableColumnMenu: true,
                flex: 1,
            },
            {
                field: 'discountPercent',
                headerName: 'Discount',
                sortable: false,
                disableColumnMenu: true,
                flex: 1,
                renderCell(params) {
                    return !!params.value && <Box>{params.value}%</Box>;
                },
            },
            {
                field: 'action',
                headerName: 'Action',
                sortable: false,
                disableColumnMenu: true,
                renderCell(params) {
                    return (
                        <div
                            onClick={(e) => {
                                e.stopPropagation();
                            }}
                        >
                            <Action productId={params.row.id} />
                        </div>
                    );
                },
                width: 120,
            },
        ],
        [],
    );

    useEffect(() => {
        handelFetchProducts({
            offset: page,
            limit,
        });
    }, [handelFetchProducts, page, limit]);

    return (
        <>
            <Box component="div" padding={16}>
                <Breadcrumbs
                    breadcrumbs={[
                        {
                            href: ROUTES.ADMIN,
                            name: 'Dashboard',
                        },
                        {
                            href: ROUTES.ADMIN_PRODUCT,
                            name: 'Products',
                        },
                    ]}
                />
                <Box marginTop={16}>
                    <Grid
                        container
                        columnSpacing={{ xs: 0, md: 16 }}
                        rowSpacing={{ xs: 16, md: 0 }}
                    >
                        <Grid item xs={12}>
                            <MainContent
                                TableProps={{
                                    columns,
                                    rows: products,
                                    loading: isLoadingFetch,
                                    checkboxSelection: true,
                                    onSelectionModelChange(selectionModel) {
                                        setRemoveIds(
                                            selectionModel as Array<number>,
                                        );
                                    },
                                }}
                                ButtonAddProps={{
                                    textButton: 'Add Product',
                                    onClick: () => {
                                        router.push(ROUTES.ADMIN_ADD_PRODUCT);
                                    },
                                }}
                                TablePaginationProps={{
                                    count: total,
                                    page: page,
                                    onPageChange(event, page) {
                                        setPage(page);
                                    },
                                    rowsPerPage: limit,
                                    rowsPerPageOptions: [5, 10, 15],
                                    onRowsPerPageChange(e) {
                                        setLimit(Number(e.target.value));
                                    },
                                }}
                                RemoveProps={{
                                    rowSelected: removeIds,
                                    ButtonRemoveProps: {
                                        onClick: onOpenModalConfirmRemove,
                                    },
                                }}
                                SearchProps={{
                                    onChange: (value) => setTextSearch(value),
                                    value: textSearch,
                                    onClearSearch: () => {
                                        setTextSearch('');
                                        handelFetchProducts({
                                            limit,
                                            offset: page,
                                        });
                                    },
                                    onSearch: () =>
                                        handelFetchProducts({
                                            limit,
                                            offset: page,
                                            name:
                                                textSearch.length > 0
                                                    ? textSearch
                                                    : undefined,
                                        }),
                                }}
                            />
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            {isLoadingRemove && <LoadingFullPage />}
            <AlterConfirm
                title="Remove product?"
                contentText="This action will remove this product. Are you sure? "
                open={isOpenModalConfirmRemove}
                isLoading={isLoadingRemove}
                onConfirm={handelRemoveProducts}
            />
        </>
    );
};

Products.getLayout = (page) => {
    return <AdminLayout>{page}</AdminLayout>;
};

export const getServerSideProps = withProtect({
    isAdmin: true,
    isProtect: true,
})();

export default Products;
