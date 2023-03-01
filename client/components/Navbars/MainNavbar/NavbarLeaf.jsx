import Image from 'next/image'
import leaf from '../../../public/img/leaf.png'
import cls from './MainNavbar.module.scss'
export const NavbarLeaf = () => {
    return (
        <div className={cls.divLeaf}>
            <Image
                src={leaf}
                alt="Leaf Navbar"
                width="100%"
                height="100%"
                priority="high"
                className={cls.leaf}
            />
        </div>
    )
}

