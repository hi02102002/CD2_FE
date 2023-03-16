import Link from 'next/link';

const Sidebar = () => {
    return (
        <div>
            this is sidebar
            <Link href="/account/wishlist">a</Link>
            <Link href="/account/address">a</Link>
        </div>
    );
};

export default Sidebar;
