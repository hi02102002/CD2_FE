import Input from '@/components/common/Input';
import Header from '@/layouts/client/Header';

export default function Home() {
    return (
        <>
            <Header />
            <Input
                required
                label="Username"
                isError
                messageError="This field is required"
                placeholder="User name"
            />
        </>
    );
}
