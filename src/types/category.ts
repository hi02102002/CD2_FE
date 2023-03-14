import * as yup from 'yup';

export const CategoryInputSchema = yup.object({
    name: yup.string().required('Name is required!'),
    code: yup.string().required('Code is required!'),
    file: yup
        .array(
            yup.mixed().test('required', 'File is required', (file) => {
                if (file) return true;
                return false;
            }),
        )
        .min(1, 'File is required!'),
});

export type FormInputs = yup.InferType<typeof CategoryInputSchema>;

export type CategoryAdd = {
    file: File | Blob | string;
    name: string;
    code: string;
};

export type Category = {
    id: number;
    imageUrl: string;
    code: string;
    name: string;
    createdDate: string;
};
