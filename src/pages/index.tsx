import { Button } from '@/components/common';
import Header from '@/layouts/client/Header';

export default function Home() {
    return (
        <>
            <Header />
            <Button isLoading typeButton="primary" variant="contained">
                Hello
            </Button>
        </>
    );
}
