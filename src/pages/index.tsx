import { Button } from '@/components/common';
import Footer from '@/components/common/Footer';
import Header from '@/layouts/client/Header';

export default function Home() {
    return (
        <>
            <Header />
            <Button isLoading typeButton="primary" variant="contained">
                Hello
            </Button>
            <Footer></Footer>
        </>
    );
}
